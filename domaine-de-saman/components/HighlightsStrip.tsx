import { highlights } from "@/content/site";

export default function HighlightsStrip() {
  return (
    <section className="border-y border-charcoal/10 bg-forest">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-5 md:px-10">
        {highlights.map((h) => (
          <div key={h.label} className="text-center">
            <p className="font-display text-3xl text-cream md:text-4xl">{h.value}</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.15em] text-cream/70">
              {h.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
