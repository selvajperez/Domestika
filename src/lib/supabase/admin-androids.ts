import type { Android, AndroidCapability, AndroidCategory, AndroidSpec } from "@/types/android";
import { createAdminClient } from "./admin-client";
import type { Database } from "./database.types";

type AndroidRow = Database["public"]["Tables"]["androids"]["Row"];
type CapabilityRow = Database["public"]["Tables"]["android_capabilities"]["Row"];

export interface AndroidInput {
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
  heightM: number | null;
  weightKg: number | null;
  autonomyHours: number | null;
  maxAssistanceKg: number | null;
  voiceRecognition: string;
  socialInteraction: string;
  connectivity: string;
  sanitaryLimit: string | null;
  requiresSpecializedInstall: boolean;
  mainImageUrl: string | null;
  specs: AndroidSpec[];
  capabilities: AndroidCapability[];
  featured: boolean;
  active: boolean;
}

function toRow(input: AndroidInput): Database["public"]["Tables"]["androids"]["Insert"] {
  return {
    code: input.code,
    name: input.name,
    model: input.model,
    slug: input.slug,
    category: input.category,
    function_title: input.functionTitle,
    short_description: input.shortDescription,
    long_description: input.longDescription,
    personality: input.personality,
    quote: input.quote || null,
    purchase_price: input.purchasePrice,
    leasing_monthly: input.leasingMonthly,
    currency: input.currency,
    purchase_available: input.purchaseAvailable,
    leasing_available: input.leasingAvailable,
    stock: input.stock,
    height_m: input.heightM,
    weight_kg: input.weightKg,
    autonomy_hours: input.autonomyHours,
    max_assistance_kg: input.maxAssistanceKg,
    voice_recognition: input.voiceRecognition || null,
    social_interaction: input.socialInteraction || null,
    connectivity: input.connectivity || null,
    sanitary_limit: input.sanitaryLimit,
    requires_specialized_install: input.requiresSpecializedInstall,
    main_image_url: input.mainImageUrl,
    specs: input.specs,
    featured: input.featured,
    active: input.active,
  };
}

function mapRow(row: AndroidRow, capabilities: CapabilityRow[]): Android {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    model: row.model,
    slug: row.slug,
    category: row.category,
    functionTitle: row.function_title,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    personality: row.personality,
    quote: row.quote ?? "",
    purchasePrice: row.purchase_price,
    leasingMonthly: row.leasing_monthly,
    currency: row.currency,
    purchaseAvailable: row.purchase_available,
    leasingAvailable: row.leasing_available,
    stock: row.stock,
    heightM: row.height_m ?? 0,
    weightKg: row.weight_kg ?? 0,
    autonomyHours: row.autonomy_hours ?? 0,
    maxAssistanceKg: row.max_assistance_kg,
    voiceRecognition: row.voice_recognition ?? "",
    socialInteraction: row.social_interaction ?? "",
    connectivity: row.connectivity ?? "",
    sanitaryLimit: row.sanitary_limit,
    requiresSpecializedInstall: row.requires_specialized_install,
    mainImageUrl: row.main_image_url,
    gallery: [],
    capabilities: capabilities
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((capability) => ({ title: capability.title, description: capability.description })),
    specs: row.specs,
    featured: row.featured,
    active: row.active,
  };
}

export async function getAllAndroidsAdmin(): Promise<Android[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("androids")
    .select("*, android_capabilities(*)")
    .order("name");

  if (error) throw error;
  return data.map((row) => mapRow(row, row.android_capabilities));
}

export async function getAndroidByIdAdmin(id: string): Promise<Android | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("androids")
    .select("*, android_capabilities(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data, data.android_capabilities) : null;
}

async function replaceCapabilities(androidId: string, capabilities: AndroidCapability[]) {
  const supabase = createAdminClient();
  await supabase.from("android_capabilities").delete().eq("android_id", androidId);
  if (capabilities.length === 0) return;

  const { error } = await supabase.from("android_capabilities").insert(
    capabilities.map((capability, index) => ({
      android_id: androidId,
      title: capability.title,
      description: capability.description,
      sort_order: index,
    })),
  );
  if (error) throw error;
}

export async function createAndroidRecord(input: AndroidInput): Promise<string> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("androids").insert(toRow(input)).select("id").single();
  if (error) throw error;

  await replaceCapabilities(data.id, input.capabilities);
  return data.id;
}

export async function updateAndroidRecord(id: string, input: AndroidInput): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("androids").update(toRow(input)).eq("id", id);
  if (error) throw error;

  await replaceCapabilities(id, input.capabilities);
}

export async function setAndroidActive(id: string, active: boolean): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("androids").update({ active }).eq("id", id);
  if (error) throw error;
}

export async function deleteAndroidRecord(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("androids").delete().eq("id", id);
  if (error) throw error;
}
