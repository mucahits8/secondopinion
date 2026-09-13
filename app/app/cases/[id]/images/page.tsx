import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { UploadDropzone } from "@/components/interactive";
import { cases, demoCase } from "@/data/cases";

export const metadata = {
  title: "Görüntüler",
};

export function generateStaticParams() {
  return cases.map((item) => ({ id: item.id }));
}

export default async function CaseImagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!cases.some((item) => item.id === id)) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7">
        <p className="text-sm font-bold text-[var(--blue)]">{demoCase.id}</p>
        <h1 className="mt-2 text-3xl font-bold text-[var(--navy)]">Tıbbi görüntüler</h1>
      </div>
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <UploadDropzone />
        <div className="surface-card overflow-hidden rounded-[14px]">
          <Image src="/hero/dicom-brain-demo.webp" alt="Anonim beyin MR demo viewer" width={900} height={420} className="h-72 w-full object-cover object-left" priority />
          <div className="p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--success)]"><CheckCircle2 size={18} /> Uzman değerlendirmesi için hazır</p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--navy)]">{demoCase.study}</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{demoCase.studyDate}</p>
            <div className="mt-5 grid grid-cols-4 gap-3">
              {[
                [demoCase.imaging.studies, "Study"],
                [demoCase.imaging.series, "Series"],
                [demoCase.imaging.images, "Images"],
                [demoCase.imaging.size, "Boyut"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[10px] bg-[var(--pale-blue)] p-3 text-center">
                  <strong className="block text-lg text-[var(--navy)]">{value}</strong>
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
