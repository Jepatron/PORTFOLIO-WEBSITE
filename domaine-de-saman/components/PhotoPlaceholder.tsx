type Tone = "forest" | "cream" | "brass";

const toneClasses: Record<Tone, string> = {
  forest: "bg-forest text-cream/70",
  cream: "bg-cream-deep text-charcoal/45",
  brass: "bg-brass text-cream/85",
};

export default function PhotoPlaceholder({
  label,
  tone = "forest",
  aspect = "aspect-[4/3]",
  className = "",
}: {
  label: string;
  tone?: Tone;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${aspect} ${toneClasses[tone]} ${className}`}
    >
      <span className="max-w-xs px-6 text-center font-body text-[11px] uppercase tracking-[0.2em]">
        [Photo: {label}]
      </span>
    </div>
  );
}
