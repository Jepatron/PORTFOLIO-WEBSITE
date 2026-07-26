type Tone = "forest" | "cream" | "brass";

const toneClasses: Record<Tone, string> = {
  forest: "bg-gradient-to-br from-forest via-forest to-[#233a30] text-cream/75",
  cream: "bg-gradient-to-br from-cream-deep to-[#ece4cf] text-charcoal/45",
  brass: "bg-gradient-to-br from-brass to-[#83652f] text-cream/85",
};

export default function PhotoPlaceholder({
  label,
  tone = "forest",
  aspect = "aspect-[4/3]",
  className = "",
  animated = false,
}: {
  label: string;
  tone?: Tone;
  aspect?: string;
  className?: string;
  /** Ambient slow zoom/pan — stands in for a looping background video on hero-scale blocks. */
  animated?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <div
        className={`absolute inset-0 flex justify-center ${
          animated ? "items-start pt-20 md:pt-24" : "items-center"
        } ${toneClasses[tone]} ${animated ? "animate-ken-burns" : ""}`}
      >
        <span className="max-w-xs px-6 text-center font-body text-[11px] uppercase tracking-[0.2em]">
          [Photo: {label}]
        </span>
      </div>
    </div>
  );
}
