export type AndroidCategory =
  | "cuidados"
  | "limpieza"
  | "jardineria"
  | "seguridad"
  | "compania"
  | "entretenimiento"
  | "asistencia";

export type AcquisitionMode = "compra" | "leasing";

export interface AndroidCapability {
  title: string;
  description: string;
}

export interface AndroidSpec {
  label: string;
  value: string;
}

export interface AndroidGalleryImage {
  url: string;
  alt: string;
  order: number;
}

// Mirrors the `androids` table defined in the technical spec (section 7.1),
// plus the auxiliary capability/spec tables (7.2) nested for convenience
// until they are split out in Supabase.
export interface Android {
  id: string;
  code: string;
  name: string;
  model: string;
  slug: string;
  category: AndroidCategory;
  functionTitle: string;
  shortDescription: string;
  longDescription: string;
  personality: string;
  quote: string;

  purchasePrice: number;
  leasingMonthly: number | null;
  currency: string;
  purchaseAvailable: boolean;
  leasingAvailable: boolean;
  stock: number;

  heightM: number;
  weightKg: number;
  autonomyHours: number;
  maxAssistanceKg: number | null;
  voiceRecognition: string;
  socialInteraction: string;
  connectivity: string;
  sanitaryLimit: string | null;
  requiresSpecializedInstall: boolean;

  mainImageUrl: string | null;
  gallery: AndroidGalleryImage[];

  capabilities: AndroidCapability[];
  specs: AndroidSpec[];

  featured: boolean;
  active: boolean;
}

export const ANDROID_CATEGORY_LABELS: Record<AndroidCategory, string> = {
  cuidados: "Cuidados",
  limpieza: "Limpieza",
  jardineria: "Jardinería",
  seguridad: "Seguridad",
  compania: "Compañía",
  entretenimiento: "Entretenimiento",
  asistencia: "Asistencia",
};
