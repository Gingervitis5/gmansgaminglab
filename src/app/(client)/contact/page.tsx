"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubText, Title } from "@/components/ui/text";
import { Mail, MessageSquareText, SendHorizonal } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const ContactUsPage = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSending, setIsSending] = useState(false);

  const onChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setForm(initialState);
      toast.success("Message sent! We will reply to you by email.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send your message.";
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(2,231,252,0.15),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(251,108,8,0.15),transparent_40%)]" />
      <Container className="relative z-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-shop_light_blue/50 px-3 py-1 text-xl text-shop_light_blue tracking-wide">
              <Mail className="size-8" />
              We are here to help
            </p>
            <Title className="text-4xl md:text-5xl">Contact Support</Title>
            <SubText className="max-w-xl text-shop_light_blue/90">
              Questions about orders, maps, playmats, or other requests? Send a message and our team will get back to you as soon as possible.
            </SubText>

            <div className="grid gap-3 pt-1 sm:grid-cols-2">
              <div className="rounded-lg border border-shop_light_blue/30 bg-shop_darkest/70 p-4">
                <p className="text-sm uppercase tracking-wider text-shop_light_blue/80">Response Time</p>
                <p className="font-poppins text-lg text-shop_white">Usually within 24 hours</p>
              </div>
              <div className="rounded-lg border border-shop_orange/40 bg-shop_darkest/70 p-4">
                <p className="text-sm uppercase tracking-wider text-shop_orange/80">Best For</p>
                <p className="font-poppins text-lg text-shop_white">Support and order help</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border-2 border-shop_light_blue/70 bg-shop_darkest/85 p-5 shadow-[0_0_0_1px_rgba(2,231,252,0.15),0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-6"
          >
            <div className="flex items-center gap-2 text-shop_light_blue">
              <MessageSquareText className="size-6" />
              <span className="text-lg">Send us a message</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm text-shop_light_blue">Name</span>
                <Input
                  value={form.name}
                  onChange={(event) => onChange("name", event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  minLength={2}
                  className="h-10 border-shop_light_blue/50 text-shop_light_blue placeholder:text-shop_light_blue/45"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-shop_light_blue">Email</span>
                <Input
                  value={form.email}
                  onChange={(event) => onChange("email", event.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-10 border-shop_light_blue/50 text-shop_light_blue placeholder:text-shop_light_blue/45"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm text-shop_light_blue">Subject</span>
              <Input
                value={form.subject}
                onChange={(event) => onChange("subject", event.target.value)}
                placeholder="How can we help?"
                required
                minLength={3}
                className="h-10 border-shop_light_blue/50 text-shop_light_blue placeholder:text-shop_light_blue/45"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-shop_light_blue">Message</span>
              <textarea
                value={form.message}
                onChange={(event) => onChange("message", event.target.value)}
                placeholder="Tell us what you need and include any order details that can help us assist faster."
                required
                minLength={10}
                rows={6}
                className="w-full rounded-md border border-shop_light_blue/50 bg-transparent px-3 py-2 text-shop_light_blue outline-none transition focus-visible:border-shop_light_blue focus-visible:ring-2 focus-visible:ring-shop_light_blue/30"
              />
            </label>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={form.website}
              onChange={(event) => onChange("website", event.target.value)}
              name="website"
            />

            <Button
              type="submit"
              disabled={isSending}
              className="h-11 w-full border-2 border-shop_orange bg-shop_orange text-shop_darkest hover:bg-shop_orange/90 hover:text-shop_darkest disabled:opacity-70"
            >
              {isSending ? "Sending..." : "Send Message"}
              <SendHorizonal className="size-4" />
            </Button>

            <p className="text-lg text-shop_light_blue/70">
              By sending this form, your message is delivered to our support inbox.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsPage;