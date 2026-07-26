"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";

const PURPOSES = [
  { value: "family", label: "Family / group stay" },
  { value: "wedding", label: "Wedding" },
  { value: "retreat", label: "Retreat / YTT" },
  { value: "other", label: "Other" },
];

export default function EnquiryForm({ defaultPurpose = "family" }: { defaultPurpose?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

    // Swap in a real Formspree endpoint in content/site.ts (contact.formEndpoint)
    // to submit via fetch. Until then, this falls back to a mailto: draft so
    // the form is usable without any backend.
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
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">Name</span>
          <input
            required
            name="name"
            type="text"
            className="border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-forest"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">Email</span>
          <input
            required
            name="email"
            type="email"
            className="border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-forest"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">Dates</span>
          <input
            required
            name="dates"
            type="text"
            placeholder="e.g. 12–19 July 2027"
            className="border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-forest placeholder:text-charcoal/30"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">Group size</span>
          <input
            required
            name="groupSize"
            type="number"
            min={1}
            max={15}
            className="border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-forest"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">Purpose</span>
        <select
          name="purpose"
          defaultValue={defaultPurpose}
          className="border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-forest"
        >
          {PURPOSES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us a little about your plans"
          className="border border-charcoal/20 bg-cream px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-forest placeholder:text-charcoal/30"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-full rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-forest/90 disabled:opacity-60 md:w-fit"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "sent" && (
        <p className="font-body text-sm text-forest">
          Thanks — {contact.formEndpoint ? "your enquiry is on its way." : "your email draft is ready to send."}
        </p>
      )}
      {status === "error" && (
        <p className="font-body text-sm text-brass">
          Something went wrong — please email {contact.email} directly.
        </p>
      )}
    </form>
  );
}
