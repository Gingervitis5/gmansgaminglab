import stripe from "@/lib/stripe";
import { sendMapLinksEmail } from "../../../../lib/sendMapLinksEmail";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../../actions/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";

type ExistingOrder = {
  _id: string;
  mapLinksSentAt?: string;
};

type PurchasedMapProduct = {
  _id: string;
  name: string;
  link: string;
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  try {
    console.log("Stripe webhook POST received", { bodyLength: body?.length ?? 0 });
    try {
      // Headers is an iterable of [key, value]
      // Object.fromEntries works with Headers in this environment
      // but wrap in try/catch to avoid unexpected runtime issues
      // (do not log sensitive headers in production)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log("Stripe webhook headers:", Object.fromEntries(headersList));
    } catch (err) {
      console.log("Stripe webhook: failed to stringify headers", err);
    }
  } catch (err) {
    console.log("Stripe webhook: initial logging failed", err);
  }
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.log("Stripe webhook: missing signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook: missing STRIPE_WEBHOOK_SECRET in env");
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.log("Error verifying webhook signature", error);
    return NextResponse.json({ error: `Webhook Error: ${error}` }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed event received", event.data.object);
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;
    try {
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.log("Error creating order in sanity", error);
      return NextResponse.json({ error: `Error creating order: ${error}` }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const { id, amount_total, currency, metadata, payment_intent, total_details } = session;
  const { orderNumber, customerName, customerEmail, clerkUserId, address } = metadata as unknown as Metadata & {
    address?: string;
  };
  const deliveryEmail = session.customer_details?.email ?? customerEmail;
  const displayName = session.customer_details?.name ?? customerName ?? "Customer";
  const parsedAddress = parseAddress(address);
  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  console.log("createOrderInSanity: received session", id);
  console.log("createOrderInSanity: session.metadata", metadata);
  console.log("createOrderInSanity: parsedAddress", parsedAddress);
  console.log("createOrderInSanity: fetched line items", lineItems.data.length);

  const existingOrder = await getExistingOrder(id);
  const sanityProducts = buildSanityProducts(lineItems.data);
  const purchasedMapProducts = await getPurchasedMapProducts(lineItems.data);

  let order = existingOrder;

  if (!order) {
    const orderDoc = {
      _type: "order",
      orderNumber,
      stripeCheckoutSessionId: id,
      stripePaymentIntentId: payment_intent,
      customerName: displayName,
      stripeCustomerId: typeof session.customer === "string" ? session.customer : deliveryEmail,
      clerkUserId: clerkUserId,
      email: deliveryEmail,
      currency,
      amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
      products: sanityProducts,
      totalPrice: amount_total ? amount_total / 100 : 0,
      status: "paid",
      orderDate: new Date().toISOString(),
      invoice: invoice
        ? {
            id: invoice.id,
            number: invoice.number,
            hosted_invoice_url: invoice.hosted_invoice_url,
          }
        : null,
      address: parsedAddress
        ? {
            state: parsedAddress.state,
            zip: parsedAddress.zip,
            city: parsedAddress.city,
            address: parsedAddress.address,
            name: parsedAddress.name,
          }
        : null,
    };

    console.log("createOrderInSanity: creating Sanity document", {
      stripeCheckoutSessionId: id,
      orderNumber,
      productsCount: sanityProducts.length,
    });

    try {
      order = await backendClient.create(orderDoc);
      console.log("createOrderInSanity: created order in Sanity", (order && order._id) || order);
    } catch (error) {
      console.error("createOrderInSanity: error creating order in Sanity", error, { orderDoc });
      throw error;
    }
  } else {
    console.log("createOrderInSanity: order already exists for session", id);
  }

  console.debug("Purchased Map Products", {
    count: purchasedMapProducts.length,
    products: purchasedMapProducts.map((p) => ({ id: p._id, name: p.name })),
   });

  if (!order?.mapLinksSentAt && purchasedMapProducts.length > 0) {
    if (!deliveryEmail || deliveryEmail === "Unknown") {
      throw new Error(`Missing customer email for map delivery on session ${id}`);
    }

    await sendMapLinksEmail({
      to: deliveryEmail,
      customerName: displayName,
      orderNumber,
      products: purchasedMapProducts,
    });

    await backendClient
      .patch(order._id)
      .set({ mapLinksSentAt: new Date().toISOString() })
      .commit();

    console.log("createOrderInSanity: sent purchased map links", {
      stripeCheckoutSessionId: id,
      productCount: purchasedMapProducts.length,
    });
  } else {
    console.log("createOrderInSanity: map link email skipped", {
      stripeCheckoutSessionId: id,
      hasOrder: Boolean(order?._id),
      alreadySent: Boolean(order?.mapLinksSentAt),
      purchasedMapProducts: purchasedMapProducts.length,
    });
  }

  return order;
}

function parseAddress(address?: string) {
  if (!address) {
    return null;
  }

  try {
    return JSON.parse(address);
  } catch (error) {
    console.log("createOrderInSanity: failed to parse address metadata", error);
    return null;
  }
}

function getProductIdFromLineItem(item: Stripe.LineItem) {
  const product = item.price?.product;

  if (!product || typeof product === "string" || "deleted" in product) {
    return undefined;
  }

  return product.metadata?.id;
}

function buildSanityProducts(lineItems: Stripe.ApiList<Stripe.LineItem>["data"]) {
  return lineItems.flatMap((item) => {
    const productId = getProductIdFromLineItem(item);

    if (!productId) {
      console.log("Missing product ID in metadata for line item", item.id);
      return [];
    }

    return [{
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity: item.quantity || 0,
    }];
  });
}

async function getExistingOrder(sessionId: string) {
  return backendClient.fetch<ExistingOrder | null>(
    `*[_type == "order" && stripeCheckoutSessionId == $sessionId][0]{
      _id,
      mapLinksSentAt
    }`,
    { sessionId }
  );
}

async function getPurchasedMapProducts(lineItems: Stripe.ApiList<Stripe.LineItem>["data"]) {
  const productIds = Array.from(
    new Set(
      lineItems.flatMap((item) => {
        const productId = getProductIdFromLineItem(item);
        return productId ? [productId] : [];
      })
    )
  );

  if (productIds.length === 0) {
    return [];
  }

  return backendClient.fetch<PurchasedMapProduct[]>(
    `*[
      _type == "product" &&
      _id in $productIds &&
      variant == "maps" &&
      defined(link)
    ]{
      _id,
      name,
      link
    }`,
    { productIds }
  );
}
