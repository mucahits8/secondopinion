import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata = {
  title: "Kayıt Ol",
};

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen bg-[var(--background)] lg:grid-cols-[0.92fr_1.08fr]">
      <section className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-xl">
          <Logo />
          <h1 className="mt-12 text-4xl font-bold text-[var(--navy)]">İkinci görüş başvurunuzu başlatın.</h1>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">İlk adımda yalnızca gerekli hesap bilgileri alınır; klinik bilgiler başvuru akışı içinde adım adım sorulur.</p>
          <form className="mt-8 grid gap-4 sm:grid-cols-2" action="/app/cases/new">
            {["Ad", "Soyad", "E-posta", "Telefon", "Doğum tarihi", "Tercih edilen dil"].map((field) => (
              <label key={field} className="block">
                <span className="text-sm font-bold text-[var(--navy)]">
                  {field} <span className="text-[var(--warning)]">{field === "Tercih edilen dil" ? "" : "*"}</span>
                </span>
                <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none focus:border-[var(--blue)]" placeholder={field} required={field !== "Tercih edilen dil"} aria-required={field !== "Tercih edilen dil"} />
              </label>
            ))}
            <button type="submit" className="btn-primary arrow-nudge mt-2 sm:col-span-2">
              Başvuruyu Başlat <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="font-bold text-[var(--blue)]">
              Giriş yapın
            </Link>
          </p>
        </div>
      </section>
      <section className="relative hidden overflow-hidden p-12 medical-glow lg:block">
        <div className="absolute inset-12 rounded-[18px] border border-[var(--border)] bg-white/60" />
        <div className="relative flex h-full flex-col justify-end">
          <ShieldCheck className="text-[var(--blue)]" size={44} />
          <h2 className="mt-6 max-w-lg text-4xl font-bold leading-tight text-[var(--navy)]">
            Sade hasta deneyimi, kontrollü klinik iş akışı.
          </h2>
        </div>
      </section>
    </main>
  );
}
