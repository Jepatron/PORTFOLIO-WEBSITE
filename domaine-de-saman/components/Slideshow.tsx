"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";
import type { SiteContent } from "@/content";

type Tone = "forest" | "cream" | "brass";

// A slide is either a placeholder label (rendered as a PhotoPlaceholder) or
// a real photo once one exists — drop the file in public/media/ and pass
// { src: "/media/...", alt: "..." } instead of the label string.
export type Slide = string | { src: string; alt: string };

const SWIPE_THRESHOLD = 40;

export default function Slideshow({
  slides,
  labels,
  tone = "cream",
  aspect = "aspect-[4/3]",
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  compact = false,
}: {
  slides: Slide[];
  labels: SiteContent["slideshow"];
  tone?: Tone;
  aspect?: string;
  className?: string;
  sizes?: string;
  /** Thumbnail size: dots and swipe only, no arrows or counter. */
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const dragStart = useRef<number | null>(null);
  const count = slides.length;
  const go = (i: number) => setIndex((i + count) % count);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragStart.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1));
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  }

  return (
    <div
      className={`group/slides relative overflow-hidden ${aspect} ${className}`}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="flex h-full touch-pan-y transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStart.current = null)}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full w-full shrink-0"
            aria-hidden={i !== index}
            aria-roledescription="slide"
          >
            {typeof slide === "string" ? (
              <PhotoPlaceholder label={slide} tone={tone} aspect="aspect-auto" className="h-full w-full" showLabel={!compact} />
            ) : (
              <Image src={slide.src} alt={slide.alt} fill sizes={sizes} className="object-cover" draggable={false} />
            )}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {!compact && (
          <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={labels.previous}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-forest shadow-sm backdrop-blur-sm transition-opacity hover:bg-cream md:opacity-0 md:group-hover/slides:opacity-100 md:group-focus-within/slides:opacity-100"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={labels.next}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-forest shadow-sm backdrop-blur-sm transition-opacity hover:bg-cream md:opacity-0 md:group-hover/slides:opacity-100 md:group-focus-within/slides:opacity-100"
          >
            <Chevron direction="right" />
          </button>
          </>
          )}

          {/* Keeps the dots legible on light placeholders and bright photos alike. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-charcoal/35 to-transparent" />
          <div className={`absolute inset-x-0 flex items-center justify-center gap-1.5 ${compact ? "bottom-2" : "bottom-3"}`}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={labels.goTo.replace("{n}", String(i + 1))}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-cream" : "w-1.5 bg-cream/55 hover:bg-cream/80"
                }`}
              />
            ))}
          </div>

          {!compact && (
          <span className="absolute right-3 top-3 rounded-full bg-charcoal/45 px-2.5 py-1 font-body text-[10px] tracking-[0.15em] text-cream backdrop-blur-sm">
            {index + 1} / {count}
          </span>
          )}
        </>
      )}
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M9 2 4 7l5 5" : "M5 2l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
