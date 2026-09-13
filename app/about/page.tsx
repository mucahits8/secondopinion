import { InfoPage } from "@/components/info-page";

export const metadata = { title: "Hakkımızda" };

export default function AboutPage() {
  return (
    <InfoPage eyebrow="Kurumsal" title="Second Opinion, güvenli ikinci görüş deneyimi için tasarlanıyor.">
      <p>Platform; hasta, operasyon ekibi ve uzman hekim arasındaki görüntüleme odaklı ikinci görüş sürecini sade ve kontrollü hale getirmeyi amaçlar.</p>
      <p>Bu prototip gerçek kurum, sertifika, başarı oranı veya hasta sayısı iddiası içermez.</p>
    </InfoPage>
  );
}
