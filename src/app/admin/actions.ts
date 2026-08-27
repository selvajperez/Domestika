"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseAndroidFormData, type AndroidFormErrors } from "@/lib/business-rules/admin-form";
import { isAdminConfigured } from "@/lib/data/androids";
import {
  createAndroidRecord,
  deleteAndroidRecord,
  setAndroidActive,
  updateAndroidRecord,
} from "@/lib/supabase/admin-androids";

export interface AndroidFormState {
  errors: AndroidFormErrors;
  submitError?: string;
  success?: boolean;
}

function revalidateCatalog() {
  revalidatePath("/admin");
  revalidatePath("/androides");
  revalidatePath("/");
}

export async function createAndroidAction(
  _prevState: AndroidFormState,
  formData: FormData,
): Promise<AndroidFormState> {
  if (!isAdminConfigured()) {
    return {
      errors: {},
      submitError:
        "El admin está en modo solo lectura: falta configurar Supabase (ver README, Fase 4).",
    };
  }

  const { input, errors } = parseAndroidFormData(formData);
  if (Object.keys(errors).length > 0) return { errors };

  let id: string;
  try {
    id = await createAndroidRecord(input);
  } catch (error) {
    return { errors: {}, submitError: (error as Error).message };
  }

  revalidateCatalog();
  redirect(`/admin/${id}`);
}

export async function updateAndroidAction(
  id: string,
  _prevState: AndroidFormState,
  formData: FormData,
): Promise<AndroidFormState> {
  if (!isAdminConfigured()) {
    return {
      errors: {},
      submitError:
        "El admin está en modo solo lectura: falta configurar Supabase (ver README, Fase 4).",
    };
  }

  const { input, errors } = parseAndroidFormData(formData);
  if (Object.keys(errors).length > 0) return { errors };

  try {
    await updateAndroidRecord(id, input);
  } catch (error) {
    return { errors: {}, submitError: (error as Error).message };
  }

  revalidateCatalog();
  revalidatePath(`/admin/${id}`);
  return { errors: {}, success: true };
}

export async function toggleActiveAction(id: string, active: boolean) {
  if (!isAdminConfigured()) return;
  await setAndroidActive(id, active);
  revalidateCatalog();
}

export async function deleteAndroidAction(id: string) {
  if (!isAdminConfigured()) return;
  await deleteAndroidRecord(id);
  revalidateCatalog();
}
