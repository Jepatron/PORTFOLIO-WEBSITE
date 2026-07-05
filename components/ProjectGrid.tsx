import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      <p className="mb-10 font-body text-xs uppercase tracking-widest text-ink-dim">Selected work</p>
      <div className="border-b border-ink/10">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
