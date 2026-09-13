import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type LogoProps = {
  compact?: boolean;
  light?: boolean;
};

export function Logo({ compact = false, light = false }: LogoProps) {
  const t = useTranslations("common.brand");

  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3" aria-label={t("homeAria")}>
      <Image src="/brand/logo-mark.png" alt="" width={40} height={40} className="object-contain" priority />
      {!compact && (
        <span className="leading-none">
          <span className={`block text-[26px] font-bold tracking-normal ${light ? "text-white" : "text-[var(--navy)]"}`}>
            {t("name")}
          </span>
          <span className={`mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] ${light ? "text-white/70" : "text-[var(--text-muted)]"}`}>
            {t("tagline")}
          </span>
        </span>
      )}
    </Link>
  );
}
