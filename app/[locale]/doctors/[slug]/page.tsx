import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Languages } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { doctorAssets, doctorSlugs, type DoctorSlug, type LocalizedDoctor } from "@/data/doctors";

type PageProps = { params: Promise<{ locale: string; slug: DoctorSlug }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => doctorSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "doctors" });
  const doctor = getDoctor(slug, t.raw(`items.${slug}`) as Omit<LocalizedDoctor, "slug" | "image">);
  return {
    title: doctor ? `${doctor.title} ${doctor.name}` : t("profile.fallbackTitle"),
  };
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("doctors");
  const common = await getTranslations("common");
  const doctor = getDoctor(slug, t.raw(`items.${slug}`) as Omit<LocalizedDoctor, "slug" | "image">);
  if (!doctor) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white py-16">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.86fr_0.48fr] lg:items-start">
            <div className="surface-card overflow-hidden rounded-[14px]">
              <Image src={doctor.image} alt={`${doctor.title} ${doctor.name}`} width={900} height={560} className="h-[420px] w-full object-cover" priority />
              <div className="p-8">
                <p className="text-sm font-bold text-[var(--blue)]">{doctor.specialty}</p>
                <h1 className="mt-2 text-4xl font-bold text-[var(--navy)] md:text-[52px]">
                  {doctor.title} {doctor.name}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{doctor.intro}</p>
              </div>
            </div>
            <aside className="sticky top-28 surface-card rounded-[14px] p-6 shadow-[var(--shadow-soft)]">
              <h2 className="text-2xl font-bold text-[var(--navy)]">{common("brand.name")}</h2>
              <div className="mt-5 space-y-4 text-sm">
                <p className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Clock size={18} className="text-[var(--blue)]" /> {common("labels.estimatedReview")}: {doctor.reviewTime}
                </p>
                <p className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Languages size={18} className="text-[var(--blue)]" /> {doctor.languages.join(", ")}
                </p>
              </div>
              <Link href="/app/cases/new" className="btn-primary arrow-nudge mt-7 w-full">
                {t("profile.cta")} <ArrowRight size={17} />
              </Link>
            </aside>
          </div>
        </section>
        <section className="section-space">
          <div className="container-shell grid gap-6 md:grid-cols-3">
            {[
              [t("profile.cards.expertise"), [doctor.subspecialty, ...doctor.interests]],
              [t("profile.cards.education"), doctor.education],
              [t("profile.cards.modalities"), doctor.modalities],
            ].map(([title, items]) => (
              <article key={title as string} className="surface-card rounded-[14px] p-6">
                <h2 className="text-xl font-bold text-[var(--navy)]">{title as string}</h2>
                <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                  {(items as string[]).map((item) => (
                    <li key={item} className="border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function getDoctor(slug: DoctorSlug, content: Omit<LocalizedDoctor, "slug" | "image">): LocalizedDoctor | null {
  const asset = doctorAssets[slug];
  if (!asset) return null;
  return { slug, image: asset.image, ...content };
}
