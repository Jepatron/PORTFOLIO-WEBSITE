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
  const { retreats, pages } = getContent(locale);
  const title = `${pages.retreats.title} — ${pages.retreats.eyebrow}`;
  const description = retreats.intro;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/retreats") },
    openGraph: { title, description, url: localizedPath(locale, "/retreats") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Retreats({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { retreats, contact, enquiryForm, pages } = content;
  const p = pages.retreats;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        body={retreats.intro}
        photoLabel={p.heroPhotoLabel}
        tone="forest"
        primaryCta={{ label: p.primaryCtaLabel, href: "#enquire" }}
        secondaryCta={{ label: p.secondaryCtaLabel, href: "/the-estate" }}
      />

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:px-10">
        <PhotoPlaceholder label={retreats.yogaDeck.photoLabel} tone="cream" aspect="aspect-[4/3]" />
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-2xl text-forest">{p.yogaDeckHeading}</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.yogaDeck.body}</p>
        </div>
      </Reveal>

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-2 md:px-10">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <h2 className="font-display text-2xl text-forest">{p.gymHeading}</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.gym.body}</p>
        </div>
        <PhotoPlaceholder label={retreats.gym.photoLabel} tone="cream" aspect="aspect-[4/3]" className="order-1 md:order-2" />
      </Reveal>

      <ImmersiveBreak label={p.immersiveLabel} tone="forest" />

      <Reveal className="mx-auto max-w-2xl px-6 py-16 text-center md:px-10">
        <p className="font-body text-base leading-relaxed text-grey">{retreats.longerSection}</p>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="border-l-2 border-brass/60 bg-cream-deep px-6 py-5">
          <p className="font-body text-sm leading-relaxed text-charcoal/70">{retreats.disclaimer}</p>
        </div>
      </section>

      <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-2 md:px-10">
        <div>
          <h3 className="font-display text-xl text-forest">{p.selfCateringHeading}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.selfCatering}</p>
        </div>
        <div>
          <h3 className="font-display text-xl text-forest">{p.groupRatesHeading}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-grey">{retreats.groupRates}</p>
        </div>
      </Reveal>

      <section id="enquire" className="bg-cream-deep">
        <Reveal className="mx-auto max-w-2xl px-6 py-16 md:px-10">
          <h2 className="font-display text-2xl text-forest">{p.enquireHeading}</h2>
          <p className="mt-2 font-body text-sm text-grey">{p.enquireBody}</p>
          <div className="mt-8">
            <EnquiryForm contact={contact} form={enquiryForm} defaultPurpose="retreat" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
