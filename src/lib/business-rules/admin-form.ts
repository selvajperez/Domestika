import type { AndroidCategory } from "@/types/android";
import type { AndroidInput } from "@/lib/supabase/admin-androids";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string): number | null {
  const value = str(formData, key);
  if (value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function zipRows(a: string[], b: string[]) {
  const rows: { a: string; b: string }[] = [];
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    const first = (a[i] ?? "").trim();
    const second = (b[i] ?? "").trim();
    if (first || second) rows.push({ a: first, b: second });
  }
  return rows;
}

export interface AndroidFormErrors {
  [field: string]: string;
}

export function parseAndroidFormData(formData: FormData): {
  input: AndroidInput;
  errors: AndroidFormErrors;
} {
  const capabilityTitles = formData.getAll("capability_title").map(String);
  const capabilityDescriptions = formData.getAll("capability_description").map(String);
  const specLabels = formData.getAll("spec_label").map(String);
  const specValues = formData.getAll("spec_value").map(String);

  const input: AndroidInput = {
    code: str(formData, "code"),
    name: str(formData, "name"),
    model: str(formData, "model"),
    slug: str(formData, "slug"),
    category: str(formData, "category") as AndroidCategory,
    functionTitle: str(formData, "functionTitle"),
    shortDescription: str(formData, "shortDescription"),
    longDescription: str(formData, "longDescription"),
    personality: str(formData, "personality"),
    quote: str(formData, "quote"),
    purchasePrice: num(formData, "purchasePrice") ?? 0,
    leasingMonthly: num(formData, "leasingMonthly"),
    currency: str(formData, "currency") || "USD",
    purchaseAvailable: bool(formData, "purchaseAvailable"),
    leasingAvailable: bool(formData, "leasingAvailable"),
    stock: num(formData, "stock") ?? 0,
    heightM: num(formData, "heightM"),
    weightKg: num(formData, "weightKg"),
    autonomyHours: num(formData, "autonomyHours"),
    maxAssistanceKg: num(formData, "maxAssistanceKg"),
    voiceRecognition: str(formData, "voiceRecognition"),
    socialInteraction: str(formData, "socialInteraction"),
    connectivity: str(formData, "connectivity"),
    sanitaryLimit: str(formData, "sanitaryLimit") || null,
    requiresSpecializedInstall: bool(formData, "requiresSpecializedInstall"),
    mainImageUrl: str(formData, "mainImageUrl") || null,
    specs: zipRows(specLabels, specValues).map(({ a, b }) => ({ label: a, value: b })),
    capabilities: zipRows(capabilityTitles, capabilityDescriptions).map(({ a, b }) => ({
      title: a,
      description: b,
    })),
    featured: bool(formData, "featured"),
    active: bool(formData, "active"),
  };

  const errors: AndroidFormErrors = {};
  if (!input.code) errors.code = "El código es obligatorio.";
  if (!input.name) errors.name = "El nombre es obligatorio.";
  if (!input.slug) errors.slug = "El slug es obligatorio.";
  if (!input.category) errors.category = "Elegí una categoría.";
  if (!input.functionTitle) errors.functionTitle = "La función es obligatoria.";
  if (input.purchasePrice < 0) errors.purchasePrice = "El precio no puede ser negativo.";
  if (input.stock < 0) errors.stock = "El stock no puede ser negativo.";

  return { input, errors };
}
