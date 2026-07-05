"use client";

import { useEffect, useRef } from "react";

// A small dot that follows the pointer and grows over links/images.
// Add data-cursor="hover" to any element you want it to react to.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch devices

    const dot = dotRef.current;
    if (!dot) return;

    let x = 0, y = 0, targetX = 0, targetY = 0;

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", move);

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const hoverables = document.querySelectorAll('[data-cursor="hover"]');
    const grow = () => dot.classList.add("cursor-grow");
    const shrink = () => dot.classList.remove("cursor-grow");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink mix-blend-difference transition-transform duration-200 ease-out [&.cursor-grow]:scale-[4]"
    />
  );
}
