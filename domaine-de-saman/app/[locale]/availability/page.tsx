import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { getContent, localizedPath } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { pages } = getContent(locale);
  const title = `${pages.availability.title} — ${pages.availability.eyebrow}`;
  const description = pages.availability.heroBody;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/availability") },
    openGraph: { title, description, url: localizedPath(locale, "/availability") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Availability({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { contact, highlights, faqs, enquiryForm, site, pages } = content;
  const p = pages.availability;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        body={p.heroBody}
        photoLabel={p.heroPhotoLabel}
        tone="forest"
        minHeight="min-h-[50svh]"
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <div className="border border-charcoal/10 bg-cream p-8 shadow-sm md:p-10">
              <EnquiryForm contact={contact} form={enquiryForm} />
            </div>
            <p className="mt-6 text-center font-body text-sm text-grey lg:text-left">
              {p.preferEmailBody}{" "}
              <a href={`mailto:${contact.email}`} className="text-forest underline">
                {contact.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border border-charcoal/10 bg-cream-deep p-8">
              <h2 className="font-display text-xl text-forest">{p.glanceHeading.replace("{site}", site.name)}</h2>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                {highlights.slice(0, 4).map((h) => (
                  <div key={h.label}>
                    <dt className="font-display text-2xl text-forest">{h.value}</dt>
                    <dd className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
                      {h.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 font-body text-sm leading-relaxed text-grey">{p.replyNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-deep">
        <Reveal className="mx-auto max-w-3xl px-6 py-16 md:px-10">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">{p.faqEyebrow}</p>
          <h2 className="mt-2 font-display text-2xl text-forest">{p.faqHeading}</h2>
          <div className="mt-8">
            <FAQ faqs={faqs} />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
