import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

// This always shows the first project in content/projects.ts.
// To update it, just move your newest project to the top of that array.
export default function FeaturedWork() {
  const featured = projects[0];
  if (!featured) return null;

  const hasValidVimeo =
    featured.vimeoId && !featured.vimeoId.startsWith("REPLACE");
  const galleryPreview = featured.gallery?.slice(0, 3) ?? [];

  return (
    <section className="px-6 md:px-10 py-20 border-t border-ink/10">
      <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-10">
        Latest
      </p>

      {/* ── Media ── */}
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
          className={`grid gap-2 ${
            galleryPreview.length === 1
              ? "grid-cols-1"
              : galleryPreview.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {galleryPreview.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/3] bg-bg-raised overflow-hidden"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden bg-bg-raised">
          <Image
            src={featured.cover}
            alt={featured.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Info ── */}
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-2">
            {featured.type} — {featured.year}
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-ink tracking-tightest">
            {featured.title}
          </h3>
          {featured.synopsis && (
            <p className="mt-2 max-w-md font-body text-sm text-ink-dim">
              {featured.synopsis}
            </p>
          )}
        </div>
        <Link
          href={`/work/${featured.slug}`}
          data-cursor="hover"
          className="shrink-0 font-body text-sm text-ink-dim hover:text-ink transition-colors"
        >
          View →
        </Link>
      </div>
    </section>
  );
}
