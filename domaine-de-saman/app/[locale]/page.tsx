import HomeHero from "@/components/HomeHero";
import AudienceCards from "@/components/AudienceCards";
import HighlightsStrip from "@/components/HighlightsStrip";
import HowItWorks from "@/components/HowItWorks";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { getContent } from "@/content";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { site, theView, morningPiece, ctaLabel, audiences, highlights, howItWorks, ui, pages } = content;

  return (
    <main>
      <HomeHero site={site} ctaLabel={ctaLabel} />

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-24">
        <PhotoPlaceholder label={site.introPhotoLabel} tone="cream" aspect="aspect-[4/3]" />
        <p className="font-body text-base leading-relaxed text-grey">{site.intro}</p>
      </Reveal>

      <AudienceCards audiences={audiences} learnMoreCta={ui.learnMoreCta} />
      <HighlightsStrip highlights={highlights} />

      <section className="bg-forest">
        <PhotoPlaceholder label={theView.photoLabel} tone="forest" aspect="aspect-[16/9]" animated />
        <Reveal className="mx-auto max-w-2xl px-6 py-16 text-center md:px-10 md:py-24">
          <p className="font-display text-xl leading-relaxed text-cream md:text-2xl">{theView.body}</p>
        </Reveal>
      </section>

      <Reveal className="mx-auto grid max-w-4xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center md:px-10">
        <PhotoPlaceholder label={morningPiece.photoLabel} tone="cream" aspect="aspect-[4/3]" />
        <p className="font-body text-sm leading-relaxed text-grey">{morningPiece.body}</p>
      </Reveal>

      <HowItWorks howItWorks={howItWorks} eyebrow={ui.howItWorksEyebrow} />
      <CTABanner heading={pages.home.ctaHeading} body="" ctaLabel={ctaLabel} />
    </main>
  );
}
