import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { projects } from "@/content/projects";

export const metadata = { title: "Photography — Jep Parker" };

const items = projects.filter((p) => p.type === "photo");

export default function PhotographyPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-32 pb-24">
        <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">
          <Link href="/work" className="hover:text-ink transition-colors">Work</Link>
          <span className="mx-2">·</span>Photography
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-ink tracking-tightest mb-16">
          Photography
        </h1>
        <div className="border-b border-ink/10">
          {items.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
