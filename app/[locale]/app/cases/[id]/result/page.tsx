import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Download, MessageSquareText } from "lucide-react";
import { ReportPreview } from "@/components/interactive";
import { cases, demoCase } from "@/data/cases";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => cases.map((item) => ({ locale, id: item.id })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.metadata" });
  return { title: t("result") };
}

export default async function ResultPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  if (!cases.some((item) => item.id === id)) notFound();
  const t = await getTranslations("report.result");
  const casesT = await getTranslations("cases.demoCase");
  const common = await getTranslations("common");

  return (
    <div className="mx-auto max-w-6xl">
      <section className="surface-card rounded-[14px] p-7">
        <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
        <h1 className="mt-2 text-3xl font-bold text-[var(--navy)] md:text-[42px]">{t("title")}</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--text-secondary)]">{t("text")}</p>
      </section>
      <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="space-y-6">
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="text-xl font-bold text-[var(--navy)]">{t("summary")}</h2>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <p><strong className="text-[var(--navy)]">{common("labels.expert")}:</strong> {casesT("specialist")}</p>
              <p><strong className="text-[var(--navy)]">{common("labels.study")}:</strong> {casesT("study")} - {casesT("studyDate")}</p>
              <p><strong className="text-[var(--navy)]">{common("labels.status")}:</strong> {common("statuses.completed")}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="#report" className="btn-primary">{t("viewOpinion")}</Link>
              <Link href="#pdf-info" className="btn-secondary"><Download size={17} /> {t("pdfInfo")}</Link>
            </div>
          </div>
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--navy)]"><MessageSquareText className="text-[var(--blue)]" size={22} /> {t("answerTitle")}</h2>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">{t("answerText")}</p>
          </div>
        </aside>
        <div id="report">
          <ReportPreview />
          <p id="pdf-info" className="mt-4 rounded-[10px] bg-[var(--pale-blue)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
            {t("pdfText")}
          </p>
        </div>
      </section>
    </div>
  );
}
