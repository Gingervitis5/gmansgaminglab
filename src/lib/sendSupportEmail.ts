import { Resend } from "resend";

type SendSupportEmailParams = {
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
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

function resolveFromEmail(configuredFrom?: string) {
  const fromEmail = configuredFrom?.trim();

  if (!fromEmail) {
    if (process.env.NODE_ENV !== "production") {
      return RESEND_TEST_FROM_EMAIL;
    }

    throw new Error("Missing CONTACT_FROM_EMAIL or ORDER_FROM_EMAIL");
  }

  if (isConsumerMailbox(fromEmail) && process.env.NODE_ENV !== "production") {
    return RESEND_TEST_FROM_EMAIL;
  }

  return fromEmail;
}

export async function sendSupportEmail({
  customerName,
  customerEmail,
  subject,
  message,
}: SendSupportEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const supportEmail = process.env.SUPPORT_EMAIL?.trim();
  const configuredFrom = process.env.CONTACT_FROM_EMAIL ?? process.env.ORDER_FROM_EMAIL;

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  if (!supportEmail) {
    throw new Error("Missing SUPPORT_EMAIL");
  }

  const fromEmail = resolveFromEmail(configuredFrom);
  const resend = new Resend(resendApiKey);

  const safeName = escapeHtml(customerName);
  const safeEmail = escapeHtml(customerEmail);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: supportEmail,
    replyTo: customerEmail,
    subject: `[Contact] ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:640px;text-align:left;line-height:1.5;">
        <h2 style="margin:0 0 12px;">New Contact Form Submission</h2>
        <p style="margin:0 0 6px;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:0 0 6px;"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin:0 0 6px;"><strong>Subject:</strong> ${safeSubject}</p>
        <p style="margin:14px 0 4px;"><strong>Message:</strong></p>
        <p style="margin:0;background:#f4f4f4;padding:12px;border-radius:8px;">${safeMessage}</p>
      </div>
    `,
    text: [
      "New Contact Form Submission",
      "",
      `Name: ${customerName}`,
      `Email: ${customerEmail}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Support email failed: ${error.message}`);
  }

  console.log("sendSupportEmail: email sent", {
    to: supportEmail,
    from: fromEmail,
    emailId: data?.id,
  });
}
