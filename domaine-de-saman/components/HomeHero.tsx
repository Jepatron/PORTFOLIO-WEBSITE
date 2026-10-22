import Image from "next/image";
import { Link } from "@/i18n/navigation";
import MaskReveal from "./MaskReveal";
import type { SiteContent } from "@/content";

export default function HomeHero({
  site,
  ctaLabel,
}: {
  site: SiteContent["site"];
  ctaLabel: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-mainhouse-trailer-poster.jpg"
          className="hidden h-full w-full object-cover md:block"
        >
          <source src="/media/hero-mainhouse-trailer.mp4" type="video/mp4" />
        </video>
        <Image
          src="/media/hero-mainhouse-trailer-poster.jpg"
          alt="The main house at Domaine de Saman"
          fill
          priority
          className="object-cover md:hidden"
        />
      </div>
      {/* Depth gradient so hero text stays legible once a real photo/video replaces the placeholder. */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:px-10 md:pb-24">
        <p className="mb-5 font-body text-xs uppercase tracking-[0.25em] text-cream/70">
          {site.region} — {site.nearestTown}
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-cream md:text-6xl">
          <MaskReveal>{site.tagline}</MaskReveal>
        </h1>
        <p className="mt-4 max-w-xl font-body text-base text-cream/80 md:text-lg">{site.heroSubline}</p>
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
            {site.exploreCta}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden md:block">
        <span className="block h-9 w-px animate-pulse bg-cream/50" />
      </div>
    </section>
  );
}
