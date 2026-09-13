import { Footer, SiteHeader } from "@/components/site-chrome";
import { SectionHeader, SpecialtyCard } from "@/components/cards";
import { specialties } from "@/data/specialties";

export const metadata = {
  title: "Uzmanlık Alanları",
};

export default function SpecialtiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-shell py-20">
          <SectionHeader
            eyebrow="Tıbbi görüntüleme alanları"
            title="İkinci görüşü doğru uzmanlık alanında başlatın."
            text="Hasta seçimi sade tutulur; görüntü yüklendikten sonra teknik modality bilgisi sistem tarafında ayrıca doğrulanacak şekilde tasarlanır."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.title} {...specialty} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
