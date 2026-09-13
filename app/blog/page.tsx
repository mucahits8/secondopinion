import { InfoPage } from "@/components/info-page";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <InfoPage eyebrow="Bilgi merkezi" title="Tıbbi görüntüleme ve ikinci görüş rehberi.">
      <p>Bu alan, Second Opinion yayına hazırlanırken hasta eğitimi ve süreç anlatımı için kullanılacak.</p>
      <p>Yayınlanacak içerikler tıbbi tanı veya acil sağlık yönlendirmesi yerine, hizmet kapsamını ve görüntüleme sürecini anlaşılır hale getirmeye odaklanacaktır.</p>
    </InfoPage>
  );
}
