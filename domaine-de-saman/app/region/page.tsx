import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import ImmersiveBreak from "@/components/ImmersiveBreak";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { region } from "@/content/site";

export const metadata: Metadata = {
  title: "The Region — Domaine de Saman",
  description: "The Pyrenees foothills around Domaine de Saman — canyoning, rafting, hiking, and via ferrata within reach.",
};

export default function Region() {
  return (
    <main>
      <PageHero
        eyebrow="The Region"
        title="The Pyrenees foothills, and the country around them."
        body={region.intro}
        photoLabel="Pyrenees foothills, view from the estate"
        tone="forest"
        primaryCta={{ label: "Check availability", href: "/availability" }}
        secondaryCta={{ label: "See the estate", href: "/the-estate" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">Nearby, within around two hours</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {region.activities.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 0.1}>
              <div className="group overflow-hidden border border-charcoal/10 transition-shadow duration-300 hover:shadow-xl">
                <div className="overflow-hidden">
                  <PhotoPlaceholder
                    label={a.photoLabel}
                    tone="cream"
                    aspect="aspect-[16/9]"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-forest">{a.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-grey">{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ImmersiveBreak label="Wide landscape shot of the Pyrenees foothills at dusk" tone="forest" />

      <Reveal className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <h2 className="font-display text-2xl text-forest">Getting here</h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-grey">{region.gettingHere}</p>
      </Reveal>

      <CTABanner
        heading="Make it your base"
        body="Stay at the estate and use it as a starting point for the foothills — or simply stay put. Either way, send us your dates and we'll confirm availability."
      />
    </main>
  );
}
