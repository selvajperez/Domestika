import { createAndroidAction } from "@/app/admin/actions";
import { isAdminConfigured } from "@/lib/data/androids";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { ReadOnlyBanner } from "@/components/admin/read-only-banner";

export const metadata = {
  title: "Nuevo androide — Admin DOMÉSTIKA",
};

export default async function NewAndroidPage() {
  const readOnly = !isAdminConfigured();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 font-display text-3xl font-black uppercase tracking-tight">
        Nuevo androide
      </h1>
      <p className="mb-8 text-neutral-500">Completá la ficha para publicar un androide nuevo.</p>

      {readOnly && <ReadOnlyBanner />}

      <AdminProductForm action={createAndroidAction} submitLabel="Crear androide" readOnly={readOnly} />
    </div>
  );
}
