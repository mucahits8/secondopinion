import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, MessageSquareText } from "lucide-react";
import { ReportPreview } from "@/components/interactive";
import { cases, demoCase } from "@/data/cases";

export const metadata = {
  title: "Sonuç",
};

export function generateStaticParams() {
  return cases.map((item) => ({ id: item.id }));
}

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!cases.some((item) => item.id === id)) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <section className="surface-card rounded-[14px] p-7">
        <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
        <h1 className="mt-2 text-3xl font-bold text-[var(--navy)] md:text-[42px]">Second Opinion raporunuz hazır.</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--text-secondary)]">Bu ekran final teslim deneyimini gösterir. Prototipte gerçek tanı metni veya gerçek hasta verisi bulunmaz.</p>
      </section>
      <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="space-y-6">
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="text-xl font-bold text-[var(--navy)]">Sonuç özeti</h2>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <p><strong className="text-[var(--navy)]">Uzman:</strong> {demoCase.specialist}</p>
              <p><strong className="text-[var(--navy)]">Çalışma:</strong> {demoCase.study} - {demoCase.studyDate}</p>
              <p><strong className="text-[var(--navy)]">Durum:</strong> Completed</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="#report" className="btn-primary">Second Opinion&apos;i Gör</Link>
              <Link href="#pdf-info" className="btn-secondary"><Download size={17} /> PDF Bilgisi</Link>
            </div>
          </div>
          <div className="surface-card rounded-[14px] p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--navy)]"><MessageSquareText className="text-[var(--blue)]" size={22} /> Hastanın sorusuna yanıt</h2>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">Bu alanda doktorun hastanın özel sorusuna verdiği net yanıtın özeti yer alır. Prototipte tanı veya tedavi önerisi yazılmaz.</p>
          </div>
        </aside>
        <div id="report">
          <ReportPreview />
          <p id="pdf-info" className="mt-4 rounded-[10px] bg-[var(--pale-blue)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
            PDF indirme, gerçek rapor üretim servisi bağlandığında aktif edilecek. Bu prototipte buton rapor alanına yönlendirir ve teslim deneyimini gösterir.
          </p>
        </div>
      </section>
    </div>
  );
}
