import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MessageSquareText, UserRound } from "lucide-react";
import { CaseJourneyTimeline, DocumentList } from "@/components/interactive";
import { cases, demoCase } from "@/data/cases";

export const metadata = {
  title: "Vaka Detayi",
};

export function generateStaticParams() {
  return cases.map((item) => ({ id: item.id }));
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!cases.some((item) => item.id === id)) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <section className="surface-card rounded-[14px] p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--navy)] md:text-[42px]">{demoCase.study}</h1>
            <p className="mt-2 text-[var(--text-secondary)]">{demoCase.studyDate} - {demoCase.patientSummary}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/app/cases/SO-2026-00184/images" className="btn-secondary">Görüntüleri Gör</Link>
            <Link href="/app/cases/SO-2026-00184/result" className="btn-primary arrow-nudge">
              Rapor Önizleme <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="mt-7">
          <CaseJourneyTimeline compact />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="surface-card rounded-[14px] p-6">
          <h2 className="text-xl font-bold text-[var(--navy)]">Klinik bilgi</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Ana şikayet", "Baş ağrısı ve takip görüntülemesi"],
              ["Bilinen tanı", "Demo bilgi"],
              ["Mevcut tedavi", "Demo bilgi"],
              ["Hasta sorusu", demoCase.patientQuestion],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[10px] bg-[var(--background)] p-4">
                <p className="text-sm font-bold text-[var(--navy)]">{title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
              </div>
            ))}
          </div>
        </article>
        <aside className="space-y-6">
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="text-xl font-bold text-[var(--navy)]">Vaka özeti</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-center gap-2 text-[var(--text-secondary)]"><UserRound size={17} className="text-[var(--blue)]" /> {demoCase.specialist}</p>
              <p className="flex items-center gap-2 text-[var(--text-secondary)]"><CalendarDays size={17} className="text-[var(--blue)]" /> Tahmini sonuç: {demoCase.expectedResult}</p>
              <p className="flex items-center gap-2 text-[var(--text-secondary)]"><MessageSquareText size={17} className="text-[var(--blue)]" /> Ek bilgi gerekirse buradan bildirilir.</p>
            </div>
          </div>
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--navy)]">Belgeler</h2>
            <DocumentList documents={demoCase.documents} />
          </div>
        </aside>
      </section>
    </div>
  );
}
