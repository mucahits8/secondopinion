import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { CaseJourneyTimeline } from "@/components/interactive";
import { demoCase } from "@/data/cases";
import { Link } from "@/i18n/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.metadata" });
  return { title: t("cases") };
}

export default async function CasesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cases");
  const common = await getTranslations("common");

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold text-[var(--blue)]">{t("list.eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--navy)]">{t("list.title")}</h1>
        </div>
        <Link href="/app/cases/new" className="btn-primary arrow-nudge">
          {common("actions.newApplication")} <ArrowRight size={17} />
        </Link>
      </div>
      <article className="surface-card rounded-[14px] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
            <h2 className="text-2xl font-bold text-[var(--navy)]">{t("demoCase.study")}</h2>
            <p className="text-sm text-[var(--text-secondary)]">{t("demoCase.studyDate")} - {t("demoCase.specialist")}</p>
          </div>
          <Link href="/app/cases/SO-2026-00184" className="btn-secondary arrow-nudge">
            {common("actions.details")} <ArrowRight size={17} />
          </Link>
        </div>
        <div className="mt-6">
          <CaseJourneyTimeline compact />
        </div>
      </article>
    </div>
  );
}
