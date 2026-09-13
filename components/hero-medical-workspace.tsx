"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FileText, Search, ShieldCheck, UserRound } from "lucide-react";

export function HeroMedicalWorkspace() {
  const t = useTranslations("home.workspace");
  const common = useTranslations("common.statuses");
  const shared = useTranslations("common");
  const sidebar = t.raw("sidebar") as string[];
  const reportSections = t.raw("reportSections") as string[];
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const transform = useMemo(() => {
    return {
      workstation: `translate(${pos.x * 2}px, ${pos.y * 1.4}px)`,
      doctor: `translate(${pos.x * -4}px, ${pos.y * 3}px)`,
      report: `translate(${pos.x * 3}px, ${pos.y * -3}px)`,
    };
  }, [pos]);

  return (
    <div
      className="relative mx-auto min-h-[430px] w-full max-w-[650px] medical-glow"
      onMouseMove={(event) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPos({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="reveal-slow absolute left-[2%] top-[12%] w-[82%] transition-transform duration-300 ease-out" style={{ transform: transform.workstation }}>
        <div className="rounded-t-[18px] border-[7px] border-[#111927] bg-[#111927] shadow-[var(--shadow-float)]">
          <div className="flex h-[26px] items-center gap-2 rounded-t-[10px] bg-[#f9fbfd] px-4 text-[10px] font-semibold text-[var(--navy)]">
            <Image src="/brand/logo-mark.png" alt="" width={16} height={16} />
            {shared("brand.name")}
            <span className="ml-auto h-2 w-20 rounded-full bg-[#edf2f7]" />
          </div>
          <div className="grid grid-cols-[92px_1fr] bg-white">
            <div className="space-y-2 border-r border-[var(--border)] bg-[#f7fafc] p-3 text-[11px] text-[var(--text-secondary)]">
              {sidebar.map((item, index) => (
                <div key={item} className={`flex items-center gap-2 rounded-md px-2 py-2 ${index === 1 ? "bg-[var(--pale-blue)] text-[var(--blue)]" : ""}`}>
                  {index === 1 ? <Search size={12} /> : <UserRound size={12} />}
                  {item}
                </div>
              ))}
            </div>
            <div className="bg-[#08111a] p-3">
              <Image src="/hero/dicom-brain-demo.webp" alt={t("dicomAlt")} width={900} height={360} priority className="h-[262px] w-full rounded-[7px] object-cover object-left shadow-inner" />
            </div>
          </div>
        </div>
        <div className="mx-auto h-4 w-[96%] rounded-b-[50%] bg-gradient-to-b from-[#b8c3cd] to-[#eff4f8]" />
      </div>

      <div className="reveal absolute right-[2%] top-[5%] flex w-[240px] items-center gap-3 rounded-[12px] border border-[var(--border)] bg-white p-3 shadow-[var(--shadow-float)] transition-transform duration-300 ease-out max-sm:right-0 max-sm:top-0 max-sm:w-[210px]" style={{ transform: transform.doctor }}>
        <Image src="/hero/doctor-neuroradiology.webp" alt={t("doctorAlt")} width={64} height={64} className="h-16 w-16 rounded-[9px] object-cover" />
        <div>
          <p className="text-sm font-bold text-[var(--navy)]">{t("doctorName")}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{t("doctorSpecialty")}</p>
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--success-bg)] px-2 py-1 text-[11px] font-semibold text-[var(--success)]">
            <span className="h-2 w-2 rounded-full bg-[var(--success)]" /> {common("online")}
          </p>
        </div>
      </div>

      <div className="reveal absolute bottom-[8%] right-[15%] w-[210px] rounded-[12px] border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-float)] transition-transform duration-300 ease-out" style={{ transform: transform.report }}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--navy)]">{t("reportTitle")}</h3>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#f4f7fa] px-2 py-1 text-[10px] font-semibold text-[var(--text-secondary)]">
            <FileText size={11} /> {shared("demo.pdf")}
          </span>
        </div>
        {reportSections.map((item, index) => (
          <div key={item} className="mb-2">
            <p className="text-[10px] font-semibold text-[var(--navy)]">{item}</p>
            <div className={`mt-1 h-2 rounded-full bg-[#dce5ee] ${index === 1 ? "w-full" : index === 2 ? "w-4/5" : "w-2/3"}`} />
          </div>
        ))}
      </div>

      <Image src="/illustrations/handwritten-text.png" alt="" width={220} height={150} className="absolute right-[-2%] top-[42%] hidden w-44 opacity-80 xl:block" />
      <div className="absolute bottom-8 left-[18%] hidden items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-xs font-semibold text-[var(--navy)] shadow-[var(--shadow-soft)] md:flex">
        <ShieldCheck size={15} className="text-[var(--blue)]" />
        {t("demoBadge")}
      </div>
    </div>
  );
}
