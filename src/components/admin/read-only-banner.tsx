import { AlertTriangle } from "lucide-react";

export function ReadOnlyBanner() {
  return (
    <div className="mb-8 flex items-start gap-3 border border-amber-400/40 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <p>
        Modo solo lectura: el catálogo que ves acá es el seed local. Para habilitar alta, edición
        y baja de androides completá <code>.env.local</code> con las credenciales del proyecto
        Supabase, incluida <code>SUPABASE_SERVICE_ROLE_KEY</code> (ver README, Fase 4).
      </p>
    </div>
  );
}
