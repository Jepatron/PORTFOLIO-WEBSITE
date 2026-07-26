import Link from "next/link";
import PhotoPlaceholder from "./PhotoPlaceholder";
import Reveal from "./Reveal";
import { audiences } from "@/content/site";

export default function AudienceCards() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-8 md:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a.key} delay={i * 0.12}>
            <Link
              href={a.href}
              className="group flex h-full flex-col overflow-hidden border border-charcoal/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <PhotoPlaceholder
                  label={a.photoLabel}
                  tone="cream"
                  aspect="aspect-[4/3]"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 bg-cream p-6">
                <h3 className="font-display text-2xl text-forest">{a.title}</h3>
                <p className="flex-1 font-body text-sm leading-relaxed text-grey">{a.blurb}</p>
                <span className="font-body text-xs uppercase tracking-[0.15em] text-brass transition-transform group-hover:translate-x-1">
                  Learn more →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
