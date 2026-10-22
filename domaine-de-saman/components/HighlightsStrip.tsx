import Reveal from "./Reveal";
import type { SiteContent } from "@/content";

export default function HighlightsStrip({ highlights }: { highlights: SiteContent["highlights"] }) {
  return (
    <section className="border-y border-charcoal/10 bg-forest">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-3 md:px-10 lg:grid-cols-6">
        {highlights.map((h, i) => (
          <Reveal key={h.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-3xl text-cream md:text-4xl">{h.value}</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.15em] text-cream/70">
              {h.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
