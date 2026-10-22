import { Link } from "@/i18n/navigation";
import PhotoPlaceholder from "./PhotoPlaceholder";
import Reveal from "./Reveal";
import type { SiteContent } from "@/content";

export default function HouseCards({
  estate,
  sleepsAndBedrooms,
  exploreCta,
}: {
  estate: SiteContent["estate"];
  sleepsAndBedrooms: string;
  exploreCta: string;
}) {
  const houses = [
    { ...estate.villa, href: "/the-estate" },
    { ...estate.farmhouse, href: "/the-farmhouse" },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {houses.map((h, i) => (
        <Reveal key={h.name} delay={i * 0.12}>
          <Link
            href={h.href}
            className="group flex h-full flex-col overflow-hidden border border-charcoal/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <PhotoPlaceholder
                label={h.photoLabel}
                tone="cream"
                aspect="aspect-[4/3]"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 bg-cream p-6">
              <h3 className="font-display text-2xl text-forest">{h.name}</h3>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-brass">
                {sleepsAndBedrooms
                  .replace("{sleeps}", String(h.sleeps))
                  .replace("{bedrooms}", String(h.bedroomCount))}
              </p>
              <p className="flex-1 font-body text-sm leading-relaxed text-grey">{h.tagline}</p>
              <span className="font-body text-xs uppercase tracking-[0.15em] text-brass transition-transform group-hover:translate-x-1">
                {exploreCta}
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
