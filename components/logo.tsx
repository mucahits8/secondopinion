import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  light?: boolean;
};

export function Logo({ compact = false, light = false }: LogoProps) {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3" aria-label="Second Opinion ana sayfa">
      <Image src="/brand/logo-mark.png" alt="" width={40} height={40} className="object-contain" priority />
      {!compact && (
        <span className="leading-none">
          <span className={`block text-[26px] font-bold tracking-normal ${light ? "text-white" : "text-[var(--navy)]"}`}>
            Second Opinion
          </span>
          <span className={`mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] ${light ? "text-white/70" : "text-[var(--text-muted)]"}`}>
            Daha fazla netlik. Daha sağlıkli kararlar.
          </span>
        </span>
      )}
    </Link>
  );
}
