import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

export default function FeaturedWork() {
  const featured = projects[0];
  if (!featured) return null;

  const hasValidVimeo = featured.vimeoId && !featured.vimeoId.startsWith("REPLACE");
  const galleryPreview = featured.gallery?.slice(0, 3) ?? [];

  return (
    <section className="px-6 md:px-12 py-24 border-t border-ink/10">
      <div className="flex items-baseline justify-between mb-12">
        <p className="font-body text-xs uppercase tracking-widest text-ink-dim">Latest</p>
        <Link
          href={`/work/${featured.slug}`}
          className="font-body text-xs uppercase tracking-widest text-ink-dim hover:text-ink transition-colors"
        >
          View →
        </Link>
      </div>

      {featured.type === "video" && hasValidVimeo ? (
        <div className="relative aspect-video w-full overflow-hidden bg-bg-raised">
          <iframe
            src={`https://player.vimeo.com/video/${featured.vimeoId}?title=0&byline=0&portrait=0`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : galleryPreview.length > 0 ? (
        <div
          className={`grid gap-1 ${
            galleryPreview.length === 1
              ? "grid-cols-1"
              : galleryPreview.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {galleryPreview.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden bg-bg-raised">
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-raised">
          <Image src={featured.cover} alt={featured.title} fill className="object-cover" sizes="100vw" />
        </div>
      )}

      <div className="mt-8 border-t border-ink/10 pt-6">
        <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-3">
          {featured.type} — {featured.year}
        </p>
        <h3 className="font-display text-2xl md:text-4xl text-ink tracking-tightest">
          {featured.title}
        </h3>
        {featured.synopsis && (
          <p className="mt-3 max-w-lg font-body text-sm text-ink-dim leading-relaxed">
            {featured.synopsis}
          </p>
        )}
      </div>
    </section>
  );
}
