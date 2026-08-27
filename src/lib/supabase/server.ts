import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "./database.types";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

// Cliente para Server Components y Route Handlers: catálogo, ficha y
// admin leen Supabase directamente en el servidor.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Ignorable: un Server Component no puede escribir cookies.
          // El middleware de sesión (cuando exista) se encarga de esto.
        }
      },
    },
  });
}
