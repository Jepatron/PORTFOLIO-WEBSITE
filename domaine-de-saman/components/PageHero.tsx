import Link from "next/link";
import PhotoPlaceholder from "./PhotoPlaceholder";

type Cta = { label: string; href: string };
type Tone = "forest" | "brass" | "cream";

export default function PageHero({
  eyebrow,
  title,
  body,
  photoLabel,
  tone = "forest",
  minHeight = "min-h-[70svh]",
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  photoLabel: string;
  tone?: Tone;
  minHeight?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section className={`relative flex ${minHeight} items-end overflow-hidden`}>
      <div className="absolute inset-0">
        <PhotoPlaceholder label={photoLabel} tone={tone} aspect="aspect-auto" animated className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-40 md:px-10 md:pb-20">
        {eyebrow && (
          <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-cream/70">{eyebrow}</p>
        )}
        <h1 className="max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-cream md:text-5xl">
          {title}
        </h1>
        {body && (
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-cream/85">{body}</p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center gap-5">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-block rounded-sm bg-cream px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-forest transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-block font-body text-xs uppercase tracking-[0.2em] text-cream/85 underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
