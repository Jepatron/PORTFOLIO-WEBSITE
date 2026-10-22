import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import ImmersiveBreak from "@/components/ImmersiveBreak";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { getContent, localizedPath } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { weddings, pages } = getContent(locale);
  const title = `${pages.weddings.title} — ${pages.weddings.eyebrow}`;
  const description = weddings.intro;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/weddings") },
    openGraph: { title, description, url: localizedPath(locale, "/weddings") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Weddings({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { weddings, contact, enquiryForm, pages } = content;
  const p = pages.weddings;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        body={weddings.intro}
        photoLabel={p.heroPhotoLabel}
        tone="brass"
        primaryCta={{ label: p.primaryCtaLabel, href: "#enquire" }}
        secondaryCta={{ label: p.secondaryCtaLabel, href: "/the-estate" }}
      />

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:px-10">
        <PhotoPlaceholder label={weddings.ceremony.photoLabel} tone="cream" aspect="aspect-[4/3]" />
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-2xl text-forest">{p.ceremonyHeading}</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.ceremony.body}</p>
        </div>
      </Reveal>

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-3 md:px-10">
        <div>
          <h3 className="font-display text-xl text-forest">{p.capacityHeading}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.capacity}</p>
        </div>
        <div>
          <h3 className="font-display text-xl text-forest">{p.cateringHeading}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.catering}</p>
        </div>
        <div>
          <h3 className="font-display text-xl text-forest">{p.noiseHeading}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{weddings.noise}</p>
        </div>
      </Reveal>

      <ImmersiveBreak label={p.immersiveLabel} tone="brass" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="border-l-2 border-brass/60 bg-cream-deep px-6 py-5">
          <p className="font-body text-sm leading-relaxed text-charcoal/70">{weddings.approachNote}</p>
        </div>
      </section>

      <section id="enquire" className="bg-cream-deep">
        <Reveal className="mx-auto max-w-2xl px-6 py-16 md:px-10">
          <h2 className="font-display text-2xl text-forest">{p.enquireHeading}</h2>
          <p className="mt-2 font-body text-sm text-grey">{p.enquireBody}</p>
          <div className="mt-8">
            <EnquiryForm contact={contact} form={enquiryForm} defaultPurpose="wedding" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
