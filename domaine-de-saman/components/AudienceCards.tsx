import Link from "next/link";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { audiences } from "@/content/site";

export default function AudienceCards() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-8 md:grid-cols-3">
        {audiences.map((a) => (
          <Link
            key={a.key}
            href={a.href}
            className="group flex flex-col overflow-hidden border border-charcoal/10 transition-shadow hover:shadow-lg"
          >
            <PhotoPlaceholder label={a.photoLabel} tone="cream" aspect="aspect-[4/3]" />
            <div className="flex flex-1 flex-col gap-3 bg-cream p-6">
              <h3 className="font-display text-2xl text-forest">{a.title}</h3>
              <p className="flex-1 font-body text-sm leading-relaxed text-grey">{a.blurb}</p>
              <span className="font-body text-xs uppercase tracking-[0.15em] text-brass group-hover:underline">
                Learn more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
