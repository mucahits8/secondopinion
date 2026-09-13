export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  hero: string;
  featured?: boolean;
  takeaways: string[];
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const blogSlugs = [
  "second-opinion-nedir",
  "dicom-dosyasi-nedir",
  "goruntuleme-yuklerken-nelere-dikkat-edilmeli",
  "uzman-secimi-nasil-yapilir",
  "rapor-nasil-teslim-edilir",
  "saglik-verileri-nasil-korunur",
] as const;
