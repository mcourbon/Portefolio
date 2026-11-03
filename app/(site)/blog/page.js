import Link from "next/link";
import { formatDate, getPosts } from "@/lib/blog";
import { CallBanner, PageHeader, Section } from "@/components/site/ui";

export const metadata = {
  title: "Blog",
  description:
    "Prix d'un site, référencement local, fiche Google : des réponses honnêtes aux questions que se posent les praticiens et les indépendants sur leur site internet.",
  alternates: { canonical: "/blog" },
};

export default async function Blog() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        label="Blog"
        title={
          <>
            Des réponses <span className="accent !text-[#ffd59a]">honnêtes</span> à vos questions
          </>
        }
      >
        <p>Ce qu'il faut savoir sur votre site et sur Google, sans jargon.</p>
      </PageHeader>

      <Section>
        <div className="mx-auto grid max-w-4xl gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-3xl border border-or/50 bg-creme p-8 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(143,61,29,0.55)]">
              <p className="text-sm text-brun-doux">{formatDate(post.date)}</p>
              <h2 className="mt-2 font-titre text-3xl font-bold group-hover:text-terre">{post.title}</h2>
              <p className="mt-3 leading-relaxed text-brun-doux">{post.description}</p>
              <p className="mt-5 font-medium text-terre">Lire l'article →</p>
            </Link>
          ))}
        </div>
      </Section>

      <CallBanner />
    </>
  );
}
