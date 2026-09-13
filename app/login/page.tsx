import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata = {
  title: "Giriş Yap",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-[var(--background)] lg:grid-cols-[0.92fr_1.08fr]">
      <section className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-12 text-4xl font-bold text-[var(--navy)]">Hesabiniza giriş yapin.</h1>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">Vaka durumunuzu, belgelerinizi ve uzman raporunuzu güvenli şekilde takip edin.</p>
          <form className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-bold text-[var(--navy)]">E-posta</span>
              <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none" type="email" placeholder="örnek@email.com" />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--navy)]">Şifre</span>
              <input className="mt-2 h-12 w-full rounded-[9px] border border-[var(--border)] px-4 outline-none" type="password" placeholder="********" />
            </label>
            <Link href="/app" className="btn-primary arrow-nudge w-full">
              Giriş Yap <ArrowRight size={17} />
            </Link>
          </form>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            Hesabiniz yok mu?{" "}
            <Link href="/register" className="font-bold text-[var(--blue)]">
              Kayıt olun
            </Link>
          </p>
        </div>
      </section>
      <section className="relative hidden overflow-hidden p-12 medical-glow lg:block">
        <div className="absolute inset-12 rounded-[18px] border border-[var(--border)] bg-white/60" />
        <div className="relative flex h-full flex-col justify-end">
          <LockKeyhole className="text-[var(--blue)]" size={44} />
          <h2 className="mt-6 max-w-lg text-4xl font-bold leading-tight text-[var(--navy)]">
            Raporlar e-posta eki olarak değil, güvenli hesap uzerinden teslim edilir.
          </h2>
        </div>
      </section>
    </main>
  );
}
