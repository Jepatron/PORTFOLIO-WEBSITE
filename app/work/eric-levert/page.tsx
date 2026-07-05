import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Eric Levert — Focus #3/2025",
};

// Export each PDF page as JPEG in Preview:
// View → Thumbnails → Cmd+A to select all → File → Export Selected Images → JPEG
// Name them page-1.jpg through page-6.jpg and drop in:
// public/media/stills/eric-levert/
const pages = [
  { src: "/media/stills/eric-levert/page-1.jpg", alt: "Focus #3/2025 — pagina 1" },
  { src: "/media/stills/eric-levert/page-2.jpg", alt: "Focus #3/2025 — pagina 2" },
  { src: "/media/stills/eric-levert/page-3.jpg", alt: "Focus #3/2025 — pagina 3" },
  { src: "/media/stills/eric-levert/page-4.jpg", alt: "Focus #3/2025 — pagina 4" },
  { src: "/media/stills/eric-levert/page-5.jpg", alt: "Focus #3/2025 — pagina 5" },
  { src: "/media/stills/eric-levert/page-6.jpg", alt: "Focus #3/2025 — pagina 6" },
];

export default function EricLevertPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-32 pb-24">

        {/* Header */}
        <div className="flex items-baseline justify-between mb-16">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-3">
              Artikel — Focus #3/2025
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ink tracking-tightest">
              Eric Levert
            </h1>
          </div>
          <p className="hidden md:block font-body text-xs text-ink-dim">
            tekst &amp; beeld: Jep van der Horst
          </p>
        </div>

        {/* Magazine pages stacked */}
        <div className="flex flex-col gap-2 max-w-3xl mx-auto">
          {pages.map((page) => (
            <div
              key={page.src}
              className="relative w-full aspect-[1/1.414] bg-bg-raised overflow-hidden"
            >
              <Image
                src={page.src}
                alt={page.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ))}
        </div>

        <Link
          href="/work"
          data-cursor="hover"
          className="mt-20 inline-block font-body text-sm text-ink-dim hover:text-ink transition-colors"
        >
          ← Terug naar werk
        </Link>
      </main>
      <Footer />
    </>
  );
}
