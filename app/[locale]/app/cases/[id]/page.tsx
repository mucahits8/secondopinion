import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MessageSquareText, UserRound } from "lucide-react";
import { CaseJourneyTimeline, DocumentList } from "@/components/interactive";
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
  return { title: t("detail") };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  if (!cases.some((item) => item.id === id)) notFound();
  const t = await getTranslations("cases");
  const common = await getTranslations("common");
  const documents = t.raw("demoCase.documents") as string[];
  const clinicalCards = t.raw("demoCase.clinicalCards") as Array<{ title: string; text: string }>;

  return (
    <div className="mx-auto max-w-6xl">
      <section className="surface-card rounded-[14px] p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--navy)] md:text-[42px]">{t("demoCase.study")}</h1>
            <p className="mt-2 text-[var(--text-secondary)]">{t("demoCase.studyDate")} - {t("demoCase.patientSummary")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/app/cases/SO-2026-00184/images" className="btn-secondary">{t("detail.imagesCta")}</Link>
            <Link href="/app/cases/SO-2026-00184/result" className="btn-primary arrow-nudge">
              {t("detail.reportCta")} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="mt-7">
          <CaseJourneyTimeline compact />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="surface-card rounded-[14px] p-6">
          <h2 className="text-xl font-bold text-[var(--navy)]">{t("detail.clinicalInfo")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {clinicalCards.map((item) => (
              <div key={item.title} className="rounded-[10px] bg-[var(--background)] p-4">
                <p className="text-sm font-bold text-[var(--navy)]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.text}</p>
              </div>
            ))}
          </div>
        </article>
        <aside className="space-y-6">
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="text-xl font-bold text-[var(--navy)]">{t("detail.summary")}</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-center gap-2 text-[var(--text-secondary)]"><UserRound size={17} className="text-[var(--blue)]" /> {t("demoCase.specialist")}</p>
              <p className="flex items-center gap-2 text-[var(--text-secondary)]"><CalendarDays size={17} className="text-[var(--blue)]" /> {t("detail.expectedResult", { value: t("demoCase.expectedResult") })}</p>
              <p className="flex items-center gap-2 text-[var(--text-secondary)]"><MessageSquareText size={17} className="text-[var(--blue)]" /> {t("detail.extraInfo")}</p>
            </div>
          </div>
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--navy)]">{common("labels.documents")}</h2>
            <DocumentList documents={documents} />
          </div>
        </aside>
      </section>
    </div>
  );
}
