import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { Link } from "@/i18n/navigation";
import { localizePath } from "@/lib/i18n-format";

type PageProps = { params: Promise<{ locale: string }> };
type Field = { id: string; label: string; required: boolean };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.register" });
  return { title: t("metadata") };
}

export default async function RegisterPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth.register");
  const fields = t.raw("fields") as Field[];

  return (
    <main className="grid min-h-screen bg-[var(--background)] lg:grid-cols-[0.92fr_1.08fr]">
      <section className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-xl">
          <Logo />
          <h1 className="mt-12 text-4xl font-bold text-[var(--navy)]">{t("title")}</h1>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">{t("text")}</p>
          <form className="mt-8 grid gap-4 sm:grid-cols-2" action={localizePath("/app/cases/new", locale)}>
            {fields.map((field) => (
              <label key={field.id} className="block">
                <span className="text-sm font-bold text-[var(--navy)]">
                  {field.label} <span className="text-[var(--warning)]">{field.required ? "*" : ""}</span>
                </span>
                <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]" placeholder={field.label} required={field.required} aria-required={field.required} />
              </label>
            ))}
            <button type="submit" className="btn-primary arrow-nudge mt-2 sm:col-span-2">
              {t("submit")} <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            {t("hasAccount")}{" "}
            <Link href="/login" className="font-bold text-[var(--blue)]">
              {t("login")}
            </Link>
          </p>
        </div>
      </section>
      <section className="relative hidden overflow-hidden p-12 medical-glow lg:block">
        <div className="absolute inset-12 rounded-[18px] border border-[var(--border)] bg-white/60" />
        <div className="relative flex h-full flex-col justify-end">
          <ShieldCheck className="text-[var(--blue)]" size={44} />
          <h2 className="mt-6 max-w-lg text-4xl font-bold leading-tight text-[var(--navy)]">{t("sideTitle")}</h2>
        </div>
      </section>
    </main>
  );
}
