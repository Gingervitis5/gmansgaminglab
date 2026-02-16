import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../../actions/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req:NextRequest){
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if(!signature){
        return NextResponse.json({error: "Missing signature"}, {status: 400});
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if(!webhookSecret){
        console.log("Missing webhook secret");
        return NextResponse.json({error: "Missing webhook secret"}, {status: 500});
    }
    let event:Stripe.Event;
    try{
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error){
        console.log("Error verifying webhook signature", error);
        return NextResponse.json({error: `Webhook Error: ${error}`}, {status: 400});
    }
    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;
        const invoice = session.invoice ? 
            await stripe.invoices.retrieve(session.invoice as string) 
            : null;
        try {
            await createOrderInSanity(session, invoice);
        } catch (error){
            console.log("Error creating order in sanity", error);
            return NextResponse.json({error: `Error creating order: ${error}`}, {status: 500});
        }
    }

    return NextResponse.json({received: true});
}

async function createOrderInSanity(
    session: Stripe.Checkout.Session,
    invoice: Stripe.Invoice | null
) {
    const {
        id,
        amount_total, 
        currency, 
        metadata,
        payment_intent,
        total_details
    } = session;
    const {
        orderNumber,
        customerName,
        customerEmail, 
        clerkUserId, 
        address
    } = metadata as unknown as Metadata & {address: string};
    const parsedAddress = address ? JSON.parse(address) : null;
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id, 
        {expand: ["data.price.product"]}
    );

    // Create sanity product references
    const sanityProducts = [];

    for (const item of lineItemsWithProduct.data){
        const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
        const quantity = item?.quantity || 0;

        if(!productId){
            console.log("Missing product ID in metadata for line item", item);
            continue;
        }
        sanityProducts.push({
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: productId
            },
            quantity
        });
    }
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customerEmail,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount
        ? total_details.amount_discount / 100
        : 0,

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
    });
    return order;
}
