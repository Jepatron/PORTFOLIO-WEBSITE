"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";

// Wraps the whole app. Makes scrolling feel weighted instead of the
// default browser jump-scroll. Also ticks GSAP's ScrollTrigger on the
// same frame loop so animations stay in sync with scroll position.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      lenis.destroy();
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
