import Link from "next/link";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { site, ctaLabel } from "@/content/site";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <PhotoPlaceholder
          label="Full-bleed hero: estate house at golden hour, mountains behind — swap for a looping background video on desktop"
          tone="forest"
          aspect="aspect-auto"
          animated
          className="h-full w-full"
        />
      </div>
      {/* Depth gradient so hero text stays legible once a real photo/video replaces the placeholder. */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:px-10 md:pb-24">
        <p className="mb-5 font-body text-xs uppercase tracking-[0.25em] text-cream/70">
          {site.region} — {site.nearestTown}
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-cream md:text-6xl">
          {site.tagline}
        </h1>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link
            href="/availability"
            className="inline-block rounded-sm bg-cream px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-forest transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/the-estate"
            className="inline-block font-body text-xs uppercase tracking-[0.2em] text-cream/85 underline-offset-4 transition-colors hover:text-cream hover:underline"
          >
            Explore the estate
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden md:block">
        <span className="block h-9 w-px animate-pulse bg-cream/50" />
      </div>
    </section>
  );
}
