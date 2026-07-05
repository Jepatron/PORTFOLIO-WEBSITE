"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.15,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="flex min-h-[100svh] w-full flex-col justify-between px-6 md:px-12 pt-28 pb-14"
    >
      <div />
      <div>
        <h1 className="overflow-hidden font-display leading-[0.88] tracking-tightest text-ink text-[17vw] md:text-[13vw]">
          <span className="hero-line block">Journalist.</span>
          <span className="hero-line block">Filmmaker.</span>
        </h1>
        <div className="hero-line mt-10 flex items-end justify-between border-t border-ink/15 pt-5">
          <p className="font-body text-sm text-ink-dim">
            Reporting, documentary film, and long-form writing — Amsterdam.
          </p>
          <span className="hidden font-body text-xs uppercase tracking-widest text-ink-dim md:block">
            Est. 2023
          </span>
        </div>
      </div>
    </section>
  );
}
