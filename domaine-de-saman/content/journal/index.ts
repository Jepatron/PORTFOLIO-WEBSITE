import { en } from "./en";
import { fr } from "./fr";
import { de } from "./de";
import type { JournalPost } from "./types";
import type { Locale } from "@/content";

const posts: Record<Locale, JournalPost[]> = { en, fr, de };

export function getJournalPosts(locale: string): JournalPost[] {
  return posts[(locale in posts ? locale : "en") as Locale];
}

export function getJournalPost(locale: string, slug: string): JournalPost | undefined {
  return getJournalPosts(locale).find((p) => p.slug === slug);
}

export type { JournalPost } from "./types";
