"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileQuestion, Image as ImageIcon, Stethoscope, UploadCloud, UserRound, type LucideIcon } from "lucide-react";

const progress = ["Hizmet", "Klinik Bilgi", "Görüntüler", "Belgeler", "Uzman", "Onay"];

const modalityOptions = [
  ["MR / MRI", "Manyetik rezonans görüntüleme"],
  ["BT / CT", "Bilgisayarlı tomografi"],
  ["PET/CT", "Onkolojik takip ve metabolik görüntüleme"],
  ["Mamografi", "Meme görüntüleme"],
  ["Röntgen", "Direkt grafi"],
  ["Diğer", "Emin değilseniz bu seçeneği kullanın"],
];

const regionOptions = ["Beyin", "Omurga", "Göğüs", "Abdomen", "Meme", "Kas-iskelet"];

const notes: Array<[LucideIcon, string, string]> = [
  [UserRound, "Kimin için?", "Kendim, çocuğum veya yakınım"],
  [FileQuestion, "Uzmanın sorusu", "Yanıtlanmasını istediğiniz konu"],
  [Stethoscope, "Uzman seçimi", "Kendiniz seçin veya bize bırakın"],
  [UploadCloud, "DICOM", "Görüntüler sistem tarafından doğrulanır"],
];

export function NewCaseWizard() {
  const [step, setStep] = useState(0);
  const [modality, setModality] = useState("MR / MRI");
  const [region, setRegion] = useState("Beyin");

  return (
    <div className="mx-auto max-w-6xl">
      <div className="surface-card rounded-[14px] p-5">
        <div className="grid gap-3 md:grid-cols-6">
          {progress.map((item, index) => (
            <button
              key={item}
              className="focus-ring flex items-center gap-2 text-left"
              onClick={() => setStep(index)}
              aria-current={step === index ? "step" : undefined}
            >
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${index <= step ? "bg-[var(--blue)] text-white" : "bg-[var(--pale-blue)] text-[var(--blue)]"}`}>
                {index < step ? <Check size={15} /> : index + 1}
              </span>
              <span className="text-sm font-semibold text-[var(--navy)]">{item}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.7fr_0.3fr]">
        <div className="surface-card rounded-[14px] p-8">
          <p className="text-sm font-bold text-[var(--blue)]">Yeni vaka</p>
          {step === 0 && (
            <WizardPanel title="Hangi görüntüleme için ikinci görüş almak istiyorsunuz?" text="Bir görüntüleme türü seçin. Sistem DICOM yüklendikten sonra teknik bilgiyi ayrıca doğrulayacak şekilde tasarlanır.">
              <div className="grid gap-4 sm:grid-cols-2">
                {modalityOptions.map(([title, text]) => (
                  <button
                    key={title}
                    className={`focus-ring rounded-[12px] border p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--blue)] ${modality === title ? "border-[var(--blue)] bg-[var(--pale-blue)]" : "border-[var(--border)] bg-white"}`}
                    onClick={() => setModality(title)}
                    aria-pressed={modality === title}
                  >
                    <ImageIcon className="mb-4 text-[var(--blue)]" size={26} />
                    <span className="block text-lg font-bold text-[var(--navy)]">{title}</span>
                    <span className="mt-1 block text-sm text-[var(--text-secondary)]">{text}</span>
                  </button>
                ))}
              </div>
            </WizardPanel>
          )}
          {step === 1 && (
            <WizardPanel title="Uzmanın özellikle yanıtlamasını istediğiniz konu nedir?" text="Uzun hastane formu yerine, klinik bağlamı adım adım alıyoruz.">
              <textarea className="min-h-36 w-full rounded-[12px] border border-[var(--border)] p-4 outline-none" placeholder="Örneğin: İlk raporda tarif edilen bulgunun önceki görüntülemeye göre değişip değişmediğini öğrenmek istiyorum." />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {regionOptions.map((item) => (
                  <button key={item} className={`focus-ring rounded-[10px] border px-4 py-3 text-left font-semibold ${region === item ? "border-[var(--blue)] bg-[var(--pale-blue)] text-[var(--blue)]" : "border-[var(--border)] text-[var(--navy)]"}`} onClick={() => setRegion(item)} aria-pressed={region === item}>
                    {item}
                  </button>
                ))}
              </div>
            </WizardPanel>
          )}
          {step === 2 && (
            <WizardPanel title="Tıbbi görüntülerinizi yükleyin." text="CD, USB veya bilgisayarınızdaki DICOM dosyalarını seçebilirsiniz. ZIP yükleme de desteklenecek şekilde tasarlanır.">
              <label className="block cursor-pointer rounded-[14px] border border-dashed border-[rgba(20,111,193,0.45)] bg-[#fbfdff] p-8 text-center">
                <UploadCloud className="mx-auto text-[var(--blue)]" size={40} />
                <span className="mt-3 block font-bold text-[var(--navy)]">Dosyaları Seç</span>
                <span className="mt-1 block text-sm text-[var(--text-secondary)]">Demo yükleme alanı</span>
                <input type="file" multiple className="sr-only" />
              </label>
            </WizardPanel>
          )}
          {step === 3 && (
            <WizardPanel title="Ek belgeleri ekleyin." text="Radyoloji raporu, epikriz, patoloji veya laboratuvar sonucu gibi dosyaları kategoriyle ilişkilendirin.">
              <div className="grid gap-3 sm:grid-cols-2">
                {["Radyoloji raporu", "Epikriz", "Patoloji", "Laboratuvar", "Operasyon raporu", "Diğer"].map((item) => (
                  <label key={item} className="rounded-[10px] border border-[var(--border)] bg-white p-4">
                    <span className="font-semibold text-[var(--navy)]">{item}</span>
                    <input type="file" className="mt-3 block w-full text-sm text-[var(--text-secondary)]" />
                  </label>
                ))}
              </div>
            </WizardPanel>
          )}
          {step === 4 && (
            <WizardPanel title="Uzman seçimini nasıl yapmak istersiniz?" text="MVP'de otomatik eşleştirme yoktur; seçim platform operasyonu tarafından manuel yönetilebilir.">
              <div className="grid gap-4 sm:grid-cols-2">
                {["Uzmanı kendim seçmek istiyorum", "Benim için en uygun uzmanı seçin"].map((item, index) => (
                  <button key={item} className={`focus-ring rounded-[12px] border p-5 text-left ${index === 1 ? "border-[var(--blue)] bg-[var(--pale-blue)]" : "border-[var(--border)] bg-white"}`}>
                    <span className="block text-lg font-bold text-[var(--navy)]">{item}</span>
                    <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">{index === 1 ? "Operasyon ekibi görüntüleme alanına göre yönlendirme yapar." : "Doktor profillerini inceleyerek ilerleyin."}</span>
                  </button>
                ))}
              </div>
            </WizardPanel>
          )}
          {step === 5 && (
            <WizardPanel title="Başvuru özeti" text="Göndermeden önce vaka özetinizi kontrol edin. Ödeme ve gerçek submit entegrasyonu bu prototipte yoktur.">
              <div className="grid gap-3 text-sm">
                <SummaryRow label="Görüntüleme" value={modality} />
                <SummaryRow label="Bölge" value={region} />
                <SummaryRow label="Uzman seçimi" value="Second Opinion uygun uzmanı seçsin" />
                <SummaryRow label="Durum" value="Taslak başvuru" />
              </div>
            </WizardPanel>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button className="btn-secondary disabled:cursor-not-allowed disabled:opacity-45" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
              <ArrowLeft size={17} /> Geri
            </button>
            {step < progress.length - 1 ? (
              <button className="btn-primary arrow-nudge" onClick={() => setStep((value) => Math.min(progress.length - 1, value + 1))}>
                Devam Et <ArrowRight size={17} />
              </button>
            ) : (
              <Link href="/app/cases/SO-2026-00184/images" className="btn-primary arrow-nudge">
                Taslağı Tamamla <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </div>
        <aside className="space-y-4">
          {notes.map(([Icon, title, text]) => (
            <div key={title} className="surface-card rounded-[12px] p-5">
              <Icon className="text-[var(--blue)]" size={24} />
              <h2 className="mt-3 font-bold text-[var(--navy)]">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

function WizardPanel({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className="mt-2 text-3xl font-bold text-[var(--navy)] md:text-[42px]">{title}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-[var(--text-secondary)]">{text}</p>
      <div className="mt-8">{children}</div>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-[var(--background)] p-4">
      <span className="font-semibold text-[var(--text-secondary)]">{label}</span>
      <span className="font-bold text-[var(--navy)]">{value}</span>
    </div>
  );
}
