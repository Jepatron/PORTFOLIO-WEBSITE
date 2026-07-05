import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Work — Jep Parker" };

const categories = [
  { label: "Articles",    href: "/work/articles",    count: "04" },
  { label: "Videography", href: "/work/videography", count: "02" },
  { label: "Photography", href: "/work/photography", count: "—"  },
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-12 pt-36 pb-28">
        <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-14">Work</p>
        <div>
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex items-center justify-between border-t border-ink/10 py-8 md:py-10 last:border-b last:border-ink/10"
            >
              <span className="font-display text-5xl md:text-7xl text-ink tracking-tightest transition-transform duration-500 ease-out group-hover:translate-x-3">
                {cat.label}
              </span>
              <div className="flex items-center gap-6">
                <span className="hidden font-body text-xs uppercase tracking-widest text-ink-dim md:block">
                  {cat.count}
                </span>
                <span className="font-body text-sm text-ink-dim opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
