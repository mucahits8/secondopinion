import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, ShieldCheck, UploadCloud, UserRound, type LucideIcon } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { CaseJourneyTimeline, DicomUploadDemo, ReportPreview } from "@/components/interactive";

export const metadata = {
  title: "Nasıl Çalışır",
};

export default function HowItWorksPage() {
  const steps: Array<[string, string, string, LucideIcon]> = [
    ["01", "Görüntülerinizi yükleyin", "CD, USB, ZIP veya bilgisayarınızdaki görüntüleme dosyalarını güvenle seçin.", UploadCloud],
    ["02", "Klinik bilgiyi ekleyin", "Uzmanın cevaplamasını istediğiniz asıl soruyu sade bir akışta paylaşın.", ClipboardCheck],
    ["03", "Uzman değerlendirsin", "Vakanız uygun uzman tarafından viewer ve belgelerle birlikte incelenir.", UserRound],
    ["04", "Raporunuzu alın", "Final raporu güvenli hesabınızdan görüntüleyin ve PDF olarak indirin.", FileText],
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white py-20">
          <div className="container-shell max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">Süreç</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--navy)] md:text-[56px]">
              Karmaşık tıbbi görüntü süreci, hasta için dört net adıma iner.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              Second Opinion hastanın önüne teknik terimler yığma yerine, başvuruyu tamamlaması için yalnızca gerekli kararları gösterir.
            </p>
          </div>
        </section>
        <section className="section-space">
          <div className="container-shell grid gap-5 md:grid-cols-2">
            {steps.map(([number, title, text, Icon]) => (
              <article key={title} className="surface-card rounded-[14px] p-7">
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--blue)]">{number}</span>
                  <Icon className="text-[var(--blue)]" size={30} strokeWidth={1.7} />
                </div>
                <h2 className="text-2xl font-bold text-[var(--navy)]">{title}</h2>
                <p className="mt-3 leading-7 text-[var(--text-secondary)]">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
            <DicomUploadDemo />
            <div>
              <h2 className="text-3xl font-bold text-[var(--navy)]">Yükleme tamamlandi demeden once sistem kontrol eder.</h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                Prototip, arka plandaki ingestion akışını hasta için anlaşılır durumlara indirger: yükleme, doğrulama, çalışma algılama ve uzman incelemesine hazır hale getirme.
              </p>
            </div>
          </div>
        </section>
        <section className="section-space">
          <div className="container-shell">
            <h2 className="mb-8 text-3xl font-bold text-[var(--navy)]">Başvurudan rapora kadar gorunur yolculuk</h2>
            <CaseJourneyTimeline />
          </div>
        </section>
        <section className="section-space bg-white">
          <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <ShieldCheck className="text-[var(--blue)]" size={36} />
              <h2 className="mt-5 text-3xl font-bold text-[var(--navy)]">Rapor güvenli hesapta teslim edilir.</h2>
              <p className="mt-4 leading-7 text-[var(--text-secondary)]">
                Final rapor hasta ile paylaşıldığında, deneyim kontrollü ve sakin kalır. E-posta eki yerine güvenli hesap erişimi temel alınır.
              </p>
              <Link href="/app/cases/new" className="btn-primary arrow-nudge mt-7">
                İkinci Görüş Al <ArrowRight size={17} />
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
