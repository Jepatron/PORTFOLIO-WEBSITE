"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, ctaLabel, site } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="font-display text-lg text-forest" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/80 transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/availability"
            className="rounded-sm bg-forest px-4 py-2 font-body text-xs uppercase tracking-[0.15em] text-cream transition-colors hover:bg-forest/90"
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
          <span className={`h-px w-6 bg-charcoal transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-charcoal transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
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
