import PhotoPlaceholder from "./PhotoPlaceholder";
import { estate } from "@/content/site";

export default function AmenitiesGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {estate.amenities.map((a) => (
        <div key={a.title} className="border border-charcoal/10">
          <PhotoPlaceholder label={a.photoLabel} tone="cream" aspect="aspect-[16/9]" />
          <div className="p-6">
            <h3 className="font-display text-xl text-forest">{a.title}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-grey">{a.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
