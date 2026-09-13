import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { DoctorCard, SectionHeader } from "@/components/cards";
import { doctorAssets, doctorSlugs, type LocalizedDoctor } from "@/data/doctors";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "doctors.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function DoctorsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("doctors");
  const doctorsT = await getTranslations("doctors.items");
  const doctors = doctorSlugs.map((slug) => ({
    slug,
    image: doctorAssets[slug].image,
    ...(doctorsT.raw(slug) as Omit<LocalizedDoctor, "slug" | "image">),
  }));

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-shell py-20">
          <SectionHeader eyebrow={t("page.eyebrow")} title={t("page.title")} text={t("page.text")} />
          <div className="grid gap-5 md:grid-cols-2">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
