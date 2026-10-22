export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO — rendered locale-aware in the UI
  readTime: string;
  photoLabel: string;
  body: string[];
}
