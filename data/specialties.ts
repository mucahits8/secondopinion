import { Bone, Brain, CircleDot, HeartPulse, Network, ScanLine, ShieldCheck, Stethoscope, type LucideIcon } from "lucide-react";

export type SpecialtyKey =
  | "brain-spine"
  | "musculoskeletal"
  | "breast"
  | "chest"
  | "abdomen"
  | "oncology"
  | "vascular"
  | "secure-process";

export const specialtyAssets: Record<SpecialtyKey, { icon: LucideIcon; image?: string }> = {
  "brain-spine": { icon: Brain, image: "/specialties/specialty-brain.png" },
  musculoskeletal: { icon: Bone, image: "/specialties/specialty-ortho.png" },
  breast: { icon: CircleDot },
  chest: { icon: HeartPulse },
  abdomen: { icon: Stethoscope },
  oncology: { icon: Network },
  vascular: { icon: ScanLine },
  "secure-process": { icon: ShieldCheck },
};

export const specialtyKeys = Object.keys(specialtyAssets) as SpecialtyKey[];
