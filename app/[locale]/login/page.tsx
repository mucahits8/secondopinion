import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/logo";
import { Link } from "@/i18n/navigation";
import { localizePath } from "@/lib/i18n-format";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.login" });
  return { title: t("metadata") };
}

export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth.login");

  return (
    <main className="grid min-h-screen bg-[var(--background)] lg:grid-cols-[0.92fr_1.08fr]">
      <section className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-12 text-4xl font-bold text-[var(--navy)]">{t("title")}</h1>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">{t("text")}</p>
          <form className="mt-8 space-y-4" action={localizePath("/app", locale)}>
            <label className="block">
              <span className="text-sm font-bold text-[var(--navy)]">{t("email")}</span>
              <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]" type="email" placeholder={t("emailPlaceholder")} required aria-required />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--navy)]">{t("password")}</span>
              <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]" type="password" placeholder={t("passwordPlaceholder")} required aria-required />
            </label>
            <button type="submit" className="btn-primary arrow-nudge w-full">
              {t("submit")} <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            {t("noAccount")}{" "}
            <Link href="/register" className="font-bold text-[var(--blue)]">
              {t("register")}
            </Link>
          </p>
        </div>
      </section>
      <section className="relative hidden overflow-hidden p-12 medical-glow lg:block">
        <div className="absolute inset-12 rounded-[18px] border border-[var(--border)] bg-white/60" />
        <div className="relative flex h-full flex-col justify-end">
          <LockKeyhole className="text-[var(--blue)]" size={44} />
          <h2 className="mt-6 max-w-lg text-4xl font-bold leading-tight text-[var(--navy)]">{t("sideTitle")}</h2>
        </div>
      </section>
    </main>
  );
}
