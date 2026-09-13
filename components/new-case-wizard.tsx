"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useTranslations } from "next-intl";
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
import { Link } from "@/i18n/navigation";

type Choice = { id: string; label: string };
type ModalityOption = { id: string; title: string; text: string };
type DocumentCategory = { id: string; label: string };

const noteIcons: LucideIcon[] = [UserRound, FileQuestion, Stethoscope, UploadCloud];

export function NewCaseWizard() {
  const t = useTranslations("cases.wizard");
  const validation = useTranslations("validation.wizard");
  const common = useTranslations("common");
  const progress = t.raw("progress") as string[];
  const modalityOptions = t.raw("modality.options") as ModalityOption[];
  const regionOptions = t.raw("regions.options") as Choice[];
  const documentCategories = t.raw("panels.documents.categories") as DocumentCategory[];
  const notes = t.raw("notes") as Array<{ title: string; text: string }>;

  const [step, setStep] = useState(0);
  const [forWhom, setForWhom] = useState("self");
  const [modality, setModality] = useState("mri");
  const [region, setRegion] = useState("brain");
  const [clinicalQuestion, setClinicalQuestion] = useState("");
  const [complaint, setComplaint] = useState("");
  const [extraNotes, setExtraNotes] = useState([""]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [documents, setDocuments] = useState([{ category: "radiology-report", file: "" }]);
  const [specialistChoice, setSpecialistChoice] = useState("platform");

  const forWhomOptions = [
    { id: "self", label: t("forWhom.self") },
    { id: "child", label: t("forWhom.child") },
    { id: "relative", label: t("forWhom.relative") },
  ];

  const specialistOptions = [
    { id: "self", label: t("panels.expert.self.label"), text: t("panels.expert.self.text") },
    { id: "platform", label: t("panels.expert.platform.label"), text: t("panels.expert.platform.text") },
  ];

  const stepIsValid = useMemo(() => {
    if (step === 0) return Boolean(forWhom && modality);
    if (step === 1) return clinicalQuestion.trim().length >= 12 && Boolean(region);
    if (step === 2) return imageFiles.length > 0;
    if (step === 3) return true;
    if (step === 4) return Boolean(specialistChoice);
    return true;
  }, [clinicalQuestion, forWhom, imageFiles.length, modality, region, specialistChoice, step]);

  const validationMessage = useMemo(() => {
    if (step === 1 && !stepIsValid) return validation("clinicalQuestion");
    if (step === 2 && !stepIsValid) return validation("images");
    return validation("default");
  }, [step, stepIsValid, validation]);

  function handleImages(event: ChangeEvent<HTMLInputElement>) {
    setImageFiles(Array.from(event.target.files ?? []).map((file) => file.name));
  }

  const selectedForWhom = forWhomOptions.find((item) => item.id === forWhom)?.label ?? "";
  const selectedModality = modalityOptions.find((item) => item.id === modality)?.title ?? "";
  const selectedRegion = regionOptions.find((item) => item.id === region)?.label ?? "";
  const selectedSpecialist = specialistOptions.find((item) => item.id === specialistChoice)?.label ?? "";

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
            <p className="text-sm font-bold text-[var(--blue)]">{t("newCase")}</p>
            <RequirementBadge required={step !== 3} />
          </div>

          {step === 0 && (
            <WizardPanel title={t("panels.service.title")} text={t("panels.service.text")}>
              <FieldLabel label={t("forWhom.label")} required />
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {forWhomOptions.map((item) => (
                  <ChoiceButton key={item.id} active={forWhom === item.id} onClick={() => setForWhom(item.id)}>
                    {item.label}
                  </ChoiceButton>
                ))}
              </div>
              <FieldLabel label={t("modality.label")} required className="mt-7" />
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {modalityOptions.map((item) => (
                  <button
                    key={item.id}
                    className={`focus-ring rounded-[12px] border p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--blue)] ${modality === item.id ? "border-[var(--blue)] bg-[var(--pale-blue)]" : "border-[var(--border)] bg-white"}`}
                    onClick={() => setModality(item.id)}
                    aria-pressed={modality === item.id}
                  >
                    <ImageIcon className="mb-4 text-[var(--blue)]" size={26} />
                    <span className="block text-lg font-bold text-[var(--navy)]">{item.title}</span>
                    <span className="mt-1 block text-sm text-[var(--text-secondary)]">{item.text}</span>
                  </button>
                ))}
              </div>
            </WizardPanel>
          )}

          {step === 1 && (
            <WizardPanel title={t("panels.clinical.title")} text={t("panels.clinical.text")}>
              <FieldLabel label={t("panels.clinical.questionLabel")} required />
              <textarea
                className="mt-2 min-h-36 w-full rounded-[12px] border border-[var(--border)] p-4 outline-none focus:border-[var(--blue)]"
                placeholder={t("panels.clinical.questionPlaceholder")}
                value={clinicalQuestion}
                onChange={(event) => setClinicalQuestion(event.target.value)}
                required
                aria-required
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label>
                  <FieldLabel label={t("regions.label")} required />
                  <div className="mt-2 grid gap-2">
                    {regionOptions.map((item) => (
                      <ChoiceButton key={item.id} active={region === item.id} onClick={() => setRegion(item.id)}>
                        {item.label}
                      </ChoiceButton>
                    ))}
                  </div>
                </label>
                <label>
                  <FieldLabel label={t("panels.clinical.complaintLabel")} />
                  <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]" value={complaint} onChange={(event) => setComplaint(event.target.value)} placeholder={t("panels.clinical.complaintPlaceholder")} />
                </label>
              </div>
              <FieldLabel label={t("panels.clinical.notesLabel")} className="mt-7" />
              <div className="mt-3 space-y-3">
                {extraNotes.map((note, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className="h-12 min-w-0 flex-1 rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]"
                      value={note}
                      onChange={(event) => setExtraNotes((items) => items.map((item, itemIndex) => (itemIndex === index ? event.target.value : item)))}
                      placeholder={t("panels.clinical.notesPlaceholder")}
                    />
                    <button className="focus-ring grid h-12 w-12 place-items-center rounded-[9px] border border-[var(--border)] text-[var(--text-secondary)]" onClick={() => setExtraNotes((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label={t("panels.clinical.removeNote")}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
                <button className="btn-secondary min-h-10" onClick={() => setExtraNotes((items) => [...items, ""])}>
                  <Plus size={17} /> {t("panels.clinical.addNote")}
                </button>
              </div>
            </WizardPanel>
          )}

          {step === 2 && (
            <WizardPanel title={t("panels.images.title")} text={t("panels.images.text")}>
              <FieldLabel label={t("panels.images.label")} required />
              <label className="mt-2 block cursor-pointer rounded-[14px] border border-dashed border-[rgba(20,111,193,0.45)] bg-[#fbfdff] p-8 text-center">
                <UploadCloud className="mx-auto text-[var(--blue)]" size={40} />
                <span className="mt-3 block font-bold text-[var(--navy)]">{common("actions.chooseFiles")}</span>
                <span className="mt-1 block text-sm text-[var(--text-secondary)]">{t("panels.images.hint")}</span>
                <input type="file" multiple className="sr-only" onChange={handleImages} required aria-required />
              </label>
              {imageFiles.length > 0 && (
                <div className="mt-5 rounded-[12px] bg-[var(--pale-blue)] p-4">
                  <p className="font-bold text-[var(--navy)]">{t("panels.images.selected", { count: imageFiles.length })}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {imageFiles.slice(0, 3).join(", ")}
                    {imageFiles.length > 3 ? "..." : ""}
                  </p>
                </div>
              )}
            </WizardPanel>
          )}

          {step === 3 && (
            <WizardPanel title={t("panels.documents.title")} text={t("panels.documents.text")}>
              <div className="space-y-3">
                {documents.map((document, index) => (
                  <div key={index} className="grid gap-3 rounded-[12px] border border-[var(--border)] bg-white p-4 md:grid-cols-[0.7fr_1fr_auto]">
                    <select className="h-11 rounded-[9px] border border-[var(--border)] px-3 outline-none" value={document.category} onChange={(event) => setDocuments((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, category: event.target.value } : item))}>
                      {documentCategories.map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                      ))}
                    </select>
                    <input type="file" className="text-sm text-[var(--text-secondary)]" onChange={(event) => setDocuments((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, file: event.target.files?.[0]?.name ?? "" } : item))} />
                    <button className="focus-ring grid h-11 w-11 place-items-center rounded-[9px] border border-[var(--border)] text-[var(--text-secondary)]" onClick={() => setDocuments((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label={t("panels.documents.removeRow")}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
                <button className="btn-secondary min-h-10" onClick={() => setDocuments((items) => [...items, { category: "other", file: "" }])}>
                  <Plus size={17} /> {t("panels.documents.add")}
                </button>
              </div>
            </WizardPanel>
          )}

          {step === 4 && (
            <WizardPanel title={t("panels.expert.title")} text={t("panels.expert.text")}>
              <FieldLabel label={t("panels.expert.label")} required />
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {specialistOptions.map((item) => (
                  <button key={item.id} className={`focus-ring rounded-[12px] border p-5 text-left ${specialistChoice === item.id ? "border-[var(--blue)] bg-[var(--pale-blue)]" : "border-[var(--border)] bg-white"}`} onClick={() => setSpecialistChoice(item.id)} aria-pressed={specialistChoice === item.id}>
                    <span className="block text-lg font-bold text-[var(--navy)]">{item.label}</span>
                    <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">{item.text}</span>
                  </button>
                ))}
              </div>
            </WizardPanel>
          )}

          {step === 5 && (
            <WizardPanel title={t("panels.summary.title")} text={t("panels.summary.text")}>
              <div className="grid gap-3 text-sm">
                <SummaryRow label={t("panels.summary.rows.forWhom")} value={selectedForWhom} />
                <SummaryRow label={t("panels.summary.rows.modality")} value={selectedModality} />
                <SummaryRow label={t("panels.summary.rows.region")} value={selectedRegion} />
                <SummaryRow label={t("panels.summary.rows.question")} value={clinicalQuestion || t("panels.summary.emptyQuestion")} />
                <SummaryRow label={t("panels.summary.rows.images")} value={imageFiles.length ? t("panels.images.selected", { count: imageFiles.length }) : t("panels.summary.requiredImage")} />
                <SummaryRow label={t("panels.summary.rows.documents")} value={common("units.document", { count: documents.filter((item) => item.file).length })} />
                <SummaryRow label={t("panels.summary.rows.expert")} value={selectedSpecialist} />
              </div>
            </WizardPanel>
          )}

          {!stepIsValid && <p className="mt-5 rounded-[10px] bg-[var(--warning-bg)] px-4 py-3 text-sm font-semibold text-[var(--warning)]">{validationMessage}</p>}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button className="btn-secondary disabled:cursor-not-allowed disabled:opacity-45" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
              <ArrowLeft size={17} /> {common("actions.back")}
            </button>
            {step < progress.length - 1 ? (
              <button className="btn-primary arrow-nudge disabled:cursor-not-allowed disabled:opacity-45" onClick={() => setStep((value) => Math.min(progress.length - 1, value + 1))} disabled={!stepIsValid}>
                {common("actions.continue")} <ArrowRight size={17} />
              </button>
            ) : (
              <Link href="/app/cases/SO-2026-00184/images" className="btn-primary arrow-nudge">
                {common("actions.completeDraft")} <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          {notes.map((note, index) => {
            const Icon = noteIcons[index] ?? FileQuestion;
            return (
              <div key={note.title} className="surface-card rounded-[12px] p-5">
                <Icon className="text-[var(--blue)]" size={24} />
                <h2 className="mt-3 font-bold text-[var(--navy)]">{note.title}</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{note.text}</p>
              </div>
            );
          })}
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
  const t = useTranslations("common.requirements");

  return (
    <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${required ? "bg-[var(--warning-bg)] text-[var(--warning)]" : "bg-[var(--pale-blue)] text-[var(--blue)]"}`}>
      {required ? t("required") : t("optional")}
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
