import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

export default function CTABanner({
  heading,
  body,
  ctaLabel,
  href = "/availability",
}: {
  heading: string;
  body?: string;
  ctaLabel: string;
  href?: string;
}) {
  return (
    <section className="bg-cream-deep">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20">
        <div>
          <h2 className="font-display text-2xl text-forest md:text-3xl">{heading}</h2>
          {body && <p className="mt-2 max-w-xl font-body text-sm text-grey">{body}</p>}
        </div>
        <Link
          href={href}
          className="inline-block whitespace-nowrap rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg"
        >
          {ctaLabel}
        </Link>
      </Reveal>
    </section>
  );
}
