import Link from "next/link";
import { Plus } from "lucide-react";

import { getAllAndroidsForAdmin, isAdminConfigured } from "@/lib/data/androids";
import { AndroidTable } from "@/components/admin/android-table";
import { ReadOnlyBanner } from "@/components/admin/read-only-banner";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin — DOMÉSTIKA",
};

export default async function AdminPage() {
  const androids = await getAllAndroidsForAdmin();
  const sorted = [...androids].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const readOnly = !isAdminConfigured();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight">
            Administración de androides
          </h1>
          <p className="text-neutral-500">
            {sorted.length} androides · alta, edición, activación y baja del catálogo.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/nuevo">
            <Plus className="size-4" /> Nuevo androide
          </Link>
        </Button>
      </div>

      <p className="mb-8 border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-xs text-brand-red">
        Sin autenticación todavía (permitido en desarrollo por la spec, sección 13). Antes de
        publicar en Vercel, esta ruta debe protegerse con Supabase Auth.
      </p>

      {readOnly && <ReadOnlyBanner />}

      <AndroidTable androids={sorted} readOnly={readOnly} />
    </div>
  );
}
