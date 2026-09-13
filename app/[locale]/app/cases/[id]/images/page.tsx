import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { UploadDropzone } from "@/components/interactive";
import { cases, demoCase } from "@/data/cases";
import { routing } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => cases.map((item) => ({ locale, id: item.id })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.metadata" });
  return { title: t("images") };
}

export default async function CaseImagesPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  if (!cases.some((item) => item.id === id)) notFound();
  const t = await getTranslations("cases");
  const common = await getTranslations("common");

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7">
        <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
        <h1 className="mt-2 text-3xl font-bold text-[var(--navy)]">{t("images.title")}</h1>
      </div>
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <UploadDropzone />
        <div className="surface-card overflow-hidden rounded-[14px]">
          <Image src="/hero/dicom-brain-demo.webp" alt={t("images.viewerAlt")} width={900} height={420} className="h-72 w-full object-cover object-left" priority />
          <div className="p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--success)]"><CheckCircle2 size={18} /> {common("statuses.readyForExpert")}</p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--navy)]">{t("demoCase.study")}</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{t("demoCase.studyDate")}</p>
            <div className="mt-5 grid grid-cols-4 gap-3">
              {[
                [demoCase.imaging.studies, t("images.metrics.study")],
                [demoCase.imaging.series, t("images.metrics.series")],
                [demoCase.imaging.images, t("images.metrics.images")],
                [demoCase.imaging.size, t("images.metrics.size")],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[10px] bg-[var(--pale-blue)] p-3 text-center">
                  <strong className="block text-lg text-[var(--navy)]">{value}</strong>
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
