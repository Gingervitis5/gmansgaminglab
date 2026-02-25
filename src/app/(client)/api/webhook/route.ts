import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../../actions/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";

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
  const { id, amount_total, currency, metadata, payment_intent, total_details, line_items } = session;
  const { orderNumber, customerName, customerEmail, clerkUserId, address } = metadata as unknown as Metadata & {
    address: string;
  };
  const parsedAddress = address ? JSON.parse(address) : null;

  console.log("createOrderInSanity: received session", id);
  console.log("createOrderInSanity: session.metadata", metadata);
  console.log("createOrderInSanity: parsedAddress", parsedAddress);
  console.log("createOrderInSanity: line items from session", line_items?.data?.length || 0);

  // Create sanity product references from session line_items
  const sanityProducts = [];
  const lineItemsToProcess = line_items?.data || [];

  for (const item of lineItemsToProcess) {
    const productId = (item.price?.product as unknown as Stripe.Product)?.metadata?.id;
    const quantity = item?.quantity || 0;

    if (!productId) {
      console.log("Missing product ID in metadata for line item", item);
      continue;
    }
    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });
  }

  const orderDoc = {
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId: clerkUserId,
    email: customerEmail,
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
    const order = await backendClient.create(orderDoc);
    console.log("createOrderInSanity: created order in Sanity", order && (order._id) || order);
    return order;
  } catch (error) {
    console.error("createOrderInSanity: error creating order in Sanity", error, { orderDoc });
    throw error;
  }
}
