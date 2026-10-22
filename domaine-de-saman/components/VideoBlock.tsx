import Reveal from "./Reveal";

export default function VideoBlock({
  src,
  poster,
  aspect = "aspect-[21/9]",
  className = "",
}: {
  src: string;
  poster: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <Reveal className={`overflow-hidden ${aspect} ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </Reveal>
  );
}
