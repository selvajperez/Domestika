import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BatteryCharging, Radio, Ruler, Weight } from "lucide-react";

import { getAndroidBySlug } from "@/lib/data/androids";
import { ANDROID_CATEGORY_LABELS } from "@/types/android";
import { Badge } from "@/components/ui/badge";
import { PlaceholderPortrait } from "@/components/product/placeholder-portrait";
import { PurchasePanel } from "@/components/product/purchase-panel";

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const android = await getAndroidBySlug(slug);
  if (!android) return { title: "Androide no encontrado — DOMÉSTIKA" };

  return {
    title: `${android.name} — DOMÉSTIKA`,
    description: android.shortDescription,
  };
}

export default async function AndroidDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const android = await getAndroidBySlug(slug);

  if (!android) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
        <Link href="/androides" className="hover:text-black">
          Catálogo
        </Link>
        <span>/</span>
        <Link href={`/androides?categoria=${android.category}`} className="hover:text-black">
          {ANDROID_CATEGORY_LABELS[android.category]}
        </Link>
        <span>/</span>
        <span className="text-black">{android.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="relative">
            <PlaceholderPortrait
              label={android.name}
              code={android.code}
              className="aspect-[4/5]"
              dark
            />
            <Badge className="absolute left-4 top-4">
              {ANDROID_CATEGORY_LABELS[android.category]}
            </Badge>
          </div>
          {android.quote && (
            <blockquote className="border-l-4 border-brand-red bg-black px-6 py-5 font-display text-xl font-black uppercase italic text-white">
              &ldquo;{android.quote}&rdquo;
            </blockquote>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">
              {android.functionTitle}
            </p>
            <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
              {android.name}
            </h1>
            <p className="mt-1 text-sm text-neutral-400">
              {android.code} / {android.model}
            </p>
            <p className="mt-4 text-neutral-600">{android.shortDescription}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatBox label="Autonomía" value={`${android.autonomyHours} h`} />
            <StatBox label="Estado" value={android.stock > 0 ? "Operativa" : "Sin stock"} />
            <StatBox label="Altura" value={`${android.heightM} m`} />
            <StatBox label="Peso" value={`${android.weightKg} kg`} />
          </div>

          <PurchasePanel android={android} />
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-5 flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
            <span className="h-5 w-1 bg-brand-red" />
            Funciones principales
          </h2>
          <ul className="flex flex-col gap-4">
            {android.capabilities.map((capability) => (
              <li key={capability.title} className="border-b border-black/10 pb-4">
                <p className="text-sm font-bold uppercase tracking-wide">{capability.title}</p>
                <p className="text-sm text-neutral-500">{capability.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-5 flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
            <span className="h-5 w-1 bg-brand-red" />
            Especificaciones técnicas
          </h2>
          <dl className="flex flex-col">
            {android.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between border-b border-black/10 py-3 text-sm"
              >
                <dt className="text-neutral-500">{spec.label}</dt>
                <dd className="font-bold">{spec.value}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between border-b border-black/10 py-3 text-sm">
              <dt className="flex items-center gap-2 text-neutral-500">
                <Radio className="size-3.5" /> Conectividad
              </dt>
              <dd className="font-bold">{android.connectivity || "—"}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-black/10 py-3 text-sm">
              <dt className="flex items-center gap-2 text-neutral-500">
                <BatteryCharging className="size-3.5" /> Reconocimiento de voz
              </dt>
              <dd className="font-bold">{android.voiceRecognition || "—"}</dd>
            </div>
            {android.maxAssistanceKg && (
              <div className="flex items-center justify-between border-b border-black/10 py-3 text-sm">
                <dt className="flex items-center gap-2 text-neutral-500">
                  <Weight className="size-3.5" /> Asistencia física máx.
                </dt>
                <dd className="font-bold">{android.maxAssistanceKg} kg</dd>
              </div>
            )}
            {android.sanitaryLimit && (
              <div className="flex items-center justify-between border-b border-black/10 py-3 text-sm">
                <dt className="flex items-center gap-2 text-neutral-500">
                  <Ruler className="size-3.5" /> Límite sanitario
                </dt>
                <dd className="font-bold">{android.sanitaryLimit}</dd>
              </div>
            )}
            {android.requiresSpecializedInstall && (
              <div className="flex items-center justify-between border-b border-black/10 py-3 text-sm">
                <dt className="text-neutral-500">Instalación</dt>
                <dd className="font-bold">Requiere instalación especializada</dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      <div className="mt-16 grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 font-display text-lg font-black uppercase tracking-tight">
            Descripción
          </h2>
          <p className="text-neutral-600">{android.longDescription}</p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-lg font-black uppercase tracking-tight">
            Perfil
          </h2>
          <p className="text-neutral-600">{android.personality}</p>
        </section>
      </div>
    </div>
  );
}
