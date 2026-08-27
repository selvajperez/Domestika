"use client";

import { useActionState } from "react";

import type { Android } from "@/types/android";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";
import type { AndroidFormState } from "@/app/admin/actions";
import { RepeatableFieldList } from "./repeatable-field-list";
import { Button } from "@/components/ui/button";

const CATEGORY_OPTIONS = Object.entries(ANDROID_CATEGORY_LABELS);

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-brand-red">{error}</span>}
    </label>
  );
}

const inputClass =
  "border border-black/15 px-3 py-2 text-sm outline-none focus:border-black disabled:bg-neutral-100 disabled:text-neutral-400";

export function AdminProductForm({
  android,
  action,
  submitLabel,
  readOnly,
}: {
  android?: Android;
  action: (prevState: AndroidFormState, formData: FormData) => Promise<AndroidFormState>;
  submitLabel: string;
  readOnly: boolean;
}) {
  const [state, formAction, pending] = useActionState<AndroidFormState, FormData>(action, {
    errors: {},
  });

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <fieldset disabled={readOnly || pending} className="flex flex-col gap-10">
        {state.submitError && (
          <p className="border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
            {state.submitError}
          </p>
        )}
        {state.success && (
          <p className="border border-green-600/30 bg-green-50 px-4 py-3 text-sm text-green-700">
            Cambios guardados.
          </p>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Código" error={state.errors.code}>
            <input name="code" defaultValue={android?.code} className={inputClass} />
          </Field>
          <Field label="Nombre" error={state.errors.name}>
            <input name="name" defaultValue={android?.name} className={inputClass} />
          </Field>
          <Field label="Modelo">
            <input name="model" defaultValue={android?.model} className={inputClass} />
          </Field>
          <Field label="Slug" error={state.errors.slug}>
            <input name="slug" defaultValue={android?.slug} className={inputClass} />
          </Field>
          <Field label="Categoría" error={state.errors.category}>
            <select name="category" defaultValue={android?.category} className={inputClass}>
              <option value="">Elegir…</option>
              {CATEGORY_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Función" error={state.errors.functionTitle}>
            <input name="functionTitle" defaultValue={android?.functionTitle} className={inputClass} />
          </Field>
          <Field label="Frase / quote">
            <input name="quote" defaultValue={android?.quote} className={inputClass} />
          </Field>
        </section>

        <section className="grid gap-4">
          <Field label="Descripción corta">
            <textarea
              name="shortDescription"
              defaultValue={android?.shortDescription}
              rows={2}
              className={inputClass}
            />
          </Field>
          <Field label="Descripción larga">
            <textarea
              name="longDescription"
              defaultValue={android?.longDescription}
              rows={4}
              className={inputClass}
            />
          </Field>
          <Field label="Perfil / personalidad">
            <textarea
              name="personality"
              defaultValue={android?.personality}
              rows={3}
              className={inputClass}
            />
          </Field>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Precio de compra (USD)" error={state.errors.purchasePrice}>
            <input
              type="number"
              step="0.01"
              name="purchasePrice"
              defaultValue={android?.purchasePrice}
              className={inputClass}
            />
          </Field>
          <Field label="Leasing mensual (USD)">
            <input
              type="number"
              step="0.01"
              name="leasingMonthly"
              defaultValue={android?.leasingMonthly ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Moneda">
            <input name="currency" defaultValue={android?.currency ?? "USD"} className={inputClass} />
          </Field>
          <Field label="Stock" error={state.errors.stock}>
            <input
              type="number"
              name="stock"
              defaultValue={android?.stock ?? 0}
              className={inputClass}
            />
          </Field>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="purchaseAvailable"
              defaultChecked={android?.purchaseAvailable ?? true}
              className="accent-brand-red"
            />
            Disponible para compra
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="leasingAvailable"
              defaultChecked={android?.leasingAvailable ?? false}
              className="accent-brand-red"
            />
            Disponible para leasing
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={android?.featured ?? false}
              className="accent-brand-red"
            />
            Destacado en Home
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="active"
              defaultChecked={android?.active ?? true}
              className="accent-brand-red"
            />
            Activo (visible en catálogo)
          </label>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Altura (m)">
            <input
              type="number"
              step="0.01"
              name="heightM"
              defaultValue={android?.heightM ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Peso (kg)">
            <input
              type="number"
              step="0.1"
              name="weightKg"
              defaultValue={android?.weightKg ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Autonomía (h)">
            <input
              type="number"
              name="autonomyHours"
              defaultValue={android?.autonomyHours ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Asistencia física máx. (kg)">
            <input
              type="number"
              step="0.1"
              name="maxAssistanceKg"
              defaultValue={android?.maxAssistanceKg ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Reconocimiento de voz">
            <input name="voiceRecognition" defaultValue={android?.voiceRecognition} className={inputClass} />
          </Field>
          <Field label="Interacción social">
            <input name="socialInteraction" defaultValue={android?.socialInteraction} className={inputClass} />
          </Field>
          <Field label="Conectividad">
            <input name="connectivity" defaultValue={android?.connectivity} className={inputClass} />
          </Field>
          <Field label="Límite sanitario">
            <input name="sanitaryLimit" defaultValue={android?.sanitaryLimit ?? ""} className={inputClass} />
          </Field>
          <Field label="Imagen principal (URL)">
            <input name="mainImageUrl" defaultValue={android?.mainImageUrl ?? ""} className={inputClass} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="requiresSpecializedInstall"
              defaultChecked={android?.requiresSpecializedInstall ?? false}
              className="accent-brand-red"
            />
            Requiere instalación especializada
          </label>
        </section>

        <RepeatableFieldList
          title="Funciones principales"
          fieldAName="capability_title"
          fieldBName="capability_description"
          placeholderA="Título"
          placeholderB="Descripción"
          initialRows={(android?.capabilities ?? []).map((c) => ({ a: c.title, b: c.description }))}
        />

        <RepeatableFieldList
          title="Especificaciones técnicas"
          fieldAName="spec_label"
          fieldBName="spec_value"
          placeholderA="Etiqueta"
          placeholderB="Valor"
          initialRows={(android?.specs ?? []).map((s) => ({ a: s.label, b: s.value }))}
        />

        <div>
          <Button type="submit" size="lg">
            {pending ? "Guardando…" : submitLabel}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
