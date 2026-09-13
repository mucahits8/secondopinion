import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CalendarDays, FileText, Image as ImageIcon, UserRound, type LucideIcon } from "lucide-react";
import { CaseJourneyTimeline, DocumentList } from "@/components/interactive";
import { demoCase } from "@/data/cases";
import { Link } from "@/i18n/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "patient.dashboard.metadata" });
  return { title: t("title") };
}

export default async function PatientDashboardPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("patient.dashboard");
  const casesT = await getTranslations("cases.demoCase");
  const common = await getTranslations("common");
  const documents = casesT.raw("documents") as string[];
  const facts: Array<[LucideIcon, string, string]> = [
    [CalendarDays, t("facts.expected"), casesT("expectedResult")],
    [UserRound, t("facts.expert"), casesT("specialist")],
    [ImageIcon, t("facts.reviewed"), casesT("study")],
    [FileText, t("facts.documents"), common("units.document", { count: documents.length })],
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-[14px] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-soft)]">
        <p className="text-sm font-bold text-[var(--blue)]">{t("greeting", { name: common("demo.patientFirstName") })}</p>
        <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--navy)] md:text-[42px]">{t("title")}</h1>
            <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">{t("text")}</p>
          </div>
          <Link href="/app/cases/new" className="btn-primary arrow-nudge shrink-0">
            {common("actions.newApplication")} <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="surface-card rounded-[14px] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
              <h2 className="mt-1 text-2xl font-bold text-[var(--navy)]">{casesT("study")}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{casesT("specialist")}</p>
            </div>
            <span className="rounded-full bg-[var(--pale-blue)] px-4 py-2 text-sm font-bold text-[var(--blue)]">{common("statuses.underReview")}</span>
          </div>
          <div className="mt-6">
            <CaseJourneyTimeline compact />
          </div>
          <Link href="/app/cases/SO-2026-00184" className="btn-secondary arrow-nudge mt-6">
            {common("actions.viewCase")} <ArrowRight size={17} />
          </Link>
        </article>
        <aside className="space-y-4">
          {facts.map(([Icon, title, value]) => (
            <div key={title} className="surface-card flex items-center gap-4 rounded-[14px] p-5">
              <Icon className="text-[var(--blue)]" size={24} />
              <div>
                <p className="text-sm text-[var(--text-secondary)]">{title}</p>
                <p className="font-bold text-[var(--navy)]">{value}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="surface-card rounded-[14px] p-6">
          <h2 className="text-xl font-bold text-[var(--navy)]">{t("patientQuestion")}</h2>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">{casesT("patientQuestion")}</p>
        </article>
        <article className="surface-card rounded-[14px] p-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--navy)]">{common("labels.documents")}</h2>
          <DocumentList documents={documents} />
        </article>
      </section>
    </div>
  );
}
