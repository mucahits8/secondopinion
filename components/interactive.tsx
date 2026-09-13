"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ChevronDown, FileCheck2, FileText, FolderUp, LockKeyhole, UploadCloud } from "lucide-react";
import { caseSteps } from "@/data/cases";
import type { FaqItem } from "@/data/faqs";

export function DicomUploadDemo() {
  const t = useTranslations("upload.demo");
  const common = useTranslations("common.actions");
  const stages = t.raw("stages") as Array<{ title: string; detail: string; progress: number }>;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % stages.length), 1800);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <div className="surface-card rounded-[14px] p-5 shadow-[var(--shadow-soft)]">
      <div className="rounded-[12px] border border-dashed border-[rgba(20,111,193,0.42)] bg-[#fbfdff] p-6 text-center">
        <UploadCloud className="mx-auto text-[var(--blue)]" size={38} strokeWidth={1.8} />
        <h3 className="mt-3 text-lg font-bold text-[var(--navy)]">{t("title")}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
          {t("text")}
        </p>
        <label className="btn-primary mt-5 min-h-10 cursor-pointer px-5">
          {common("chooseFiles")}
          <input type="file" multiple className="sr-only" aria-label={t("aria")} />
        </label>
      </div>
      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-bold text-[var(--navy)]">{stages[active].title}</span>
          <span className="text-[var(--text-secondary)]">{stages[active].progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[var(--pale-blue)]">
          <div className="h-full rounded-full bg-[var(--blue)] transition-all duration-500" style={{ width: `${stages[active].progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{stages[active].detail}</p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          ["1", t("stats.study")],
          ["13", t("stats.series")],
          ["612", t("stats.images")],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[10px] bg-[var(--pale-blue)] p-3 text-center">
            <strong className="block text-xl text-[var(--navy)]">{value}</strong>
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseJourneyTimeline({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("common.statuses");

  return (
    <div className={`surface-card rounded-[14px] ${compact ? "p-5" : "p-7"}`}>
      <div className="grid gap-4 md:grid-cols-5">
        {caseSteps.map((step, index) => (
          <div key={step.labelKey} className="relative flex gap-3 md:block">
            {index < caseSteps.length - 1 && <span className="absolute left-4 top-4 hidden h-0.5 w-[calc(100%+1rem)] origin-left bg-[var(--border)] md:block" />}
            {index < 3 && index < caseSteps.length - 1 && <span className="draw-line absolute left-4 top-4 hidden h-0.5 w-[calc(100%+1rem)] origin-left bg-[var(--blue)] md:block" />}
            <span
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                step.state === "done"
                  ? "bg-[var(--blue)] text-white"
                  : step.state === "active"
                    ? "bg-[var(--pale-blue)] text-[var(--blue)] ring-4 ring-[rgba(20,111,193,0.12)]"
                    : "bg-[#eef3f8] text-[var(--text-muted)]"
              }`}
            >
              {step.state === "done" ? <Check size={16} /> : index + 1}
            </span>
            <p className="mt-1 text-sm font-semibold text-[var(--navy)] md:mt-3">{t(step.labelKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReportPreview() {
  const t = useTranslations("report.preview");
  const common = useTranslations("common");
  const sections = t.raw("sections") as string[];
  return (
    <div className="surface-card rounded-[14px] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--blue)]">{t("eyebrow")}</p>
          <h3 className="mt-1 text-xl font-bold text-[var(--navy)]">{t("title")}</h3>
        </div>
        <span className="rounded-md bg-[var(--pale-blue)] px-3 py-1 text-xs font-bold text-[var(--blue)]">{common("demo.applicationId")}</span>
      </div>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={section}>
            <h4 className="text-sm font-bold text-[var(--navy)]">{section}</h4>
            <div className="mt-2 space-y-2">
              <div className="h-2 w-full rounded-full bg-[#e2e9f0]" />
              <div className={`h-2 rounded-full bg-[#e2e9f0] ${index % 2 === 0 ? "w-4/5" : "w-2/3"}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm text-[var(--text-secondary)]">
        <span>{t("doctor")}</span>
        <span>{common("demo.finalVersion")}</span>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  const [open, setOpen] = useState(0);
  const t = useTranslations("home");
  const faqs = t.raw("faq") as FaqItem[];

  return (
    <div className="divide-y divide-[var(--border)] overflow-hidden rounded-[14px] border border-[var(--border)] bg-white">
      {faqs.map((faq, index) => (
        <div key={faq.question}>
          <button
            className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            <span className="font-bold text-[var(--navy)]">{faq.question}</span>
            <ChevronDown className={`shrink-0 text-[var(--blue)] transition-transform ${open === index ? "rotate-180" : ""}`} size={20} />
          </button>
          {open === index && <p className="px-5 pb-5 text-sm leading-7 text-[var(--text-secondary)]">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export function UploadDropzone() {
  const t = useTranslations("upload.dropzone");
  const common = useTranslations("common.actions");
  const checks = t.raw("checks") as string[];

  return (
    <div className="rounded-[14px] border border-dashed border-[rgba(20,111,193,0.45)] bg-white p-10 text-center">
      <FolderUp className="mx-auto text-[var(--blue)]" size={42} strokeWidth={1.8} />
      <h2 className="mt-4 text-2xl font-bold text-[var(--navy)]">{t("title")}</h2>
      <p className="mx-auto mt-2 max-w-lg text-[var(--text-secondary)]">
        {t("text")}
      </p>
      <label className="btn-primary mt-6 cursor-pointer">
        {common("chooseFiles")}
        <input type="file" multiple className="sr-only" aria-label={t("aria")} />
      </label>
      <div className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-3">
        {checks.map((item) => (
          <div key={item} className="rounded-[10px] bg-[var(--pale-blue)] p-3 text-sm font-semibold text-[var(--navy)]">
            <FileCheck2 className="mb-2 text-[var(--blue)]" size={18} /> {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SecurityFeature({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-4 border-l border-[var(--border)] pl-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-white text-[var(--blue)] shadow-[var(--shadow-soft)]">
        <LockKeyhole size={22} />
      </span>
      <span>
        <strong className="block text-[var(--navy)]">{title}</strong>
        <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">{text}</span>
      </span>
    </div>
  );
}

export function DocumentList({ documents }: { documents: string[] }) {
  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <div key={document} className="flex items-center gap-3 rounded-[10px] border border-[var(--border)] bg-white p-3">
          <FileText size={18} className="text-[var(--blue)]" />
          <span className="text-sm font-semibold text-[var(--navy)]">{document}</span>
        </div>
      ))}
    </div>
  );
}
