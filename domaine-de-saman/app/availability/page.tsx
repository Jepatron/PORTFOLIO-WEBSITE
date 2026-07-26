import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Availability & Contact — Domaine de Saman",
  description: "Check availability and get in touch about your stay at Domaine de Saman.",
};

export default function Availability() {
  return (
    <main>
      <PageHero
        eyebrow="Availability & Contact"
        title="Check your dates."
        body="Send us your dates, group size, and what you're planning — we'll come back to you directly."
        photoLabel="Estate grounds at dusk"
        tone="forest"
        minHeight="min-h-[50svh]"
      />

      <Reveal className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <EnquiryForm />
        <p className="mt-8 text-center font-body text-sm text-grey">
          Prefer email? Reach us directly at{" "}
          <a href={`mailto:${contact.email}`} className="text-forest underline">
            {contact.email}
          </a>
        </p>
      </Reveal>

      <section className="bg-cream-deep">
        <Reveal className="mx-auto max-w-3xl px-6 py-16 md:px-10">
          <h2 className="font-display text-2xl text-forest">Frequently asked questions</h2>
          <div className="mt-8">
            <FAQ />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
