import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}projects/`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${siteUrl}projects/${p.slug}/`, priority: 0.7 })),
  ];
}
