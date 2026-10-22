import PhotoPlaceholder from "./PhotoPlaceholder";
import Reveal from "./Reveal";
import type { SiteContent } from "@/content";

export default function AmenitiesGrid({ amenities }: { amenities: SiteContent["estate"]["amenities"] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {amenities.map((a, i) => (
        <Reveal key={a.title} delay={(i % 2) * 0.1}>
          <div className="group overflow-hidden border border-charcoal/10 transition-shadow duration-300 hover:shadow-xl">
            <div className="overflow-hidden">
              <PhotoPlaceholder
                label={a.photoLabel}
                tone="cream"
                aspect="aspect-[16/9]"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl text-forest">{a.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-grey">{a.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
