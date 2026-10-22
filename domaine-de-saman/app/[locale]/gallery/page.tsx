import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getContent, localizedPath } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { estate, pages } = getContent(locale);
  const title = `${pages.gallery.title} — ${pages.gallery.eyebrow}`;
  const description = `${estate.description}`;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/gallery") },
    openGraph: { title, description, url: localizedPath(locale, "/gallery") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Gallery({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { estate, galleryIntro, pages } = content;
  const p = pages.gallery;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        body={p.heroBody}
        photoLabel={p.heroPhotoLabel}
        tone="brass"
        minHeight="min-h-[55svh]"
      />

      <Reveal className="mx-auto max-w-2xl px-6 pt-16 text-center md:px-10">
        <p className="font-display text-xl text-forest md:text-2xl">{galleryIntro}</p>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {estate.galleryPhotos.map((label, i) => (
            <Reveal key={label} delay={(i % 3) * 0.08} className="group overflow-hidden">
              <PhotoPlaceholder
                label={label}
                tone={i % 3 === 0 ? "forest" : i % 3 === 1 ? "cream" : "brass"}
                aspect="aspect-square"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
