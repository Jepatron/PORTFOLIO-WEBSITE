import PhotoPlaceholder from "./PhotoPlaceholder";
import Reveal from "./Reveal";

type Tone = "forest" | "cream" | "brass";

export default function ImmersiveBreak({
  label,
  tone = "cream",
  aspect = "aspect-[21/9]",
}: {
  label: string;
  tone?: Tone;
  aspect?: string;
}) {
  return (
    <Reveal>
      <PhotoPlaceholder label={label} tone={tone} aspect={aspect} animated />
    </Reveal>
  );
}
