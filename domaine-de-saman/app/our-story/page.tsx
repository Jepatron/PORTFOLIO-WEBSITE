import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { ourStory } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Story — Domaine de Saman",
  description: "The people behind Domaine de Saman.",
};

export default function OurStory() {
  return (
    <main>
      <PageHero
        eyebrow={ourStory.eyebrow}
        title={ourStory.title}
        photoLabel="The owners, or a personal detail shot of the house — to be replaced with a real photo"
        tone="brass"
        minHeight="min-h-[55svh]"
      />

      <Reveal className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        {ourStory.body.map((p) => (
          <p key={p} className="mt-5 font-body text-base leading-relaxed text-grey first:mt-0">
            {p}
          </p>
        ))}
      </Reveal>

      <CTABanner
        heading="Come see it for yourself"
        body="Send us your dates and what you're planning — we'll confirm availability and answer any questions."
      />
    </main>
  );
}
