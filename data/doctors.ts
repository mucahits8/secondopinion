export type DoctorSlug = "mehmet-kaya" | "ayse-demir" | "selin-aras" | "emre-sahin";

export type LocalizedDoctor = {
  slug: DoctorSlug;
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

export const doctorAssets: Record<DoctorSlug, { slug: DoctorSlug; image: string }> = {
  "mehmet-kaya": { slug: "mehmet-kaya", image: "/hero/doctor-neuroradiology.webp" },
  "ayse-demir": { slug: "ayse-demir", image: "/doctors/doctor-01.webp" },
  "selin-aras": { slug: "selin-aras", image: "/doctors/doctor-03.webp" },
  "emre-sahin": { slug: "emre-sahin", image: "/doctors/doctor-02.webp" },
};

export const doctorSlugs = Object.keys(doctorAssets) as DoctorSlug[];
