import { getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

const PAGES = ["/", "/realisations", "/offres", "/pour-qui", "/pour-qui/therapeutes", "/pour-qui/artistes-photographes", "/pour-qui/artisans", "/pour-qui/boutiques-en-ligne", "/blog", "/contact", "/mentions-legales"];

export default async function sitemap() {
  const posts = await getPosts();
  return [
    ...PAGES.map((page) => ({ url: `${SITE.url}${page === "/" ? "" : page}` })),
    ...posts.map((post) => ({ url: `${SITE.url}/blog/${post.slug}`, lastModified: post.updated || post.date })),
  ];
}
