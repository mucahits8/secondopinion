import { InfoPage } from "@/components/info-page";

export const metadata = { title: "Gizlilik Politikası" };

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Yasal" title="Gizlilik metni üretim öncesi hukuk ekibiyle tamamlanmalıdır.">
      <p>Bu sayfa gerçek hukuki politika yerine yer tutucu açıklamadır. Yayına alınmadan önce veri işleme, saklama, paylaşım ve kullanıcı hakları net metinlerle tanımlanmalıdır.</p>
    </InfoPage>
  );
}
