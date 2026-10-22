import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getContent, localizedPath } from "@/content";
import { getJournalPosts } from "@/content/journal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { pages } = getContent(locale);
  const title = `${pages.journal.title} — ${pages.journal.eyebrow}`;
  const description = pages.journal.intro;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/journal") },
    openGraph: { title, description, url: localizedPath(locale, "/journal") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Journal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { pages } = getContent(locale);
  const posts = getJournalPosts(locale);
  const p = pages.journal;
  const dateFormatter = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" });

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        body={p.intro}
        photoLabel={p.heroPhotoLabel}
        tone="forest"
        minHeight="min-h-[50svh]"
      />

      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        <div className="flex flex-col gap-12">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link href={`/journal/${post.slug}`} className="group grid gap-6 md:grid-cols-[1fr_1.4fr]">
                <PhotoPlaceholder
                  label={post.photoLabel}
                  tone={i % 2 === 0 ? "cream" : "brass"}
                  aspect="aspect-[4/3]"
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-charcoal/50">
                    {dateFormatter.format(new Date(post.date))} · {post.readTime}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-forest">{post.title}</h2>
                  <p className="mt-3 font-body text-sm leading-relaxed text-grey">{post.excerpt}</p>
                  <span className="mt-4 font-body text-xs uppercase tracking-[0.15em] text-brass transition-transform group-hover:translate-x-1">
                    {p.readMoreCta}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
