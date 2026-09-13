export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  hero: string;
  featured?: boolean;
  takeaways: string[];
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "second-opinion-nedir",
    title: "Second opinion nedir, hangi durumlarda anlamlı olabilir?",
    excerpt:
      "İkinci uzman görüşünün neyi kapsadığını, neyi kapsamadığını ve hastaya nasıl daha net bir karar zemini sunabileceğini sade biçimde anlatıyoruz.",
    category: "İkinci Görüş",
    readTime: "5 dk",
    date: "13 Eylül 2026",
    hero: "/illustrations/clinic-background.webp",
    featured: true,
    takeaways: [
      "İkinci görüş, mevcut görüntüleme ve klinik bilgi üzerinden başka bir uzman değerlendirmesi almayı hedefler.",
      "Acil sağlık hizmetinin yerine geçmez.",
      "En faydalı sonuç için hastanın ana sorusu açık biçimde yazılmalıdır.",
    ],
    sections: [
      {
        heading: "İkinci görüşün amacı",
        body: [
          "Second opinion, hastanın mevcut tıbbi görüntüleme çalışmasını ve ilgili klinik bilgilerini farklı bir uzman perspektifiyle değerlendirmeyi amaçlar. Bu süreç hastaya daha fazla veri yığmak için değil, elindeki bilgiyi daha anlaşılır hale getirmek için tasarlanır.",
          "Platformun odağı tanı garantisi vermek değildir. Amaç, uzman hekimin görüntüleme bulgularını yapılandırılmış bir raporla açıklaması ve hastanın özellikle yanıtlanmasını istediği soruya kontrollü bir çerçevede yanıt vermesidir.",
        ],
      },
      {
        heading: "Ne zaman yararlı olabilir?",
        body: [
          "Hasta mevcut raporunu anlamakta zorlanıyorsa, önceki inceleme ile karşılaştırma istiyorsa veya belirli bir görüntüleme bulgusunun uzman tarafından tekrar değerlendirilmesini istiyorsa ikinci görüş anlamlı olabilir.",
          "Bu karar, hastanın kendi hekimiyle ilişkisini veya klinik takip planını ortadan kaldırmaz. İkinci görüş raporu, mevcut tedavi ekibiyle konuşulabilecek ek bir uzman perspektifi olarak düşünülmelidir.",
        ],
      },
      {
        heading: "Ne değildir?",
        body: [
          "Second opinion acil sağlık hizmeti değildir. Ani gelişen şiddetli şikayetler, acil müdahale gerektiren durumlar veya zaman kritik yakınmalar için hasta doğrudan acil sağlık hizmetlerine başvurmalıdır.",
          "Ayrıca bu süreç sınırsız doktor-hasta sohbeti veya görüntülü muayene olarak tasarlanmamıştır. Raporla ilgili açıklama talepleri operasyon ekibi üzerinden kontrollü şekilde ilerler.",
        ],
      },
    ],
  },
  {
    slug: "dicom-dosyasi-nedir",
    title: "DICOM dosyası nedir ve neden önemlidir?",
    excerpt:
      "MR, BT ve benzeri görüntüleme çalışmalarının çoğu DICOM formatında saklanır. Hastanın bilmesi gereken pratik noktaları derledik.",
    category: "DICOM",
    readTime: "4 dk",
    date: "13 Eylül 2026",
    hero: "/hero/dicom-brain-demo.webp",
    takeaways: [
      "DICOM, tıbbi görüntüleme cihazlarının standart dosya formatıdır.",
      "CD veya USB içeriği tek tek dosyalar ya da klasör yapısı halinde gelebilir.",
      "ZIP yükleme, klasör yapısının bozulmadan taşınmasına yardımcı olabilir.",
    ],
    sections: [
      {
        heading: "DICOM neyi taşır?",
        body: [
          "DICOM dosyaları yalnızca görüntünün kendisini değil, çalışma ve seri bilgilerini de taşıyabilir. Bu nedenle bir MR çalışması tek bir görüntüden değil, çok sayıda seri ve yüzlerce görüntüden oluşabilir.",
          "Second Opinion prototipi, hastanın bu teknik ayrıntıları yönetmek zorunda kalmaması için yükleme sürecini sade bir arayüzle sunar.",
        ],
      },
      {
        heading: "Neden PDF rapor tek başına yetmeyebilir?",
        body: [
          "PDF rapor, önceki değerlendirmeyi anlamak için yararlıdır; ancak uzman hekimin görüntünün kendisini inceleyebilmesi için çoğu durumda DICOM çalışmasının da yüklenmesi gerekir.",
          "Bu nedenle başvuru akışında görüntüleme dosyası zorunlu, ek rapor ve belgeler ise destekleyici bilgi olarak ele alınır.",
        ],
      },
    ],
  },
  {
    slug: "goruntuleme-yuklerken-nelere-dikkat-edilmeli",
    title: "Görüntüleme dosyası yüklerken nelere dikkat edilmeli?",
    excerpt:
      "CD, USB, klasör ve ZIP yüklemelerinde çalışmanın eksiksiz aktarılmasına yardımcı olacak hasta dostu kontrol listesi.",
    category: "Yükleme Rehberi",
    readTime: "6 dk",
    date: "13 Eylül 2026",
    hero: "/illustrations/radiology-workspace.webp",
    takeaways: [
      "CD içeriğindeki klasörleri tek tek ayıklamak yerine tamamını yüklemek daha güvenlidir.",
      "Birden fazla inceleme varsa sistem bunları ayrı çalışma olarak algılayabilir.",
      "Ek belgeler kategoriyle ilişkilendirildiğinde operasyon ekibi daha hızlı kontrol eder.",
    ],
    sections: [
      {
        heading: "Klasör yapısını koruyun",
        body: [
          "Görüntüleme CD'lerinde dosyalar farklı klasörler altında tutulabilir. Bu yapıyı bozmak bazı serilerin eksik görünmesine neden olabilir.",
          "Mümkünse CD veya USB içeriğini bütün olarak seçmek ya da ZIP haline getirerek yüklemek daha tutarlı bir aktarım sağlar.",
        ],
      },
      {
        heading: "Ek belgeleri ayrı ekleyin",
        body: [
          "Radyoloji raporu, epikriz, patoloji veya laboratuvar sonucu gibi belgeler görüntüleme dosyasından ayrı kategorilerle yüklenmelidir.",
          "Bu ayrım, admin triage ve uzman inceleme ekranında bilgilerin daha kolay okunmasını sağlar.",
        ],
      },
    ],
  },
  {
    slug: "uzman-secimi-nasil-yapilir",
    title: "Uzman seçimi nasıl yapılır?",
    excerpt:
      "Hastanın doktor seçebildiği veya seçimi platforma bırakabildiği iki modeli, MVP mantığıyla açıklıyoruz.",
    category: "Uzman Seçimi",
    readTime: "4 dk",
    date: "13 Eylül 2026",
    hero: "/hero/doctor-neuroradiology.webp",
    takeaways: [
      "Hasta doktor profillerini inceleyerek seçim yapabilir.",
      "Alternatif olarak uygun uzman seçimi operasyon ekibine bırakılabilir.",
      "MVP'de otomatik matching yerine manuel operasyon kontrolü tercih edilir.",
    ],
    sections: [
      {
        heading: "Doktor profilinde neye bakılır?",
        body: [
          "Doktor profili sosyal medya profili gibi değil, klinik otoriteyi gösteren sade bir sayfa gibi tasarlanmalıdır. Uzmanlık, alt ilgi alanları, değerlendirdiği görüntüleme türleri ve dil bilgisi öne çıkar.",
          "Gerçek içerik sağlanmadan sahte yayın sayıları, kurum ilişkileri, hasta yorumları veya başarı oranları kullanılmamalıdır.",
        ],
      },
      {
        heading: "Seçimi platforma bırakmak",
        body: [
          "Hasta hangi uzmanın uygun olduğundan emin değilse seçimi Second Opinion operasyon ekibine bırakabilir. MVP'de bu eşleştirme otomatik algoritma ile değil, manuel kontrolle yapılır.",
          "Bu yaklaşım klinik riskleri azaltır ve yanlış uzmanlık alanına yönlendirme ihtimalini daha kontrollü hale getirir.",
        ],
      },
    ],
  },
  {
    slug: "rapor-nasil-teslim-edilir",
    title: "Second opinion raporu nasıl teslim edilir?",
    excerpt:
      "Final raporun neden e-posta eki olarak gönderilmediğini, güvenli hesap erişiminin ve yapılandırılmış rapor formatının önemini anlatıyoruz.",
    category: "Rapor Teslimi",
    readTime: "5 dk",
    date: "13 Eylül 2026",
    hero: "/ui/document-icon.png",
    takeaways: [
      "Final rapor güvenli hesap üzerinden görüntülenir.",
      "PDF teslimi yapılandırılmış rapordan üretilir.",
      "Final rapor sonradan değiştirilecekse yeni versiyon veya addendum mantığı kullanılmalıdır.",
    ],
    sections: [
      {
        heading: "Neden yapılandırılmış rapor?",
        body: [
          "Second opinion raporu serbest bir Word dosyası gibi düşünülmemelidir. Klinik bilgi, inceleme, bulgular, değerlendirme, hastanın sorusuna yanıt, öneriler ve limitasyonlar gibi alanlar raporu daha okunabilir kılar.",
          "Bu yapı, hastanın aradığı netliği artırırken operasyon ve audit süreçlerini de daha kontrollü hale getirir.",
        ],
      },
      {
        heading: "Final rapor neden immutable olmalı?",
        body: [
          "Doktor raporu finalize ettiğinde hasta ile paylaşılan içerik korunmalıdır. Sonradan bir açıklama veya düzeltme gerekiyorsa mevcut raporun üzerine yazmak yerine yeni versiyon veya addendum oluşturmak daha doğru bir ürün davranışıdır.",
        ],
      },
    ],
  },
  {
    slug: "saglik-verileri-nasil-korunur",
    title: "Sağlık verileri dijital ikinci görüş sürecinde nasıl ele alınmalı?",
    excerpt:
      "Güvenli bağlantı, yetkilendirilmiş erişim, audit kayıtları ve kontrollü paylaşım prensiplerini ürün diliyle özetliyoruz.",
    category: "Güvenlik",
    readTime: "6 dk",
    date: "13 Eylül 2026",
    hero: "/illustrations/world-map.png",
    takeaways: [
      "Sağlık verisi hassas veri olarak ele alınmalıdır.",
      "Business status ile technical status birbirine karıştırılmamalıdır.",
      "Rapor ve belge erişimleri audit mantığıyla izlenmelidir.",
    ],
    sections: [
      {
        heading: "Yetkilendirilmiş erişim",
        body: [
          "Hasta, admin ve uzman hekim rolleri aynı bilgilere aynı düzeyde erişmemelidir. Vaka bazlı yetkilendirme, yalnızca gerekli kişinin gerekli bilgiye erişmesini hedefler.",
          "Bu prototip gerçek güvenlik altyapısı uygulamaz; ancak ekran dili ve ürün mimarisi bu prensibe göre şekillendirilmiştir.",
        ],
      },
      {
        heading: "Audit neden önemlidir?",
        body: [
          "Sağlık verisi içeren bir platformda belge görüntüleme, DICOM erişimi, rapor finalize etme, ödeme ve hasta verisi güncelleme gibi kritik işlemler kayıt altına alınmalıdır.",
          "Audit kayıtları normal uygulama ekranlarından ayrı düşünülmeli ve operasyon sonrası denetlenebilirlik sağlamalıdır.",
        ],
      },
    ],
  },
];

export const blogCategories = ["Tümü", ...Array.from(new Set(blogPosts.map((post) => post.category)))];
