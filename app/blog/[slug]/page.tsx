import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { blogPosts } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return {
    title: post?.title ?? "Blog",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="bg-white">
          <header className="container-shell grid gap-10 py-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <Link href="/blog" className="btn-ghost -ml-2 mb-7">
                <ArrowLeft size={17} /> Bloga dön
              </Link>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{post.category}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--navy)] md:text-[56px]">{post.title}</h1>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                <span>{post.date}</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-[var(--blue)]" /> {post.readTime}
                </span>
              </div>
            </div>
            <Image src={post.hero} alt="" width={900} height={560} className="max-h-[430px] w-full rounded-[14px] border border-[var(--border)] object-cover shadow-[var(--shadow-soft)]" priority />
          </header>

          <div className="container-shell grid gap-10 pb-20 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <aside className="sticky top-28 space-y-5">
              <div className="surface-card rounded-[14px] p-5">
                <h2 className="font-bold text-[var(--navy)]">Kısa özet</h2>
                <ul className="mt-4 space-y-3">
                  {post.takeaways.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--blue)]" size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[14px] border border-[var(--border)] bg-[var(--warning-bg)] p-5">
                <ShieldAlert className="text-[var(--warning)]" size={22} />
                <h2 className="mt-3 font-bold text-[var(--navy)]">Tıbbi uyarı</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Bu içerik tanı, tedavi veya acil sağlık yönlendirmesi değildir. Acil durumlarda doğrudan sağlık hizmetlerine başvurun.
                </p>
              </div>
            </aside>

            <div className="surface-card rounded-[14px] bg-white p-7 md:p-9">
              <div className="space-y-10">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-bold text-[var(--navy)]">{section.heading}</h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-lg leading-8 text-[var(--text-secondary)]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <div className="mt-10 rounded-[14px] bg-[var(--pale-blue)] p-6">
                <h2 className="text-xl font-bold text-[var(--navy)]">Başvuruya hazır mısınız?</h2>
                <p className="mt-2 leading-7 text-[var(--text-secondary)]">
                  Klinik sorunuzu, görüntüleme dosyanızı ve varsa ek belgelerinizi adım adım ekleyebilirsiniz.
                </p>
                <Link href="/app/cases/new" className="btn-primary arrow-nudge mt-5">
                  İkinci Görüş Al <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        <section className="section-space bg-[var(--background)]">
          <div className="container-shell">
            <h2 className="mb-8 text-3xl font-bold text-[var(--navy)]">İlgili rehberler</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="group surface-card block rounded-[14px] p-6 transition-all hover:-translate-y-0.5 hover:border-[rgba(20,111,193,0.42)]">
                  <span className="rounded-full bg-[var(--pale-blue)] px-3 py-1 text-xs font-bold text-[var(--blue)]">{item.category}</span>
                  <h3 className="mt-4 text-xl font-bold leading-tight text-[var(--navy)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[var(--blue)]">
                    Oku <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
