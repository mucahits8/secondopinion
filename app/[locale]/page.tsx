import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ClipboardCheck, FileText, ShieldCheck, UploadCloud, UserRound, UsersRound, type LucideIcon } from "lucide-react";
import { SiteHeader, Footer } from "@/components/site-chrome";
import { DoctorCard, LinkedTrustItem, SectionHeader, SpecialtyCard } from "@/components/cards";
import { CaseJourneyTimeline, DicomUploadDemo, FAQAccordion, ReportPreview, SecurityFeature } from "@/components/interactive";
import { HeroMedicalWorkspace } from "@/components/hero-medical-workspace";
import { doctorAssets, doctorSlugs, type LocalizedDoctor } from "@/data/doctors";
import { specialtyAssets, specialtyKeys } from "@/data/specialties";
import { Link } from "@/i18n/navigation";

type PageProps = { params: Promise<{ locale: string }> };
type LinkItem = { label?: string; title?: string; text?: string; href: string };
type SpecialtyContent = { title: string; description: string };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const common = await getTranslations("common.actions");
  const doctorsT = await getTranslations("doctors.items");
  const specialtiesT = await getTranslations("specialties.items");
  const trustIcons = [UsersRound, ShieldCheck, FileText];
  const stepIcons: LucideIcon[] = [UploadCloud, UserRound, ClipboardCheck, FileText];
  const finalIcons: LucideIcon[] = [UploadCloud, FileText, ShieldCheck];
  const heroTrustItems = t.raw("hero.trustItems") as Array<LinkItem>;
  const quickLinks = t.raw("quickLinks") as Array<LinkItem>;
  const steps = t.raw("how.steps") as Array<LinkItem>;
  const whyItems = t.raw("why.items") as Array<LinkItem>;
  const securityItems = t.raw("security.items") as Array<{ title: string; text: string }>;
  const finalItems = t.raw("finalCta.items") as Array<LinkItem>;
  const doctors = doctorSlugs.slice(0, 3).map((slug) => ({
    slug,
    image: doctorAssets[slug].image,
    ...(doctorsT.raw(slug) as Omit<LocalizedDoctor, "slug" | "image">),
  }));
  const specialties = specialtyKeys.slice(0, 6).map((key) => ({
    key,
    ...(specialtiesT.raw(key) as SpecialtyContent),
    ...specialtyAssets[key],
  }));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 medical-glow opacity-80" />
          <div className="container-shell relative grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
            <div className="reveal">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--blue)]">{t("hero.eyebrow")}</p>
              <h1 className="mt-6 max-w-[620px] text-[42px] font-bold leading-[1.08] tracking-normal text-[var(--navy)] md:text-[62px]">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-[590px] text-lg leading-8 text-[var(--text-secondary)]">
                {t("hero.description")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/app/cases/new" className="btn-primary arrow-nudge">
                  {common("getSecondOpinion")} <ArrowRight size={17} />
                </Link>
                <Link href="/how-it-works" className="btn-secondary">
                  {common("howItWorks")}
                </Link>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {heroTrustItems.map((item, index) => (
                  <LinkedTrustItem key={item.href} icon={trustIcons[index]} title={item.title ?? ""} text={item.text ?? ""} href={item.href} />
                ))}
              </div>
            </div>
            <HeroMedicalWorkspace />
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-white py-6">
          <div className="container-shell grid gap-4 md:grid-cols-4">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-[10px] p-2 text-sm font-bold text-[var(--navy)] transition-colors hover:bg-[var(--pale-blue)] hover:text-[var(--blue)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--blue)]" />
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell">
            <SectionHeader title={t("how.title")} text={t("how.text")} action={{ label: t("how.action"), href: "/how-it-works" }} />
            <div className="grid gap-5 md:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <Link key={step.href} href={step.href} className="surface-card group block rounded-[12px] p-6 transition-all hover:-translate-y-0.5 hover:border-[rgba(20,111,193,0.42)]">
                    <Icon className="mb-7 rounded-full bg-[var(--pale-blue)] p-3 text-[var(--blue)]" size={58} strokeWidth={1.6} />
                    <h3 className="text-lg font-bold text-[var(--navy)]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{step.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[var(--blue)]">
                      {common("inspect")} <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-space bg-[var(--background)]">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("why.eyebrow")}</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--navy)] md:text-[42px]">{t("why.title")}</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{t("why.text")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {whyItems.map((item) => (
                <Link key={item.href} href={item.href} className="surface-card group block rounded-[12px] p-6 transition-all hover:-translate-y-0.5 hover:border-[rgba(20,111,193,0.42)]">
                  <h3 className="font-bold text-[var(--navy)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--blue)]">
                    {common("details")} <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell">
            <SectionHeader title={t("experts.title")} text={t("experts.text")} action={{ label: t("experts.action"), href: "/doctors" }} />
            <div className="grid gap-5 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.slug} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-20">
          <div className="container-shell">
            <SectionHeader title={t("specialties.title")} text={t("specialties.text")} action={{ label: t("specialties.action"), href: "/specialties" }} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {specialties.map((specialty) => (
                <SpecialtyCard key={specialty.key} title={specialty.title} description={specialty.description} icon={specialty.icon} image={specialty.image} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-[#f2f7fb]">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeader eyebrow={t("upload.eyebrow")} title={t("upload.title")} text={t("upload.text")} />
              <Image src="/illustrations/radiology-workspace.webp" alt={t("upload.imageAlt")} width={620} height={420} className="rounded-[14px] border border-[var(--border)] shadow-[var(--shadow-soft)]" />
            </div>
            <DicomUploadDemo />
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell">
            <SectionHeader eyebrow={t("journey.eyebrow")} title={t("journey.title")} text={t("journey.text")} />
            <CaseJourneyTimeline />
          </div>
        </section>

        <section className="section-space bg-[var(--background)]">
          <div className="container-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <ReportPreview />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("report.eyebrow")}</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--navy)] md:text-[40px]">{t("report.title")}</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{t("report.text")}</p>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell rounded-[14px] bg-[var(--pale-blue)] p-8 md:p-10">
            <SectionHeader title={t("security.title")} text={t("security.text")} />
            <div className="grid gap-6 md:grid-cols-4">
              {securityItems.map((item) => (
                <SecurityFeature key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-space bg-white">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("value.eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--navy)] md:text-[52px]">{t("value.title")}</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{t("value.text")}</p>
            </div>
            <FAQAccordion />
          </div>
        </section>

        <section className="bg-white pb-16">
          <div className="container-shell grid gap-8 rounded-[14px] border border-[var(--border)] bg-gradient-to-r from-[#f8fbfe] to-[#eef6fc] p-8 md:p-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{t("finalCta.eyebrow")}</p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-[var(--navy)] md:text-[40px]">{t("finalCta.title")}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--text-secondary)]">{t("finalCta.text")}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/app/cases/new" className="btn-primary arrow-nudge">
                  {common("getSecondOpinion")} <ArrowRight size={17} />
                </Link>
                <Link href="/doctors" className="btn-secondary">
                  {common("reviewExperts")}
                </Link>
              </div>
            </div>
            <div className="surface-card rounded-[14px] bg-white p-5">
              <div className="grid gap-3">
                {finalItems.map((item, index) => (
                  <LinkedTrustItem key={item.title} icon={finalIcons[index]} title={item.title ?? ""} text={item.text ?? ""} href={item.href} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
