import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/services",
    // Derived, so a new service is never missing from the sitemap.
    ...services.map((service) => `/services/${service.slug}`),
    "/referrals",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.7 : 0.8,
  }));
}
