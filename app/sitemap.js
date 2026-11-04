import { getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

// Date de la dernière vraie modification de chaque page : à mettre à jour quand on change son contenu.
// Google se sert de cette date (lastmod) si elle est fiable, et ignore changefreq et priority, donc on ne les met pas.
const PAGES = {
  "/": "2026-11-04",
  "/realisations": "2026-11-03",
  "/offres": "2026-11-03",
  "/pour-qui/therapeutes": "2026-11-03",
  "/pour-qui/artistes-photographes": "2026-11-03",
  "/pour-qui/artisans": "2026-11-03",
  "/pour-qui/boutiques-en-ligne": "2026-11-03",
  "/blog": "2026-11-03",
  "/contact": "2026-11-03",
  "/mentions-legales": "2026-11-03",
};

export default async function sitemap() {
  const posts = await getPosts();
  return [
    ...Object.entries(PAGES).map(([page, lastModified]) => ({ url: `${SITE.url}${page === "/" ? "" : page}`, lastModified })),
    ...posts.map((post) => ({ url: `${SITE.url}/blog/${post.slug}`, lastModified: post.updated || post.date })),
  ];
}
