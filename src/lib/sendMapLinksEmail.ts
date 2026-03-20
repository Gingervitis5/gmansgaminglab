import { Resend } from "resend";

type MapLinkProduct = {
  name: string;
  link: string;
};

type SendMapLinksEmailParams = {
  to: string;
  customerName: string;
  orderNumber: string;
  products: MapLinkProduct[];
};

const RESEND_TEST_FROM_EMAIL = "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isConsumerMailbox(email: string) {
  return /@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$/i.test(email);
}

function resolveFromEmail(orderFromEmail?: string) {
  const configured = orderFromEmail?.trim();

  if (!configured) {
    if (process.env.NODE_ENV !== "production") {
      return RESEND_TEST_FROM_EMAIL;
    }

    throw new Error("Missing ORDER_FROM_EMAIL");
  }

  // Resend sender domains must be verified; consumer mailbox domains usually fail.
  if (isConsumerMailbox(configured) && process.env.NODE_ENV !== "production") {
    return RESEND_TEST_FROM_EMAIL;
  }

  return configured;
}

export async function sendMapLinksEmail({
  to,
  customerName,
  orderNumber,
  products,
}: SendMapLinksEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const orderFromEmail = process.env.ORDER_FROM_EMAIL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/+$/, "") ?? "";

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const fromEmail = resolveFromEmail(orderFromEmail);

  const resend = new Resend(resendApiKey);
  const safeCustomerName = escapeHtml(customerName || "Customer");
  const htmlProducts = products
    .map(
      (product) =>
        `<li><a href="${escapeHtml(product.link)}">${escapeHtml(product.name)}</a></li>`
    )
    .join("");
  const textProducts = products
    .map((product) => `- ${product.name}: ${product.link}`)
    .join("\n");

  const logoUrl = baseUrl
    ? `${baseUrl}/images/pixel_icons/GMan%20Logo.png`
    : "";

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to,
    subject: `Your map links for order ${orderNumber}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;text-align:left;">
        ${logoUrl ? `<img src="${logoUrl}" alt="Graham's Gaming Lab" style="max-width:200px;margin-bottom:16px;display:block;" />` : ""}
        <p style="margin:0 0 8px;">Hi ${safeCustomerName},</p>
        <p style="margin:0 0 8px;">Thanks for your order. Your map purchase includes the following links:</p>
        <ul style="padding-left:20px;">${htmlProducts}</ul>
        <p style="margin:8px 0 0;">You can keep this email for future reference.</p>
      </div>
    `,
    text: [
      `Hi ${customerName || "Customer"},`,
      "",
      "Thanks for your order. Your map purchase includes the following links:",
      textProducts,
      "",
      "You can keep this email for future reference.",
    ].join("\n"),
  });

  if (error) {
    throw new Error(
      `Map email failed (from=${fromEmail}, to=${to}): ${error.message}`
    );
  }

  console.log("sendMapLinksEmail: email sent", {
    to,
    from: fromEmail,
    emailId: data?.id,
  });
}