import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="hover"
      className="group relative block overflow-hidden border-t border-ink/10 py-8 md:py-10"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="font-body text-xs text-ink-dim">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="font-display text-3xl md:text-5xl text-ink transition-transform duration-500 group-hover:translate-x-2">
            {project.title}
          </h3>
        </div>
        <span className="hidden md:block font-body text-xs uppercase tracking-widest text-ink-dim">
          {project.type} — {project.year}
        </span>
      </div>
      {/* Reveal-on-hover preview image — common pattern in the awwwards refs you liked */}
      <div className="pointer-events-none absolute right-10 top-1/2 hidden w-64 -translate-y-1/2 translate-x-4 overflow-hidden opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        <Image
          src={project.cover}
          alt=""
          width={400}
          height={260}
          className="aspect-[4/3] object-cover"
        />
      </div>
    </Link>
  );
}
