"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileQuestion,
  Image as ImageIcon,
  Plus,
  Stethoscope,
  Trash2,
  UploadCloud,
  UserRound,
  type LucideIcon,
} from "lucide-react";

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
  [UserRound, "Kimin için?", "Zorunlu temsil/onay akışına temel olur"],
  [FileQuestion, "Klinik soru", "Uzmanın yanıtlaması gereken ana konu"],
  [Stethoscope, "Uzman seçimi", "Kendiniz seçin veya bize bırakın"],
  [UploadCloud, "DICOM", "Başvuru için en az bir görüntü gerekir"],
];

export function NewCaseWizard() {
  const [step, setStep] = useState(0);
  const [forWhom, setForWhom] = useState("Kendim");
  const [modality, setModality] = useState("MR / MRI");
  const [region, setRegion] = useState("Beyin");
  const [clinicalQuestion, setClinicalQuestion] = useState("");
  const [complaint, setComplaint] = useState("");
  const [extraNotes, setExtraNotes] = useState([""]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [documents, setDocuments] = useState([{ category: "Radyoloji raporu", file: "" }]);
  const [specialistChoice, setSpecialistChoice] = useState("Second Opinion uygun uzmanı seçsin");

  const stepIsValid = useMemo(() => {
    if (step === 0) return Boolean(forWhom && modality);
    if (step === 1) return clinicalQuestion.trim().length >= 12 && Boolean(region);
    if (step === 2) return imageFiles.length > 0;
    if (step === 3) return true;
    if (step === 4) return Boolean(specialistChoice);
    return true;
  }, [clinicalQuestion, forWhom, imageFiles.length, modality, region, specialistChoice, step]);

  const validationMessage = useMemo(() => {
    if (step === 1 && !stepIsValid) return "Uzmanın yanıtlamasını istediğiniz soruyu en az 12 karakterle yazın.";
    if (step === 2 && !stepIsValid) return "Başvuruyu tamamlamak için en az bir görüntüleme dosyası seçin.";
    return "Zorunlu alanlar tamamlanınca devam edebilirsiniz.";
  }, [step, stepIsValid]);

  function handleImages(event: ChangeEvent<HTMLInputElement>) {
    setImageFiles(Array.from(event.target.files ?? []).map((file) => file.name));
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="surface-card rounded-[14px] p-5">
        <div className="grid gap-3 md:grid-cols-6">
          {progress.map((item, index) => (
            <button
              key={item}
              className="focus-ring flex items-center gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setStep(index)}
              disabled={index > step && !stepIsValid}
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
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold text-[var(--blue)]">Yeni vaka</p>
            <RequirementBadge required={step !== 3} />
          </div>

          {step === 0 && (
            <WizardPanel title="Hangi görüntüleme için ikinci görüş almak istiyorsunuz?" text="Bir görüntüleme türü ve başvurunun kimin adına yapıldığını seçin. Sistem DICOM yüklendikten sonra teknik bilgiyi ayrıca doğrular.">
              <FieldLabel label="Kimin için?" required />
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {["Kendim", "Çocuğum", "Yakınım"].map((item) => (
                  <ChoiceButton key={item} active={forWhom === item} onClick={() => setForWhom(item)}>
                    {item}
                  </ChoiceButton>
                ))}
              </div>
              <FieldLabel label="Görüntüleme türü" required className="mt-7" />
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
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
            <WizardPanel title="Uzmanın özellikle yanıtlamasını istediğiniz konu nedir?" text="Asıl soru zorunlu. Diğer klinik bilgiler gerektiği kadar eklenebilir; hastaya uzun bir form hissi vermeyiz.">
              <FieldLabel label="Ana klinik soru" required />
              <textarea
                className="mt-2 min-h-36 w-full rounded-[12px] border border-[var(--border)] p-4 outline-none focus:border-[var(--blue)]"
                placeholder="Örneğin: İlk raporda tarif edilen bulgunun önceki görüntülemeye göre değişip değişmediğini öğrenmek istiyorum."
                value={clinicalQuestion}
                onChange={(event) => setClinicalQuestion(event.target.value)}
                required
                aria-required
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label>
                  <FieldLabel label="İncelenecek bölge" required />
                  <div className="mt-2 grid gap-2">
                    {regionOptions.map((item) => (
                      <ChoiceButton key={item} active={region === item} onClick={() => setRegion(item)}>
                        {item}
                      </ChoiceButton>
                    ))}
                  </div>
                </label>
                <label>
                  <FieldLabel label="Ana şikayet" />
                  <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]" value={complaint} onChange={(event) => setComplaint(event.target.value)} placeholder="Opsiyonel" />
                </label>
              </div>
              <FieldLabel label="Ek klinik notlar" className="mt-7" />
              <div className="mt-3 space-y-3">
                {extraNotes.map((note, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className="h-12 min-w-0 flex-1 rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]"
                      value={note}
                      onChange={(event) => setExtraNotes((items) => items.map((item, itemIndex) => (itemIndex === index ? event.target.value : item)))}
                      placeholder="Önceki ameliyat, tedavi, bilinen tanı..."
                    />
                    <button className="focus-ring grid h-12 w-12 place-items-center rounded-[9px] border border-[var(--border)] text-[var(--text-secondary)]" onClick={() => setExtraNotes((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label="Notu sil">
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
                <button className="btn-secondary min-h-10" onClick={() => setExtraNotes((items) => [...items, ""])}>
                  <Plus size={17} /> Not ekle
                </button>
              </div>
            </WizardPanel>
          )}

          {step === 2 && (
            <WizardPanel title="Tıbbi görüntülerinizi yükleyin." text="Bu adım zorunludur. Prototipte dosya sunucuya gönderilmez; seçilen dosyalar arayüzde görüntülenir.">
              <FieldLabel label="DICOM / ZIP dosyaları" required />
              <label className="mt-2 block cursor-pointer rounded-[14px] border border-dashed border-[rgba(20,111,193,0.45)] bg-[#fbfdff] p-8 text-center">
                <UploadCloud className="mx-auto text-[var(--blue)]" size={40} />
                <span className="mt-3 block font-bold text-[var(--navy)]">Dosyaları Seç</span>
                <span className="mt-1 block text-sm text-[var(--text-secondary)]">Klasör, ZIP veya DICOM dosyaları</span>
                <input type="file" multiple className="sr-only" onChange={handleImages} required aria-required />
              </label>
              {imageFiles.length > 0 && (
                <div className="mt-5 rounded-[12px] bg-[var(--pale-blue)] p-4">
                  <p className="font-bold text-[var(--navy)]">{imageFiles.length} dosya seçildi</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{imageFiles.slice(0, 3).join(", ")}{imageFiles.length > 3 ? "..." : ""}</p>
                </div>
              )}
            </WizardPanel>
          )}

          {step === 3 && (
            <WizardPanel title="Ek belgeleri ekleyin." text="Bu adım opsiyoneldir. Radyoloji raporu, epikriz, patoloji veya laboratuvar sonucu gibi belgeleri ihtiyaç oldukça ekleyebilirsiniz.">
              <div className="space-y-3">
                {documents.map((document, index) => (
                  <div key={index} className="grid gap-3 rounded-[12px] border border-[var(--border)] bg-white p-4 md:grid-cols-[0.7fr_1fr_auto]">
                    <select className="h-11 rounded-[9px] border border-[var(--border)] px-3 outline-none" value={document.category} onChange={(event) => setDocuments((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, category: event.target.value } : item))}>
                      {["Radyoloji raporu", "Epikriz", "Patoloji", "Laboratuvar", "Operasyon raporu", "Diğer"].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                    <input type="file" className="text-sm text-[var(--text-secondary)]" onChange={(event) => setDocuments((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, file: event.target.files?.[0]?.name ?? "" } : item))} />
                    <button className="focus-ring grid h-11 w-11 place-items-center rounded-[9px] border border-[var(--border)] text-[var(--text-secondary)]" onClick={() => setDocuments((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label="Belge satırını sil">
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
                <button className="btn-secondary min-h-10" onClick={() => setDocuments((items) => [...items, { category: "Diğer", file: "" }])}>
                  <Plus size={17} /> Belge ekle
                </button>
              </div>
            </WizardPanel>
          )}

          {step === 4 && (
            <WizardPanel title="Uzman seçimini nasıl yapmak istersiniz?" text="MVP'de otomatik eşleştirme yoktur; seçim platform operasyonu tarafından manuel yönetilebilir.">
              <FieldLabel label="Uzman seçimi" required />
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {["Uzmanı kendim seçmek istiyorum", "Second Opinion uygun uzmanı seçsin"].map((item, index) => (
                  <button key={item} className={`focus-ring rounded-[12px] border p-5 text-left ${specialistChoice === item ? "border-[var(--blue)] bg-[var(--pale-blue)]" : "border-[var(--border)] bg-white"}`} onClick={() => setSpecialistChoice(item)} aria-pressed={specialistChoice === item}>
                    <span className="block text-lg font-bold text-[var(--navy)]">{item}</span>
                    <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">{index === 1 ? "Operasyon ekibi görüntüleme alanına göre yönlendirme yapar." : "Doktor profillerini inceleyerek ilerleyin."}</span>
                  </button>
                ))}
              </div>
            </WizardPanel>
          )}

          {step === 5 && (
            <WizardPanel title="Başvuru özeti" text="Göndermeden önce zorunlu alanları ve eklenebilir bilgileri kontrol edin. Ödeme ve gerçek submit entegrasyonu bu prototipte yoktur.">
              <div className="grid gap-3 text-sm">
                <SummaryRow label="Kimin için" value={forWhom} />
                <SummaryRow label="Görüntüleme" value={modality} />
                <SummaryRow label="Bölge" value={region} />
                <SummaryRow label="Klinik soru" value={clinicalQuestion || "Henüz yazılmadı"} />
                <SummaryRow label="Görüntü dosyası" value={imageFiles.length ? `${imageFiles.length} dosya seçildi` : "Zorunlu"} />
                <SummaryRow label="Ek belgeler" value={`${documents.filter((item) => item.file).length} belge`} />
                <SummaryRow label="Uzman seçimi" value={specialistChoice} />
              </div>
            </WizardPanel>
          )}

          {!stepIsValid && <p className="mt-5 rounded-[10px] bg-[var(--warning-bg)] px-4 py-3 text-sm font-semibold text-[var(--warning)]">{validationMessage}</p>}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button className="btn-secondary disabled:cursor-not-allowed disabled:opacity-45" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
              <ArrowLeft size={17} /> Geri
            </button>
            {step < progress.length - 1 ? (
              <button className="btn-primary arrow-nudge disabled:cursor-not-allowed disabled:opacity-45" onClick={() => setStep((value) => Math.min(progress.length - 1, value + 1))} disabled={!stepIsValid}>
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

function FieldLabel({ label, required = false, className = "" }: { label: string; required?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-bold text-[var(--navy)]">{label}</span>
      <RequirementBadge required={required} />
    </div>
  );
}

function RequirementBadge({ required }: { required: boolean }) {
  return (
    <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${required ? "bg-[var(--warning-bg)] text-[var(--warning)]" : "bg-[var(--pale-blue)] text-[var(--blue)]"}`}>
      {required ? "Zorunlu" : "Opsiyonel"}
    </span>
  );
}

function ChoiceButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      className={`focus-ring rounded-[10px] border px-4 py-3 text-left font-semibold ${active ? "border-[var(--blue)] bg-[var(--pale-blue)] text-[var(--blue)]" : "border-[var(--border)] bg-white text-[var(--navy)]"}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[10px] bg-[var(--background)] p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-semibold text-[var(--text-secondary)]">{label}</span>
      <span className="font-bold text-[var(--navy)] sm:text-right">{value}</span>
    </div>
  );
}
