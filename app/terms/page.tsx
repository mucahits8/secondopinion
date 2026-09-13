import { InfoPage } from "@/components/info-page";

export const metadata = { title: "Kullanım Şartları" };

export default function TermsPage() {
  return (
    <InfoPage eyebrow="Yasal" title="Kullanım şartları üretim kapsamıyla netleşecektir.">
      <p>Hizmetin acil sağlık hizmeti olmadığı, ikinci görüş kapsamı ve rapor teslim koşulları gerçek kullanım şartlarında açıkça belirtilmelidir.</p>
    </InfoPage>
  );
}
