import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "about/", "projects/", ...projects.map((p) => `projects/${p.id}/`), "team/", "engagements/", "partners/", "contact/"];
  return paths.map((p) => ({ url: `${siteUrl}/${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
