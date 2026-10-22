import type { Metadata } from "next";
import { getContent, localizedPath } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { privacyPolicy, pages } = getContent(locale);
  const title = pages.privacy.heading;
  const description = privacyPolicy.intro;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/privacy") },
    openGraph: { title, description, url: localizedPath(locale, "/privacy") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { privacyPolicy, pages } = getContent(locale);

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <h1 className="font-display text-3xl text-forest">{pages.privacy.heading}</h1>
        <p className="mt-6 font-body text-sm leading-relaxed text-grey">{privacyPolicy.intro}</p>
        <ul className="mt-6 space-y-4">
          {privacyPolicy.points.map((point) => (
            <li key={point} className="font-body text-sm leading-relaxed text-grey">
              — {point}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
