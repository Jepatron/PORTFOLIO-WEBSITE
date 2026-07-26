import Link from "next/link";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { site, ctaLabel } from "@/content/site";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[85svh] items-end">
      <PhotoPlaceholder
        label="Full-bleed hero: estate house at golden hour, mountains behind"
        tone="forest"
        aspect="aspect-auto"
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-32 md:px-10 md:pb-20">
        <h1 className="max-w-3xl font-display text-4xl leading-[1.1] text-cream md:text-6xl">
          {site.tagline}
        </h1>
        <div className="mt-8">
          <Link
            href="/availability"
            className="inline-block rounded-sm bg-cream px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-forest transition-colors hover:bg-cream-deep"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
