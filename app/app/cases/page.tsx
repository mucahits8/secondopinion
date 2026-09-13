import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseJourneyTimeline } from "@/components/interactive";
import { demoCase } from "@/data/cases";

export const metadata = {
  title: "Vakalarım",
};

export default function CasesPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold text-[var(--blue)]">Vakalarım</p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--navy)]">İkinci görüş başvurulariniz</h1>
        </div>
        <Link href="/app/cases/new" className="btn-primary arrow-nudge">
          Yeni Başvuru <ArrowRight size={17} />
        </Link>
      </div>
      <article className="surface-card rounded-[14px] p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
            <h2 className="text-2xl font-bold text-[var(--navy)]">{demoCase.study}</h2>
            <p className="text-sm text-[var(--text-secondary)]">{demoCase.studyDate} - {demoCase.specialist}</p>
          </div>
          <Link href="/app/cases/SO-2026-00184" className="btn-secondary arrow-nudge">
            Detay <ArrowRight size={17} />
          </Link>
        </div>
        <div className="mt-6">
          <CaseJourneyTimeline compact />
        </div>
      </article>
    </div>
  );
}
