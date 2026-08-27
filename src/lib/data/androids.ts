import type { Android } from "@/types/android";
import { ANDROIDS } from "@/data/seed/androids";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

// El admin necesita además la service role key para poder escribir
// (las políticas RLS solo permiten lectura pública de androides activos).
export function isAdminConfigured() {
  return isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Fuente única para el catálogo: usa Supabase en cuanto las variables de
// entorno estén configuradas (ver README) y cae al seed local mientras
// tanto, para poder seguir construyendo sin depender de un proyecto real.
export async function getAllAndroids(): Promise<Android[]> {
  if (isSupabaseConfigured()) {
    const { getAndroids } = await import("@/lib/supabase/androids");
    return getAndroids();
  }
  return ANDROIDS.filter((android) => android.active);
}

export async function getFeaturedAndroids(): Promise<Android[]> {
  const androids = await getAllAndroids();
  return androids.filter((android) => android.featured);
}

export async function getAndroidBySlug(slug: string): Promise<Android | null> {
  const androids = await getAllAndroids();
  return androids.find((android) => android.slug === slug) ?? null;
}

// Para el admin: incluye androides inactivos. Sin service role key
// configurada, muestra el seed local completo en modo solo lectura.
export async function getAllAndroidsForAdmin(): Promise<Android[]> {
  if (isAdminConfigured()) {
    const { getAllAndroidsAdmin } = await import("@/lib/supabase/admin-androids");
    return getAllAndroidsAdmin();
  }
  return ANDROIDS;
}

export async function getAndroidByIdForAdmin(id: string): Promise<Android | null> {
  if (isAdminConfigured()) {
    const { getAndroidByIdAdmin } = await import("@/lib/supabase/admin-androids");
    return getAndroidByIdAdmin(id);
  }
  return ANDROIDS.find((android) => android.id === id) ?? null;
}
