import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArticleIndex from "@/components/ArticleIndex";
import Link from "next/link";
import { projects } from "@/content/projects";

export const metadata = { title: "Articles — Jep Parker" };

const items = projects.filter((p) => p.type === "article");

export default function ArticlesPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-12 pt-36 pb-28">
        <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-14">
          <Link href="/work" className="hover:text-ink transition-colors">Work</Link>
          <span className="mx-2 opacity-40">·</span>Articles
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-ink tracking-tightest leading-[0.9]">
          Articles
        </h1>
        <p className="mt-8 mb-16 max-w-xl font-body text-ink-dim leading-relaxed">
          Interviews, reportage, essays, philosophy, poetry and short fiction.
        </p>
        <ArticleIndex items={items} />
      </main>
      <Footer />
    </>
  );
}
