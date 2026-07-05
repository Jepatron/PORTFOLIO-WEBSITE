// Add a new project by adding an entry to this array.
// type controls how the project card + project page render.

export type ProjectType = "video" | "photo" | "article";

export type Project = {
  slug: string;              // used in the URL: /work/[slug]
  title: string;
  year: string;
  type: ProjectType;
  role: string;               // e.g. "Director, Editor" or "Writer"
  synopsis: string;           // one or two sentences, shown on the grid card
  cover: string;               // path under /public/media/stills
  // VIDEO projects
  vimeoId?: string;            // just the numeric Vimeo ID, e.g. "1023456789"
  // PHOTO projects
  gallery?: string[];          // paths under /public/media/stills
  // ARTICLE projects
  body?: string;               // markdown or plain text body
  externalUrl?: string;        // if published elsewhere (e.g. Het Parool), link out instead
};

export const projects: Project[] = [
  {
    slug: "eric-levert",
    title: "Eric Levert",
    year: "2025",
    type: "article",
    role: "Writer, Photographer",
    synopsis: "Kunstenaar achter de kunstenaars. Gepubliceerd in Focus #3/2025.",
    cover: "/media/stills/eric-levert/portret.jpg",
  },
  {
    slug: "bijna",
    title: "Bijna",
    year: "2026",
    type: "video",
    role: "Director, Editor",
    synopsis:
      "A 24-year-old's attempt to qualify for the Hyrox World Cup in Heerenveen.",
    cover: "/media/stills/bijna-cover.jpg",
    vimeoId: "REPLACE_WITH_VIMEO_ID",
  },
  {
    slug: "ce-quelle-a-plante",
    title: "Ce Qu'elle a Planté",
    year: "2025–",
    type: "video",
    role: "Director, Editor",
    synopsis:
      "A multi-year documentary about a grandmother's property in the foothills of the Pyrénées.",
    cover: "/media/stills/pyrenees-cover.jpg",
    vimeoId: "REPLACE_WITH_VIMEO_ID",
  },
  {
    slug: "example-photo-story",
    title: "Example Photo Story",
    year: "2026",
    type: "photo",
    role: "Photographer",
    synopsis: "Swap this out for a real photo essay — stills only, no video.",
    cover: "/media/stills/example-cover.jpg",
    gallery: [
      "/media/stills/example-1.jpg",
      "/media/stills/example-2.jpg",
      "/media/stills/example-3.jpg",
    ],
  },
  {
    slug: "example-article",
    title: "Example Article",
    year: "2026",
    type: "article",
    role: "Writer",
    synopsis: "Swap this for a real piece — either paste the text or link out.",
    cover: "/media/stills/article-cover.jpg",
    body: "Replace this with your article text, or set externalUrl instead and this project card will link out to where it's published.",
  },
];
