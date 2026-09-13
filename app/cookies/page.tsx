import { InfoPage } from "@/components/info-page";

export const metadata = { title: "Çerez Politikası" };

export default function CookiesPage() {
  return (
    <InfoPage eyebrow="Yasal" title="Çerez politikası gerçek analitik ve güvenlik araçlarına göre yazılmalıdır.">
      <p>Bu prototipte gerçek çerez envanteri yayınlanmaz. Üretim öncesi kullanılan araçlara göre şeffaf bir politika hazırlanmalıdır.</p>
    </InfoPage>
  );
}
