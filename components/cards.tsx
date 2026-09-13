import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Clock, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LocalizedDoctor } from "@/data/doctors";

export function SectionHeader({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{eyebrow}</p>}
        <h2 className="text-3xl font-bold tracking-normal text-[var(--navy)] md:text-[40px]">{title}</h2>
        {text && <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">{text}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn-ghost arrow-nudge shrink-0">
          {action.label} <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}

export function TrustItem({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-[var(--pale-blue)] text-[var(--blue)]">
        <Icon size={24} strokeWidth={1.8} />
      </span>
      <span>
        <strong className="block text-sm text-[var(--navy)]">{title}</strong>
        <span className="text-sm text-[var(--text-secondary)]">{text}</span>
      </span>
    </div>
  );
}

export function LinkedTrustItem({ icon: Icon, title, text, href }: { icon: LucideIcon; title: string; text: string; href: string }) {
  return (
    <Link href={href} className="group flex items-start gap-3 rounded-[12px] p-2 transition-colors hover:bg-[var(--pale-blue)]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-[var(--pale-blue)] text-[var(--blue)] transition-transform group-hover:scale-105">
        <Icon size={24} strokeWidth={1.8} />
      </span>
      <span>
        <strong className="block text-sm text-[var(--navy)]">{title}</strong>
        <span className="text-sm text-[var(--text-secondary)]">{text}</span>
      </span>
    </Link>
  );
}

export function DoctorCard({ doctor }: { doctor: LocalizedDoctor }) {
  const t = useTranslations();

  return (
    <article className="group surface-card rounded-[12px] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(20,111,193,0.45)] hover:shadow-[var(--shadow-soft)]">
      <div className="flex gap-5">
        <div className="h-28 w-24 shrink-0 overflow-hidden rounded-[10px] bg-[var(--pale-blue)]">
          <Image src={doctor.image} alt={`${doctor.title} ${doctor.name}`} width={160} height={190} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.025]" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-[var(--navy)]">
            {doctor.title} {doctor.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-[var(--blue)]">{doctor.specialty}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">{doctor.intro}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Clock size={16} className="text-[var(--blue)]" />
        {t("common.labels.estimatedReport")}: {doctor.reviewTime}
      </div>
      <Link href={`/doctors/${doctor.slug}`} className="btn-secondary arrow-nudge mt-5 h-10 min-h-10 px-5">
        {t("common.actions.viewProfile")} <ArrowRight size={16} />
      </Link>
    </article>
  );
}

export function SpecialtyCard({
  title,
  description,
  icon: Icon,
  image,
  href = "/specialties",
}: {
  title: string;
  description?: string;
  icon: LucideIcon;
  image?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="group surface-card block rounded-[12px] p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(20,111,193,0.42)]">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-[12px] bg-[var(--pale-blue)] text-[var(--blue)] transition-transform duration-200 group-hover:scale-105">
        {image ? <Image src={image} alt="" width={44} height={44} className="h-11 w-11 object-contain" /> : <Icon size={34} strokeWidth={1.7} />}
      </div>
      <h3 className="mt-5 text-lg font-bold text-[var(--navy)]">{title}</h3>
      {description && <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>}
    </Link>
  );
}
