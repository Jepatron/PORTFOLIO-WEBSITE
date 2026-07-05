import Link from "next/link";

const categories = [
  { label: "Articles",    href: "/work#articles"    },
  { label: "Videography", href: "/work#videography" },
  { label: "Photography", href: "/work#photography" },
];

export default function WorkIndex() {
  return (
    <section className="px-6 md:px-10 py-20 border-t border-ink/10">
      <p className="font-body text-xs uppercase tracking-widest text-ink-dim mb-6">Work</p>
      <div className="border-b border-ink/10">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            data-cursor="hover"
            className="group flex items-center justify-between border-t border-ink/10 py-6 md:py-8"
          >
            <span className="font-display text-4xl md:text-6xl text-ink tracking-tightest transition-transform duration-300 group-hover:translate-x-2">
              {cat.label}
            </span>
            <span className="font-body text-sm text-ink-dim group-hover:text-ink transition-colors">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
