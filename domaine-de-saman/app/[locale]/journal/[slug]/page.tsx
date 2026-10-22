import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import ImmersiveBreak from "@/components/ImmersiveBreak";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { getContent, locales, localizedPath } from "@/content";
import { getJournalPost, getJournalPosts } from "@/content/journal";

export function generateStaticParams() {
  return locales.flatMap((locale) => getJournalPosts(locale).map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getJournalPost(locale, slug);
  if (!post) return {};
  const title = post.title;
  const description = post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, `/journal/${slug}`) },
    openGraph: { title, description, url: localizedPath(locale, `/journal/${slug}`) },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getJournalPost(locale, slug);
  if (!post) notFound();

  const content = getContent(locale);
  const { ctaLabel, pages } = content;
  const p = pages.journal;
  const dateFormatter = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" });

  return (
    <main>
      <div className="pt-20" />
      <ImmersiveBreak label={post.photoLabel} tone="forest" aspect="aspect-[16/7]" />

      <section className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <Reveal>
          <Link
            href="/journal"
            className="font-body text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:text-brass/70"
          >
            {p.backCta}
          </Link>
          <p className="mt-6 font-body text-xs uppercase tracking-[0.15em] text-charcoal/50">
            {dateFormatter.format(new Date(post.date))} · {post.readTime}
          </p>
          <h1 className="mt-2 font-display text-3xl text-forest md:text-4xl">{post.title}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          {post.body.map((paragraph) => (
            <p key={paragraph} className="mt-6 font-body text-base leading-relaxed text-grey first:mt-8">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      <CTABanner heading={pages.availability.title} body={pages.availability.heroBody} ctaLabel={ctaLabel} />
    </main>
  );
}
