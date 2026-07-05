"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Full-bleed hero. Drop a still (or a muted looping video) behind the title.
// The title reveals on load; the still gets a slow, almost imperceptible
// scale — the "footage, not a photo grid" feeling from the awwwards refs.
export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.2,
      });
      gsap.from(".hero-still", {
        scale: 1.08,
        duration: 1.8,
        ease: "power2.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-[100svh] w-full overflow-hidden">
      {/* Replace this div's background with a still from your own footage */}
      <div
        className="hero-still absolute inset-0 bg-bg-raised bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url(/media/stills/hero-still.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-10 pb-16">
        <h1 className="font-display text-[13vw] md:text-[7vw] leading-[0.92] tracking-tightest text-ink overflow-hidden">
          <span className="hero-line block">Journalist.</span>
          <span className="hero-line block">Filmmaker.</span>
        </h1>
        <p className="hero-line mt-6 max-w-md font-body text-ink-dim">
          Reporting, documentary film, and long-form writing from Amsterdam.
        </p>
      </div>
    </section>
  );
}
