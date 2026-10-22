type Tone = "forest" | "cream" | "brass";

const toneClasses: Record<Tone, string> = {
  forest: "bg-gradient-to-br from-forest via-forest to-[#233a30] text-cream/75",
  cream: "bg-gradient-to-br from-cream-deep to-[#ece4cf] text-charcoal/45",
  brass: "bg-gradient-to-br from-brass to-[#83652f] text-cream/85",
};

// Derived from the label rather than a generated id — keeps this a plain
// Server Component (no hooks) while still being unique per SVG <pattern>
// on the page, since photo labels are always distinct descriptive text.
function patternIdFor(label: string) {
  return `topo-${label.replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`;
}

// Faint elevation-contour lines standing in for real photography — reads as
// a considered placeholder rather than an empty gradient block.
function TopographicOverlay({ id }: { id: string }) {
  const rows = [16, 46, 76, 106, 136];
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.16]" aria-hidden="true">
      <defs>
        <pattern id={id} width="150" height="150" patternUnits="userSpaceOnUse">
          {rows.map((y) => (
            <path
              key={y}
              d={`M-15,${y} Q22,${y - 15} 60,${y} T135,${y} T210,${y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function PhotoPlaceholder({
  label,
  tone = "forest",
  aspect = "aspect-[4/3]",
  className = "",
  animated = false,
  showLabel = true,
}: {
  label: string;
  tone?: Tone;
  aspect?: string;
  className?: string;
  /** Ambient slow zoom/pan — stands in for a looping background video on hero-scale blocks. */
  animated?: boolean;
  /** Hide the "[Photo: …]" text — for thumbnails too small to hold it. */
  showLabel?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <div
        className={`absolute inset-0 flex justify-center ${
          animated ? "items-start pt-20 md:pt-24" : "items-center"
        } ${toneClasses[tone]} ${animated ? "animate-ken-burns" : ""}`}
      >
        <TopographicOverlay id={patternIdFor(label)} />
        {showLabel && (
        <span className="relative max-w-xs px-6 text-center font-body text-[11px] uppercase tracking-[0.2em]">
          [Photo: {label}]
        </span>
        )}
      </div>
    </div>
  );
}
