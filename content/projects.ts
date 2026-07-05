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
    slug: "tobias-nap",
    title: "Tobias Nap",
    year: "2025",
    type: "article",
    role: "Writer",
    synopsis: "Portret van de 22-jarige fotografiestudent Tobias Nap, wiens project Precious Devices 2024 de achterkanten van telefoons gebruikt om menselijke persoonlijkheid en onze relatie met technologie te onderzoeken.",
    cover: "/media/stills/article-cover.jpg",
    externalUrl: "/media/articles/TOBIASNAP~GOED.pdf",
  },
  {
    slug: "remko-de-waal",
    title: "Remko de Waal",
    year: "2025",
    type: "article",
    role: "Writer",
    synopsis: "Tien jaar na zijn belofte wint ANP-fotograaf Remko de Waal de Zilveren Camera 2024 met een iconisch beeld van Sifan Hassan tijdens de Olympische marathon in Parijs.",
    cover: "/media/stills/article-cover.jpg",
    externalUrl: "/media/articles/Focus%202025%20Remko%20de%20Waal.pdf",
  },
  {
    slug: "de-ondergedoken-camera",
    title: "De Ondergedoken Camera",
    year: "2025",
    type: "article",
    role: "Writer",
    synopsis: "Verslag van het boek en de expo van NIOD-onderzoekers Erik Somers en René Kok over de fotografen die met gevaar voor eigen leven het laatste jaar van de bezetting in Amsterdam vastlegden.",
    cover: "/media/stills/article-cover.jpg",
    externalUrl: "/media/articles/Focus%202025%20Deondergedokencamera%20v3.pdf",
  },
  {
    slug: "eric-levert",
    title: "Eric Levert",
    year: "2025",
    type: "article",
    role: "Writer, Photographer",
    synopsis: "Kunstenaar achter de kunstenaars. Gepubliceerd in Focus #3/2025.",
    cover: "/media/stills/article-cover.jpg",
    externalUrl: "/media/articles/Focus%20Erik%20Levert.pdf",
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
