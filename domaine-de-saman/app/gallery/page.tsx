import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { estate } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery — Domaine de Saman",
  description: "Photo gallery of Domaine de Saman — house, pool, yoga deck, gym, and grounds.",
};

export default function Gallery() {
  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="The estate, in pictures."
        body="Real photography is coming soon — each block below stands in for where a photo or video clip will go."
        photoLabel="Estate house and grounds, wide establishing shot"
        tone="brass"
        minHeight="min-h-[55svh]"
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {estate.galleryPhotos.map((label, i) => (
            <Reveal key={label} delay={(i % 3) * 0.08} className="group overflow-hidden">
              <PhotoPlaceholder
                label={label}
                tone={i % 3 === 0 ? "forest" : i % 3 === 1 ? "cream" : "brass"}
                aspect="aspect-square"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
