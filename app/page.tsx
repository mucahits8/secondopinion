import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, ShieldCheck, UploadCloud, UserRound, UsersRound, type LucideIcon } from "lucide-react";
import { SiteHeader, Footer } from "@/components/site-chrome";
import { DoctorCard, SectionHeader, SpecialtyCard, TrustItem } from "@/components/cards";
import { CaseJourneyTimeline, DicomUploadDemo, FAQAccordion, ReportPreview, SecurityFeature } from "@/components/interactive";
import { HeroMedicalWorkspace } from "@/components/hero-medical-workspace";
import { doctors } from "@/data/doctors";
import { specialties } from "@/data/specialties";

export default function Home() {
  const steps: Array<[LucideIcon, string, string]> = [
    [UploadCloud, "1. Görüntülerinizi Yükleyin", "MR, BT, PET/CT ve diğer görüntüleme dosyalarınızı güvenle yükleyin."],
    [UserRound, "2. Uzmanınızı Seçin", "İhtiyacınıza uygun uzmanı görüntüleyin veya seçimi bize bırakın."],
    [ClipboardCheck, "3. Uzman Değerlendirsin", "Uzman hekiminiz görüntülerinizi ve klinik bilgilerinizi incelesin."],
    [FileText, "4. Second Opinion'inizi Alin", "Uzman raporunu güvenli hesabınızdan görüntüleyin."],
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 medical-glow opacity-80" />
          <div className="container-shell relative grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
            <div className="reveal">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--blue)]">Uzman görüşü, daha güvenli kararlar</p>
              <h1 className="mt-6 max-w-[620px] text-[42px] font-bold leading-[1.08] tracking-normal text-[var(--navy)] md:text-[62px]">
                Tıbbi görüntülemeleriniz için uzman bir görüş daha.
              </h1>
              <p className="mt-5 max-w-[590px] text-lg leading-8 text-[var(--text-secondary)]">
                MR, BT, PET/CT ve diğer tıbbi görüntülemelerinizi güvenle yükleyin, alanında uzman hekimlerden çevrimiçi ikinci bir görüş alın.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/app/cases/new" className="btn-primary arrow-nudge">
                  İkinci Görüş Al <ArrowRight size={17} />
                </Link>
                <Link href="/how-it-works" className="btn-secondary">
                  Nasıl Çalışır?
                </Link>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                <TrustItem icon={UsersRound} title="Uzman hekimler" text="Alaninda deneyimli" />
                <TrustItem icon={ShieldCheck} title="Güvenli görüntü transferi" text="Korunan sağlık verileri" />
                <TrustItem icon={FileText} title="Online rapor teslimi" text="Hızlı ve güvenilir" />
              </div>
            </div>
            <HeroMedicalWorkspace />
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-white py-6">
          <div className="container-shell grid gap-4 md:grid-cols-4">
            {["DICOM odakli yükleme", "Vaka bazli süreç takibi", "Yapilandirilmis uzman raporu", "Kontrollu veri paylaşımi"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-bold text-[var(--navy)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--blue)]" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell">
            <SectionHeader title="Nasıl Çalışır?" text="Dort basit adımda uzman görüşüne ulasin." action={{ label: "Tüm süreci detayli ogrenin", href: "/how-it-works" }} />
            <div className="grid gap-5 md:grid-cols-4">
              {steps.map(([Icon, title, text]) => (
                <article key={title} className="surface-card rounded-[12px] p-6">
                  <Icon className="mb-7 rounded-full bg-[var(--pale-blue)] p-3 text-[var(--blue)]" size={58} strokeWidth={1.6} />
                  <h3 className="text-lg font-bold text-[var(--navy)]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-[var(--background)]">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">Neden Second Opinion?</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--navy)] md:text-[42px]">
                Sagliginizla ilgili onemli bir kararda, bir görüş daha fark yaratabilir.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                Platform hasta için basit görünür; arka planda vaka yönetimi, görüntü hazırlığı, uzman ataması, rapor versiyonlama ve audit mantığı birlikte çalışır.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Uzmanlık", "Vakalar ilgili alanda deneyimli uzmanlara yonlendirilir."],
                ["Erisim", "Cografi sinirlarin otesinde uzman perspektifine ulasilabilir."],
                ["Netlik", "Mevcut görüntüleriniz farklı bir uzman bakışıyla tekrar değerlendirilir."],
                ["Süreç", "Başvurunuzun hangi asamada oldugunu her zaman gorebilirsiniz."],
              ].map(([title, text]) => (
                <div key={title} className="surface-card rounded-[12px] p-6">
                  <h3 className="font-bold text-[var(--navy)]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell">
            <SectionHeader title="Uzmanlarımız" text="Alaninda uzman, deneyimli hekim kadromuzla yaninizdayiz." action={{ label: "Tüm uzmanlarimizi görüntüleyin", href: "/doctors" }} />
            <div className="grid gap-5 lg:grid-cols-3">
              {doctors.slice(0, 3).map((doctor) => (
                <DoctorCard key={doctor.slug} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-20">
          <div className="container-shell">
            <SectionHeader title="Uzmanlık Alanları" text="İhtiyacınıza uygun uzmanlık alanında ikinci bir görüş alın." action={{ label: "Tüm uzmanlık alanlarını görüntüleyin", href: "/specialties" }} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {specialties.slice(0, 6).map((specialty) => (
                <SpecialtyCard key={specialty.title} {...specialty} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-[#f2f7fb]">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeader eyebrow="Görüntü hazırlama" title="DICOM yükleme deneyimi hasta için sade, sistem için kontrollü." text="Hasta yalnızca dosyalarını seçer. Sistem arka planda dosya yapısını, çalışma bilgisini ve viewer hazırlığını adım adım kontrol eder." />
              <Image src="/illustrations/radiology-workspace.webp" alt="Radyoloji çalışma ortami" width={620} height={420} className="rounded-[14px] border border-[var(--border)] shadow-[var(--shadow-soft)]" />
            </div>
            <DicomUploadDemo />
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell">
            <SectionHeader eyebrow="Vaka yolculuğu" title="Hasta süreci teknik durumlar yerine anlaşılır adımlarla takip eder." text="Karmaşık klinik ve teknik süreçler, hasta ekranında yalnızca bir sonraki aksiyonu gösteren sade bir yolculuğa dönüşür." />
            <CaseJourneyTimeline />
          </div>
        </section>

        <section className="section-space bg-[var(--background)]">
          <div className="container-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <ReportPreview />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">Uzman raporu</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--navy)] md:text-[40px]">
                Serbest metin değil, yapilandirilmis ve okunabilir uzman görüşü.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                Final rapor klinik bilgi, bulgular, değerlendirme, hastanın sorusuna yanıt, öneriler ve limitasyonlar gibi bölümlerle sunulur. Bu prototip gerçek tanı metni içermez.
              </p>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell rounded-[14px] bg-[var(--pale-blue)] p-8 md:p-10">
            <SectionHeader title="Sağlık verileriniz hassastir. Biz de oyle davraniyoruz." text="Gercek altyapi tamamlandikca teknik ve hukuki ifadeler netlestirilecek; bu prototipte abartili sertifika veya garanti iddialari kullanilmadi." />
            <div className="grid gap-6 md:grid-cols-4">
              <SecurityFeature title="Güvenli bağlantı" text="Hassas veri aktarımı için güvenli kanal varsayımı." />
              <SecurityFeature title="Yetkilendirilmiş erişim" text="Vaka bilgileri yalnızca gerekli rollerle eşleşir." />
              <SecurityFeature title="İşlem kayıtları" text="Kritik aksiyonlar audit mantığına uygun tasarlanır." />
              <SecurityFeature title="Kontrollü paylaşım" text="Rapor hesaptan erişilir; e-posta eki olarak dağıtılmaz." />
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--blue)]">Hasta için değer</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--navy)] md:text-[52px]">
                Daha fazla bilgi değil. Daha fazla netlik.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                İkinci görüş, mevcut tıbbi görüntüleme ve klinik bilgileriniz uzerinden baska bir uzman perspektifi almanizi saglar; sonuc garantisi vermez.
              </p>
            </div>
            <FAQAccordion />
          </div>
        </section>

        <section className="bg-white pb-16">
          <div className="container-shell flex flex-col gap-8 rounded-[14px] border border-[var(--border)] bg-gradient-to-r from-[#f8fbfe] to-[#eef6fc] p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-[var(--navy)]">
              Görüntülerinizi güvenle yükleyin, uzman görüşünüzü çevrimiçi alın.
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/app/cases/new" className="btn-primary arrow-nudge">
                İkinci Görüş Al <ArrowRight size={17} />
              </Link>
              <Link href="/doctors" className="btn-secondary">
                Uzmanlari Incele
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
