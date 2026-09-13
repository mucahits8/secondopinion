import { Bone, Brain, CircleDot, HeartPulse, Network, ScanLine, ShieldCheck, Stethoscope } from "lucide-react";

export const specialties = [
  {
    title: "Beyin ve Omurga",
    description: "Beyin MR, omurga MR, baş-boyun ve sinir sistemi görüntülemeleri.",
    icon: Brain,
    image: "/specialties/specialty-brain.png",
  },
  {
    title: "Kas-iskelet",
    description: "Eklem, kemik, yumuşak doku, spor yaralanmaları ve omurga.",
    icon: Bone,
    image: "/specialties/specialty-ortho.png",
  },
  {
    title: "Meme",
    description: "Mamografi, meme MR ve takip amaçlı görüntülemeler.",
    icon: CircleDot,
  },
  {
    title: "Göğüs",
    description: "Göğüs BT, akciğer nodül takibi ve toraks incelemeleri.",
    icon: HeartPulse,
  },
  {
    title: "Abdomen",
    description: "Karaciğer, pankreas, böbrek ve batın görüntülemeleri.",
    icon: Stethoscope,
  },
  {
    title: "Onkolojik Görüntüleme",
    description: "PET/CT, takip incelemeleri ve tedavi yanıtı değerlendirmeleri.",
    icon: Network,
  },
  {
    title: "Vaskuler",
    description: "BT anjiyografi, MR anjiyografi ve damar görüntülemeleri.",
    icon: ScanLine,
  },
  {
    title: "Güvenli Süreç",
    description: "Yetkilendirilmiş erişim ve vaka bazlı kontrollü paylaşım.",
    icon: ShieldCheck,
  },
];
