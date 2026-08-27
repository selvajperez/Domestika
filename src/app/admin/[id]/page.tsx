import { notFound } from "next/navigation";

import { updateAndroidAction } from "@/app/admin/actions";
import { getAndroidByIdForAdmin, isAdminConfigured } from "@/lib/data/androids";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { ReadOnlyBanner } from "@/components/admin/read-only-banner";

export default async function EditAndroidPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const android = await getAndroidByIdForAdmin(id);
  if (!android) notFound();

  const readOnly = !isAdminConfigured();
  const boundAction = updateAndroidAction.bind(null, id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 font-display text-3xl font-black uppercase tracking-tight">
        Editar · {android.name}
      </h1>
      <p className="mb-8 text-neutral-500">{android.code}</p>

      {readOnly && <ReadOnlyBanner />}

      <AdminProductForm
        android={android}
        action={boundAction}
        submitLabel="Guardar cambios"
        readOnly={readOnly}
      />
    </div>
  );
}
