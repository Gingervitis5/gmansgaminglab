import { sendSupportEmail } from "@/lib/sendSupportEmail";
import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePayload(payload: ContactPayload) {
  return {
    name: payload.name?.trim(),
    email: payload.email?.trim().toLowerCase(),
    subject: payload.subject?.trim(),
    message: payload.message?.trim(),
    website: payload.website?.trim(),
  };
}

function validatePayload(payload: ReturnType<typeof normalizePayload>) {
  if (!payload.name || payload.name.length < 2) {
    throw new Error("Name must be at least 2 characters.");
  }

  if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
    throw new Error("Please provide a valid email address.");
  }

  if (!payload.subject || payload.subject.length < 3) {
    throw new Error("Subject must be at least 3 characters.");
  }

  if (!payload.message || payload.message.length < 10) {
    throw new Error("Message must be at least 10 characters.");
  }

  if (payload.message.length > 3000) {
    throw new Error("Message cannot exceed 3000 characters.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const payload = normalizePayload(body);

    if (payload.website) {
      return NextResponse.json({ ok: true });
    }

    validatePayload(payload);

    await sendSupportEmail({
      customerName: payload.name,
      customerEmail: payload.email,
      subject: payload.subject,
      message: payload.message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send message right now.";

    const status = /Missing|failed/i.test(message) ? 500 : 400;

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
