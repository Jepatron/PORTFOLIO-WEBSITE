"use client";

import { useState, type FormEvent } from "react";
import type { SiteContent } from "@/content";

export default function EnquiryForm({
  contact,
  form,
  defaultPurpose = "family",
}: {
  contact: SiteContent["contact"];
  form: SiteContent["enquiryForm"];
  defaultPurpose?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [purpose, setPurpose] = useState(defaultPurpose);
  const { purposes: PURPOSES, labels: t } = form;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const dates = String(data.get("dates") ?? "");
    const groupSize = String(data.get("groupSize") ?? "");
    const purpose = String(data.get("purpose") ?? "");
    const message = String(data.get("message") ?? "");

    // Swap in a real Formspree endpoint in content/en.ts (and the other
    // locale files) — contact.formEndpoint — to submit via fetch. Until
    // then, this falls back to a mailto: draft so the form is usable
    // without any backend.
    if (!contact.formEndpoint) {
      const subject = encodeURIComponent(`Enquiry — ${purpose} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nDates: ${dates}\nGroup size: ${groupSize}\nPurpose: ${purpose}\n\n${message}`
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
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
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">{t.name}</span>
          <input
            required
            name="name"
            type="text"
            className="rounded-sm border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-forest focus:shadow-[0_0_0_3px_rgba(47,74,61,0.15)]"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">{t.email}</span>
          <input
            required
            name="email"
            type="email"
            className="rounded-sm border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-forest focus:shadow-[0_0_0_3px_rgba(47,74,61,0.15)]"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">{t.dates}</span>
          <input
            required
            name="dates"
            type="text"
            placeholder={t.datesPlaceholder}
            className="border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-forest placeholder:text-charcoal/30"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">{t.groupSize}</span>
          <input
            required
            name="groupSize"
            type="number"
            min={1}
            max={15}
            className="rounded-sm border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-forest focus:shadow-[0_0_0_3px_rgba(47,74,61,0.15)]"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">{t.purpose}</span>
        <div className="flex flex-wrap gap-2">
          {PURPOSES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPurpose(p.value)}
              aria-pressed={purpose === p.value}
              className={`rounded-full border px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
                purpose === p.value
                  ? "border-forest bg-forest text-cream"
                  : "border-charcoal/20 text-charcoal/70 hover:border-forest/50 hover:text-forest"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="purpose" value={purpose} />
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">{t.message}</span>
        <textarea
          name="message"
          rows={4}
          placeholder={t.messagePlaceholder}
          className="rounded-sm border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow placeholder:text-charcoal/30 focus:border-forest focus:shadow-[0_0_0_3px_rgba(47,74,61,0.15)]"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-full rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none md:w-fit"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>

      {status === "sent" && (
        <p className="rounded-sm border border-forest/25 bg-forest/[0.06] px-4 py-3 font-body text-sm text-forest">
          {contact.formEndpoint ? t.sentWithEndpoint : t.sentMailto}
        </p>
      )}
      {status === "error" && (
        <p className="rounded-sm border border-brass/30 bg-brass/[0.08] px-4 py-3 font-body text-sm text-brass">
          {t.error.replace("{email}", contact.email)}
        </p>
      )}
    </form>
  );
}
