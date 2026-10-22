import type { MetadataRoute } from "next";
import { getContent, locales } from "@/content";
import { getJournalPosts } from "@/content/journal";

// Static, hand-maintained list — add a line here whenever a new page is added.
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/the-estate", priority: 0.9, changeFrequency: "monthly" },
  { path: "/the-farmhouse", priority: 0.7, changeFrequency: "monthly" },
  { path: "/stay", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reserve", priority: 0.8, changeFrequency: "monthly" },
  { path: "/weddings", priority: 0.8, changeFrequency: "monthly" },
  { path: "/retreats", priority: 0.8, changeFrequency: "monthly" },
  { path: "/region", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/our-story", priority: 0.5, changeFrequency: "yearly" },
  { path: "/availability", priority: 0.9, changeFrequency: "monthly" },
  { path: "/journal", priority: 0.6, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  // Journal posts share the same slug across every locale, so listing the
  // English ones is enough to derive every locale's path.
  ...getJournalPosts("en").map((post) => ({
    path: `/journal/${post.slug}`,
    priority: 0.5,
    changeFrequency: "yearly" as const,
  })),
];

const { site } = getContent("en");

// English stays unprefixed ("as-needed" locale prefix strategy — matches
// i18n/routing.ts); French and German get real /fr and /de URLs, each
// listed with hreflang alternates pointing at every language variant.
function localizedPath(locale: string, path: string) {
  return locale === "en" ? path : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${site.url}${localizedPath(locale, route.path)}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}${localizedPath(l, route.path)}`])
        ),
      },
    }))
  );
}
