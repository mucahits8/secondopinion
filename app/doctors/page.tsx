import { Footer, SiteHeader } from "@/components/site-chrome";
import { DoctorCard, SectionHeader } from "@/components/cards";
import { doctors } from "@/data/doctors";

export const metadata = {
  title: "Uzmanlarımız",
};

export default function DoctorsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-shell py-20">
          <SectionHeader
            eyebrow="Uzman kadro"
            title="Klinik otoriteyi sade bir seçim deneyimine dönüştürün."
            text="Bu prototipteki profiller demonstrasyon amaçlıdır. Gerçek kurum, yayın, hasta sayısı veya sertifika iddiası kullanılmamıştır."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
