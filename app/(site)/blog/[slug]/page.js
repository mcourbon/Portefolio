import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";
import { CallBanner, PageHeader } from "@/components/site/ui";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: post.seoTitle || post.title },
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
    inLanguage: "fr-FR",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader label="Blog" title={post.title}>
        <p className="text-base">
          Par {SITE.name} · <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </PageHeader>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-brun-doux">
          <Link href="/blog" className="hover:text-terre">← Tous les articles</Link>
        </nav>
        <div
          className="prose prose-lg prose-site max-w-none prose-table:text-base [&_table]:block [&_table]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      <CallBanner />
    </>
  );
}
