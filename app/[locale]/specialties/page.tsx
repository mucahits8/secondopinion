import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { SectionHeader, SpecialtyCard } from "@/components/cards";
import { specialtyAssets, specialtyKeys } from "@/data/specialties";

type PageProps = { params: Promise<{ locale: string }> };
type SpecialtyContent = { title: string; description: string };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "specialties.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function SpecialtiesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("specialties");
  const specialtiesT = await getTranslations("specialties.items");
  const specialties = specialtyKeys.map((key) => ({
    key,
    ...(specialtiesT.raw(key) as SpecialtyContent),
    ...specialtyAssets[key],
  }));

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-shell py-20">
          <SectionHeader eyebrow={t("page.eyebrow")} title={t("page.title")} text={t("page.text")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.key} title={specialty.title} description={specialty.description} icon={specialty.icon} image={specialty.image} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
