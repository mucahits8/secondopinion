import { InfoPage } from "@/components/info-page";

export const metadata = { title: "Fiyatlandırma" };

export default function PricingPage() {
  return (
    <InfoPage eyebrow="Fiyatlandırma" title="Fiyat bilgisi gerçek operasyon kararıyla netleşir.">
      <p>Bu prototipte ödeme modeli veya ücret tutarı yayınlanmaz. Sistem, submit öncesi ödeme, doktor kabulü sonrası ödeme veya authorization-capture modeli desteklenecek şekilde tasarlanabilir.</p>
    </InfoPage>
  );
}
