import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { getContent, localizedPath } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { ourStory } = getContent(locale);
  const title = `${ourStory.eyebrow} — ${ourStory.title}`;
  const description = ourStory.body[0];
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/our-story") },
    openGraph: { title, description, url: localizedPath(locale, "/our-story") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function OurStory({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { ourStory, ctaLabel, pages } = content;
  const p = pages.ourStory;

  return (
    <main>
      <PageHero
        eyebrow={ourStory.eyebrow}
        title={ourStory.title}
        photoLabel={p.heroPhotoLabel}
        tone="brass"
        minHeight="min-h-[70svh]"
      />

      {/* The story, told as alternating photo and paragraph. */}
      <section className="mx-auto max-w-6xl space-y-16 px-6 py-16 md:space-y-24 md:px-10 md:py-24">
        {ourStory.body.map((paragraph, i) => (
          <Reveal key={paragraph} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <PhotoPlaceholder
                label={ourStory.photoLabels[i] ?? ourStory.photoLabels[0]}
                tone={i % 2 === 1 ? "brass" : "cream"}
                aspect={i % 2 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
              />
            </div>
            <p className="font-body text-base leading-relaxed text-grey md:text-lg">{paragraph}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-forest">
        <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10 md:py-32">
          <p className="font-display text-2xl leading-snug text-cream md:text-4xl">{ourStory.statement}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <h2 className="text-center font-display text-3xl text-forest md:text-4xl">{ourStory.essence.heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {ourStory.essence.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <PhotoPlaceholder label={item.photoLabel} tone="cream" aspect="aspect-[3/4]" />
              <h3 className="mt-5 font-body text-xs uppercase tracking-[0.25em] text-brass">{item.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-grey">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner heading={p.ctaHeading} body={p.ctaBody} ctaLabel={ctaLabel} />
    </main>
  );
}
