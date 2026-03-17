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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendMapLinksEmail({
  to,
  customerName,
  orderNumber,
  products,
}: SendMapLinksEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const orderFromEmail = process.env.ORDER_FROM_EMAIL;

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  if (!orderFromEmail) {
    throw new Error("Missing ORDER_FROM_EMAIL");
  }

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

  const { error } = await resend.emails.send({
    from: orderFromEmail,
    to,
    subject: `Your map links for order ${orderNumber}`,
    html: `
      <p>Hi ${safeCustomerName},</p>
      <p>Thanks for your order. Your map purchase includes the following links:</p>
      <ul>${htmlProducts}</ul>
      <p>You can keep this email for future reference.</p>
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
    throw new Error(error.message);
  }
}