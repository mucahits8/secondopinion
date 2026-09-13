import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ClipboardCheck, FileText, ShieldCheck, UploadCloud, UserRound, type LucideIcon } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { CaseJourneyTimeline, DicomUploadDemo, ReportPreview } from "@/components/interactive";
import { Link } from "@/i18n/navigation";

type PageProps = { params: Promise<{ locale: string }> };
type Step = { title: string; text: string };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.processPage" });
  return { title: t("metadata") };
}

export default async function HowItWorksPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const common = await getTranslations("common.actions");
  const steps = t.raw("how.steps") as Step[];
  const icons: LucideIcon[] = [UploadCloud, ClipboardCheck, UserRound, FileText];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white py-20">
          <div className="container-shell max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("processPage.eyebrow")}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--navy)] md:text-[56px]">{t("processPage.title")}</h1>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{t("processPage.text")}</p>
          </div>
        </section>
        <section className="section-space">
          <div className="container-shell grid gap-5 md:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <article key={step.title} className="surface-card rounded-[14px] p-7">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--blue)]">{String(index + 1).padStart(2, "0")}</span>
                    <Icon className="text-[var(--blue)]" size={30} strokeWidth={1.7} />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--navy)]">{step.title}</h2>
                  <p className="mt-3 leading-7 text-[var(--text-secondary)]">{step.text}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
            <DicomUploadDemo />
            <div>
              <h2 className="text-3xl font-bold text-[var(--navy)]">{t("processPage.uploadTitle")}</h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">{t("processPage.uploadText")}</p>
            </div>
          </div>
        </section>
        <section className="section-space">
          <div className="container-shell">
            <h2 className="mb-8 text-3xl font-bold text-[var(--navy)]">{t("processPage.journeyTitle")}</h2>
            <CaseJourneyTimeline />
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <ShieldCheck className="text-[var(--blue)]" size={36} />
              <h2 className="mt-5 text-3xl font-bold text-[var(--navy)]">{t("processPage.deliveryTitle")}</h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">{t("processPage.deliveryText")}</p>
              <Link href="/app/cases/new" className="btn-primary arrow-nudge mt-7">
                {common("getSecondOpinion")} <ArrowRight size={17} />
              </Link>
            </div>
            <ReportPreview />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
