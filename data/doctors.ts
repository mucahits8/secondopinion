export type Doctor = {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  subspecialty: string;
  image: string;
  intro: string;
  experience: string;
  education: string[];
  interests: string[];
  languages: string[];
  modalities: string[];
  reviewTime: string;
};

export const doctors: Doctor[] = [
  {
    slug: "mehmet-kaya",
    name: "Mehmet Kaya",
    title: "Prof. Dr.",
    specialty: "Nöroradyoloji",
    subspecialty: "Beyin ve omurga görüntüleme",
    image: "/hero/doctor-neuroradiology.webp",
    intro:
      "Beyin, omurga ve baş-boyun görüntülemelerinde akademik deneyime sahip demonstrasyon uzmanı.",
    experience: "Klinik ve akademik değerlendirme deneyimi",
    education: ["Radyoloji uzmanlık eğitimi", "Nöroradyoloji odaklı akademik çalışmalar"],
    interests: ["Beyin MR", "Omurga MR", "Tümor takibi", "Vaskuler görüntüleme"],
    languages: ["Turkce", "Ingilizce"],
    modalities: ["MR", "BT", "Anjiyografi"],
    reviewTime: "Operasyon onayı sonrası netleşir",
  },
  {
    slug: "ayse-demir",
    name: "Ayse Demir",
    title: "Prof. Dr.",
    specialty: "Kas-iskelet Radyolojisi",
    subspecialty: "Eklem, spor yaralanmaları ve omurga",
    image: "/doctors/doctor-01.webp",
    intro:
      "Kas-iskelet sistemi görüntülemelerinde uzmanlaşmış demonstrasyon hekimi.",
    experience: "Kas-iskelet görüntüleme deneyimi",
    education: ["Radyoloji uzmanlık eğitimi", "Kas-iskelet görüntüleme programları"],
    interests: ["Diz MR", "Omuz MR", "Spor yaralanmaları", "Yumuşak doku"],
    languages: ["Turkce", "Ingilizce"],
    modalities: ["MR", "BT", "Rontgen"],
    reviewTime: "Operasyon onayı sonrası netleşir",
  },
  {
    slug: "selin-aras",
    name: "Selin Aras",
    title: "Doc. Dr.",
    specialty: "Meme Görüntüleme",
    subspecialty: "Mamografi, meme MR ve ultrason",
    image: "/doctors/doctor-03.webp",
    intro:
      "Meme görüntüleme ve girişimsel radyoloji alanında demonstrasyon profili.",
    experience: "Meme görüntüleme deneyimi",
    education: ["Radyoloji uzmanlık eğitimi", "Meme görüntüleme odaklı eğitim"],
    interests: ["Mamografi", "Meme MR", "Tarama bulgulari", "Takip incelemeleri"],
    languages: ["Turkce", "Ingilizce"],
    modalities: ["Mamografi", "MR", "Ultrason"],
    reviewTime: "Operasyon onayı sonrası netleşir",
  },
  {
    slug: "emre-sahin",
    name: "Emre Sahin",
    title: "Doc. Dr.",
    specialty: "Toraks Radyolojisi",
    subspecialty: "Göğüs BT ve onkolojik takip",
    image: "/doctors/doctor-02.webp",
    intro:
      "Göğüs görüntüleme ve takip incelemelerinde demonstrasyon uzman profili.",
    experience: "Toraks görüntüleme deneyimi",
    education: ["Radyoloji uzmanlık eğitimi", "Toraks görüntüleme klinik programları"],
    interests: ["Göğüs BT", "Nodül takibi", "Onkolojik görüntüleme", "PET/CT korelasyonu"],
    languages: ["Turkce", "Ingilizce"],
    modalities: ["BT", "PET/CT", "Rontgen"],
    reviewTime: "Operasyon onayı sonrası netleşir",
  },
];
