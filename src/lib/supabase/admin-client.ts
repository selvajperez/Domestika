import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";
import { getSupabaseUrl } from "./env";

// Cliente con la service role key: bypassa RLS. SOLO para Server
// Actions/route handlers del admin (spec sección 13: sin auth de
// cliente todavía, protegido más adelante con Supabase Auth). Nunca
// importar este módulo desde un componente "use client".
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY. Completá .env.local con la service role key " +
        "del proyecto (Settings → API) para habilitar el admin.",
    );
  }

  return createSupabaseClient<Database>(getSupabaseUrl(), serviceRoleKey, {
    auth: { persistSession: false },
  });
}
