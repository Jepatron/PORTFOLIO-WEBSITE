import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-32 pb-24">
        <p className="font-body text-xs uppercase tracking-widest text-ink-dim">
          {project.type} — {project.year} — {project.role}
        </p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl text-ink tracking-tightest">
          {project.title}
        </h1>
        <p className="mt-6 max-w-xl font-body text-ink-dim">{project.synopsis}</p>

        <div className="mt-14">
          {project.type === "video" && project.vimeoId && (
            <div className="relative aspect-video w-full overflow-hidden bg-bg-raised">
              <iframe
                src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0`}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {project.type === "photo" && project.gallery && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.gallery.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                />
              ))}
            </div>
          )}

          {project.type === "article" && (
            <div className="max-w-2xl font-body text-ink/90 leading-relaxed">
              {project.externalUrl ? (
                <a
                  href={project.externalUrl}
                  data-cursor="hover"
                  className="underline underline-offset-4 hover:text-accent"
                >
                  Read the full piece →
                </a>
              ) : (
                <p className="whitespace-pre-wrap">{project.body}</p>
              )}
            </div>
          )}
        </div>

        <Link
          href="/#work"
          data-cursor="hover"
          className="mt-20 inline-block font-body text-sm text-ink-dim hover:text-ink transition-colors"
        >
          ← Back to work
        </Link>
      </main>
      <Footer />
    </>
  );
}
