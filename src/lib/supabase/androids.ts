import type { Android } from "@/types/android";
import { createClient } from "./server";
import type { Database } from "./database.types";

type AndroidRow = Database["public"]["Tables"]["androids"]["Row"];
type CapabilityRow = Database["public"]["Tables"]["android_capabilities"]["Row"];
type GalleryRow = Database["public"]["Tables"]["android_gallery"]["Row"];

type AndroidRowWithRelations = AndroidRow & {
  android_capabilities: CapabilityRow[];
  android_gallery: GalleryRow[];
};

function mapRowToAndroid(row: AndroidRowWithRelations): Android {
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
    gallery: row.android_gallery
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => ({ url: image.url, alt: image.alt, order: image.sort_order })),

    capabilities: row.android_capabilities
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((capability) => ({ title: capability.title, description: capability.description })),
    specs: row.specs,

    featured: row.featured,
    active: row.active,
  };
}

const ANDROID_SELECT = "*, android_capabilities(*), android_gallery(*)";

export async function getAndroids(): Promise<Android[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("androids")
    .select(ANDROID_SELECT)
    .eq("active", true)
    .order("name");

  if (error) throw error;
  return (data as AndroidRowWithRelations[]).map(mapRowToAndroid);
}

export async function getFeaturedAndroids(): Promise<Android[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("androids")
    .select(ANDROID_SELECT)
    .eq("active", true)
    .eq("featured", true)
    .order("name");

  if (error) throw error;
  return (data as AndroidRowWithRelations[]).map(mapRowToAndroid);
}

export async function getAndroidBySlug(slug: string): Promise<Android | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("androids")
    .select(ANDROID_SELECT)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRowToAndroid(data as AndroidRowWithRelations) : null;
}
