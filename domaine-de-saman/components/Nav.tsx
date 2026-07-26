"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, ctaLabel, site } from "@/content/site";

// Pages without a dark, full-bleed hero directly under the nav — the nav
// stays solid on these from the start instead of floating transparent.
const SOLID_FROM_TOP = ["/privacy"];

export default function Nav() {
  const pathname = usePathname();
  const isImmersive = !SOLID_FROM_TOP.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isImmersive) return;
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isImmersive]);

  const solid = !isImmersive || scrolled || open;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-300 ${
        solid
          ? "border-b border-charcoal/10 bg-cream/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`font-display text-lg transition-colors duration-300 ${solid ? "text-forest" : "text-cream"}`}
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:opacity-70 ${
                solid ? "text-charcoal/80" : "text-cream/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/availability"
            className={`rounded-sm px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-md ${
              solid ? "bg-forest text-cream hover:bg-forest/90" : "bg-cream text-forest hover:bg-cream-deep"
            }`}
          >
            {ctaLabel}
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 transition-transform ${solid ? "bg-charcoal" : "bg-cream"} ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 transition-transform ${solid ? "bg-charcoal" : "bg-cream"} ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-charcoal/10 bg-cream px-6 pb-6 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 font-body text-sm uppercase tracking-[0.15em] text-charcoal/80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/availability"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-sm bg-forest px-4 py-3 text-center font-body text-xs uppercase tracking-[0.15em] text-cream"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </nav>
  );
}
