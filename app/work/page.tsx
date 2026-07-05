import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const metadata = {
  title: "Work — Jep Parker",
};

const sections = [
  { label: "Articles",     type: "article" },
  { label: "Videography",  type: "video"   },
  { label: "Photography",  type: "photo"   },
] as const;

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-32 pb-24">

        <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-16">
          Work
        </p>

        {sections.map(({ label, type }) => {
          const items = projects.filter((p) => p.type === type);
          if (items.length === 0) return null;
          return (
            <section key={type} id={type === "article" ? "articles" : type === "video" ? "videography" : "photography"} className="mb-20">
              <h2 className="font-display text-4xl md:text-6xl text-ink tracking-tightest mb-2">
                {label}
              </h2>
              <div className="border-b border-ink/10">
                {items.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
              </div>
            </section>
          );
        })}

      </main>
      <Footer />
    </>
  );
}
