import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

// Articles : fichiers Markdown de content/blog, avec un en-tête « clé: valeur » entre deux lignes « --- ».
const DIR = path.join(process.cwd(), "content/blog");

function parse(source, slug) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`En-tête manquant dans ${slug}.md`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index > 0) meta[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }
  return { slug, ...meta, body: match[2] };
}

export async function getPosts() {
  const files = (await readdir(DIR)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) => parse(await readFile(path.join(DIR, file), "utf8"), file.slice(0, -3)))
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug) {
  const posts = await getPosts();
  const post = posts.find((item) => item.slug === slug);
  return post ? { ...post, html: marked.parse(post.body) } : null;
}

export const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
