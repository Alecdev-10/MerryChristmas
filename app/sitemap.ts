import type { MetadataRoute } from "next";
import { RAYONS } from "@/data/rayons";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    ...RAYONS.map((r) => ({ url: `${SITE_URL}/${r.slug}`, changeFrequency: "daily" as const, priority: 0.8 })),
  ];
}
