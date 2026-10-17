"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { articleCategories, type ArticleCategory, type Project } from "@/content/projects";

type Filter = "All" | ArticleCategory;

export default function ArticleIndex({ items }: { items: Project[] }) {
  const [active, setActive] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const cat of articleCategories) c[cat] = items.filter((p) => p.category === cat).length;
    return c;
  }, [items]);

  const visible = items.filter((p) => {
    if (active !== "All" && p.category !== active) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return [p.title, p.synopsis, p.category, p.publication]
      .filter(Boolean)
      .some((t) => t!.toLowerCase().includes(q));
  });

  const filters: Filter[] = ["All", ...articleCategories];

  return (
    <div>
      {/* Subject tabs */}
      <div className="border-t border-ink/10 pt-6">
        <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <div role="tablist" aria-label="Filter by subject" className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={isActive}
                  data-cursor="hover"
                  onClick={() => setActive(f)}
                  className={`whitespace-nowrap px-4 py-2.5 font-body text-[11px] uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "bg-ink text-bg" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {f === "All" ? "All writing" : f}
                  <span className={`ml-2 tabular-nums ${isActive ? "opacity-60" : "opacity-50"}`}>
                    {String(counts[f] ?? 0).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <label className="mt-5 flex items-center gap-3 border-b border-ink/10 pb-3">
          <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-dim">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the archive"
            className="w-full bg-transparent font-body text-xs uppercase tracking-widest text-ink placeholder:text-ink-dim focus:outline-none"
          />
        </label>
      </div>

      {/* List */}
      <ol className="mt-4">
        {visible.map((p, i) => (
          <li key={p.slug} className="border-b border-ink/10">
            <Link href={`/work/${p.slug}`} data-cursor="hover" className="group block py-9 md:py-11">
              <span className="font-body text-xs text-ink-dim tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink tracking-tightest leading-[1.05] transition-transform duration-500 ease-out group-hover:translate-x-2">
                {p.title}
              </h2>
              <p className="mt-3 max-w-2xl font-body text-sm md:text-base text-ink-dim leading-relaxed">
                {p.synopsis}
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-[11px] uppercase tracking-widest">
                {p.category && <span className="text-accent">{p.category}</span>}
                {p.publication && <span className="text-ink-dim">{p.publication}</span>}
                <span className="text-ink-dim tabular-nums">{p.year}</span>
              </p>
            </Link>
          </li>
        ))}
      </ol>

      {visible.length === 0 && (
        <div className="border-b border-ink/10 py-16">
          <p className="font-display text-2xl md:text-3xl text-ink tracking-tightest">
            {query ? "Nothing matches that search." : "Nothing here yet."}
          </p>
          <p className="mt-3 font-body text-sm text-ink-dim">
            {query
              ? "Try a different word, or clear the search."
              : `${active} pieces are on their way.`}
          </p>
        </div>
      )}
    </div>
  );
}
