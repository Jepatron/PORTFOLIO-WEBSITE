"use client";

import { useState, type FormEvent } from "react";
import type { SiteContent } from "@/content";

export default function NewsletterSignup({
  contact,
  newsletter,
}: {
  contact: SiteContent["contact"];
  newsletter: SiteContent["newsletter"];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");

    if (!contact.newsletterFormEndpoint) {
      const subject = encodeURIComponent("Newsletter signup");
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(email)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(contact.newsletterFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="border-b border-charcoal/10 bg-forest">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <h2 className="font-display text-xl text-cream md:text-2xl">{newsletter.heading}</h2>
          <p className="mt-2 max-w-md font-body text-sm text-cream/75">{newsletter.body}</p>
        </div>

        {status === "sent" ? (
          <p className="font-body text-sm text-cream">
            {contact.newsletterFormEndpoint ? newsletter.sentWithEndpoint : newsletter.sentMailto}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              {newsletter.emailLabel}
            </label>
            <input
              id="newsletter-email"
              required
              name="email"
              type="email"
              placeholder={newsletter.emailLabel}
              className="w-full rounded-sm border border-cream/30 bg-transparent px-4 py-3 font-body text-sm text-cream outline-none transition-colors placeholder:text-cream/50 focus:border-cream"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="shrink-0 rounded-sm bg-cream px-5 py-3 font-body text-xs uppercase tracking-[0.15em] text-forest transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "sending" ? newsletter.sending : newsletter.submit}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="font-body text-xs text-brass">{newsletter.error.replace("{email}", contact.email)}</p>
        )}
      </div>
    </div>
  );
}
