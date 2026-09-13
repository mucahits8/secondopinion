import Image from "next/image";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen, Clock, FileQuestion, ShieldCheck, type LucideIcon } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { SectionHeader } from "@/components/cards";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/data/blog";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const common = await getTranslations("common");
  const posts = t.raw("posts") as BlogPost[];
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const secondaryPosts = posts.filter((post) => post.slug !== featured.slug);
  const categories = [t("page.all"), ...Array.from(new Set(posts.map((post) => post.category)))];
  const trustIcons: LucideIcon[] = [FileQuestion, ShieldCheck, BookOpen];
  const trustNotes = t.raw("page.trustNotes") as Array<{ title: string; text: string }>;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-white py-20">
          <div className="absolute inset-0 medical-glow opacity-70" />
          <div className="container-shell relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("page.eyebrow")}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--navy)] md:text-[58px]">{t("page.title")}</h1>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{t("page.text")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {categories.map((category) => {
                  const href = category === t("page.all") ? "#all-posts" : `/blog/${posts.find((post) => post.category === category)?.slug ?? featured.slug}`;
                  return (
                    <Link key={category} href={href} className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-bold text-[var(--navy)] transition-colors hover:border-[var(--blue)] hover:text-[var(--blue)]">
                      {category}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link href={`/blog/${featured.slug}`} className="group surface-card grid overflow-hidden rounded-[14px] bg-white shadow-[var(--shadow-soft)] md:grid-cols-[0.95fr_1.05fr]">
              <Image src={featured.hero} alt="" width={720} height={480} className="h-full min-h-[320px] w-full object-cover" priority />
              <div className="p-7">
                <span className="rounded-full bg-[var(--pale-blue)] px-3 py-1 text-xs font-bold text-[var(--blue)]">{t("page.featured")}</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-[var(--navy)]">{featured.title}</h2>
                <p className="mt-4 leading-7 text-[var(--text-secondary)]">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-5 text-sm text-[var(--text-secondary)]">
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} className="text-[var(--blue)]" /> {featured.category}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-[var(--blue)]" /> {common("units.minuteRead", { minutes: featured.readMinutes })}
                  </span>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--blue)]">
                  {common("actions.readArticle")} <ArrowRight className="transition-transform group-hover:translate-x-1" size={17} />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-white py-6">
          <div className="container-shell grid gap-4 md:grid-cols-3">
            {trustNotes.map((note, index) => {
              const Icon = trustIcons[index];
              return (
                <div key={note.title} className="flex gap-3">
                  <Icon className="text-[var(--blue)]" size={24} />
                  <div>
                    <p className="font-bold text-[var(--navy)]">{note.title}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{note.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="all-posts" className="section-space bg-[var(--background)]">
          <div className="container-shell">
            <SectionHeader title={t("page.guides.title")} text={t("page.guides.text")} action={{ label: t("page.guides.action"), href: "/app/cases/new" }} />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {secondaryPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("page.readingPath.eyebrow")}</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--navy)] md:text-[42px]">{t("page.readingPath.title")}</h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">{t("page.readingPath.text")}</p>
            </div>
            <div className="space-y-4">
              {posts.slice(0, 5).map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-5 rounded-[14px] border border-[var(--border)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[rgba(20,111,193,0.42)]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--pale-blue)] text-sm font-bold text-[var(--blue)]">{index + 1}</span>
                  <span>
                    <strong className="block text-lg text-[var(--navy)]">{post.title}</strong>
                    <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">{post.excerpt}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[var(--blue)]">
                      {common("actions.continueReading")} <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-16">
          <div className="container-shell rounded-[14px] border border-[var(--border)] bg-gradient-to-r from-[#f8fbfe] to-[#eef6fc] p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("page.next.eyebrow")}</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-[var(--navy)]">{t("page.next.title")}</h2>
              </div>
              <Link href="/app/cases/new" className="btn-primary arrow-nudge shrink-0">
                {common("actions.getSecondOpinion")} <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  const common = useTranslationsForArticleCard();
  return (
    <Link href={`/blog/${post.slug}`} className="group surface-card block overflow-hidden rounded-[14px] bg-white transition-all hover:-translate-y-0.5 hover:border-[rgba(20,111,193,0.42)] hover:shadow-[var(--shadow-soft)]">
      <Image src={post.hero} alt="" width={640} height={360} className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-[1.025]" />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-bold text-[var(--text-secondary)]">
          <span className="rounded-full bg-[var(--pale-blue)] px-3 py-1 text-[var(--blue)]">{post.category}</span>
          <span>{common.minuteRead(post.readMinutes)}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold leading-tight text-[var(--navy)]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[var(--blue)]">
          {common.read()} <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
        </span>
      </div>
    </Link>
  );
}

function useTranslationsForArticleCard() {
  const common = useTranslations("common");
  return {
    minuteRead: (minutes: number) => common("units.minuteRead", { minutes }),
    read: () => common("actions.read"),
  };
}
