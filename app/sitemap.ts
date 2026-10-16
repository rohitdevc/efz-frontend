import type { MetadataRoute } from "next";
import { getDevelopments } from "@/lib/developments";

const SITE_URL = "https://www.eonfreezone.com";

const projects = await getDevelopments();

const staticPages = [
  "",
  "/about-us",
  "/project-developer",
  "/policy",
  "/contact-us",
  "/newsletters",
  "/gallery"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/${project.page_slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticUrls, ...projectUrls];
}
