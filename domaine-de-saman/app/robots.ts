import type { MetadataRoute } from "next";
import { getContent } from "@/content";

const { site } = getContent("en");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
