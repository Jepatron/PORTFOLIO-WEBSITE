import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Work — Jep Parker" };

const categories = [
  { label: "Articles",    href: "/work/articles"    },
  { label: "Videography", href: "/work/videography" },
  { label: "Photography", href: "/work/photography" },
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 pt-32 pb-24">
        <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">Work</p>
        <div className="border-b border-ink/10">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              data-cursor="hover"
              className="group flex items-center justify-between border-t border-ink/10 py-8 md:py-10"
            >
              <span className="font-display text-5xl md:text-7xl text-ink tracking-tightest transition-transform duration-300 group-hover:translate-x-2">
                {cat.label}
              </span>
              <span className="font-body text-sm text-ink-dim group-hover:text-ink transition-colors">→</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
