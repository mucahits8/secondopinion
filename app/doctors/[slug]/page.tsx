import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Languages } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-chrome";
import { doctors } from "@/data/doctors";

export async function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  return {
    title: doctor ? `${doctor.title} ${doctor.name}` : "Uzman",
  };
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white py-16">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.86fr_0.48fr] lg:items-start">
            <div className="surface-card overflow-hidden rounded-[14px]">
              <Image src={doctor.image} alt={`${doctor.title} ${doctor.name}`} width={900} height={560} className="h-[420px] w-full object-cover" priority />
              <div className="p-8">
                <p className="text-sm font-bold text-[var(--blue)]">{doctor.specialty}</p>
                <h1 className="mt-2 text-4xl font-bold text-[var(--navy)] md:text-[52px]">
                  {doctor.title} {doctor.name}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{doctor.intro}</p>
              </div>
            </div>
            <aside className="sticky top-28 surface-card rounded-[14px] p-6 shadow-[var(--shadow-soft)]">
              <h2 className="text-2xl font-bold text-[var(--navy)]">Second Opinion</h2>
              <div className="mt-5 space-y-4 text-sm">
                <p className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Clock size={18} className="text-[var(--blue)]" /> Tahmini değerlendirme: {doctor.reviewTime}
                </p>
                <p className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Languages size={18} className="text-[var(--blue)]" /> {doctor.languages.join(", ")}
                </p>
              </div>
              <Link href="/app/cases/new" className="btn-primary arrow-nudge mt-7 w-full">
                Bu Uzmandan Görüş Al <ArrowRight size={17} />
              </Link>
            </aside>
          </div>
        </section>
        <section className="section-space">
          <div className="container-shell grid gap-6 md:grid-cols-3">
            {[
              ["Uzmanlık", [doctor.subspecialty, ...doctor.interests]],
              ["Egitim", doctor.education],
              ["Degerlendirdigi görüntülemeler", doctor.modalities],
            ].map(([title, items]) => (
              <article key={title as string} className="surface-card rounded-[14px] p-6">
                <h2 className="text-xl font-bold text-[var(--navy)]">{title as string}</h2>
                <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                  {(items as string[]).map((item) => (
                    <li key={item} className="border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
