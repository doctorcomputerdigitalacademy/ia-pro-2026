import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/landing/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-17");
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/conditions-generales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politique-de-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
