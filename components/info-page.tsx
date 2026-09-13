import { Footer, SiteHeader } from "@/components/site-chrome";

export function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-shell max-w-4xl py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--navy)] md:text-[56px]">{title}</h1>
          <div className="mt-8 space-y-5 text-lg leading-8 text-[var(--text-secondary)]">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
