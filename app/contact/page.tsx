import { InfoPage } from "@/components/info-page";

export const metadata = { title: "İletişim" };

export default function ContactPage() {
  return (
    <InfoPage eyebrow="İletişim" title="Vaka ve destek iletişimi platform içinde tutulur.">
      <p>Gerçek hizmette hasta iletişiminin kişisel kanallara dağılmaması, vaka bazlı kayıt altında ilerlemesi hedeflenir.</p>
      <p>Bu sayfa canlı iletişim formu bağlanmadan önce güvenli iletişim yaklaşımını göstermek için hazırlanmıştır.</p>
    </InfoPage>
  );
}
