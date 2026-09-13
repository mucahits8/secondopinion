import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, Image as ImageIcon, UserRound, type LucideIcon } from "lucide-react";
import { CaseJourneyTimeline, DocumentList } from "@/components/interactive";
import { demoCase } from "@/data/cases";

export const metadata = {
  title: "Hasta Paneli",
};

export default function PatientDashboardPage() {
  const facts: Array<[LucideIcon, string, string]> = [
    [CalendarDays, "Tahmini sonuç", demoCase.expectedResult],
    [UserRound, "Uzman", demoCase.specialist],
    [ImageIcon, "İncelenen", demoCase.study],
    [FileText, "Belgeler", `${demoCase.documents.length} belge`],
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-[14px] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-soft)]">
        <p className="text-sm font-bold text-[var(--blue)]">İyi günler, {demoCase.patientName}.</p>
        <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--navy)] md:text-[42px]">Aktif başvurunuz uzmanınız tarafından değerlendiriliyor.</h1>
            <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">Sonraki adım rapor hazırlığı. Herhangi bir ek bilgi gerekirse bu ekrandan bildirim alırsınız.</p>
          </div>
          <Link href="/app/cases/new" className="btn-primary arrow-nudge shrink-0">
            Yeni Başvuru <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="surface-card rounded-[14px] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
              <h2 className="mt-1 text-2xl font-bold text-[var(--navy)]">{demoCase.study}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{demoCase.specialist}</p>
            </div>
            <span className="rounded-full bg-[var(--pale-blue)] px-4 py-2 text-sm font-bold text-[var(--blue)]">{demoCase.status}</span>
          </div>
          <div className="mt-6">
            <CaseJourneyTimeline compact />
          </div>
          <Link href="/app/cases/SO-2026-00184" className="btn-secondary arrow-nudge mt-6">
            Vakayı Gor <ArrowRight size={17} />
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
          <h2 className="text-xl font-bold text-[var(--navy)]">Hastanın sorusu</h2>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">{demoCase.patientQuestion}</p>
        </article>
        <article className="surface-card rounded-[14px] p-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--navy)]">Belgeler</h2>
          <DocumentList documents={demoCase.documents} />
        </article>
      </section>
    </div>
  );
}
