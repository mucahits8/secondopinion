import { InfoPage } from "@/components/info-page";

export const metadata = { title: "Yardım Merkezi" };

export default function HelpPage() {
  return (
    <InfoPage eyebrow="Destek" title="Yükleme, başvuru ve rapor teslimi için sade destek.">
      <p>Yardım merkezi; DICOM dosyası bulma, ZIP yükleme, ek belge ekleme ve rapora erişim gibi pratik konuları açıklamak için kullanılacaktır.</p>
      <p>Teknik hata ile klinik vaka durumu birbirinden ayrı ele alınacak şekilde tasarlanır.</p>
    </InfoPage>
  );
}
