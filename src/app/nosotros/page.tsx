import Link from "next/link";
import { ShieldCheck, Truck, Wallet } from "lucide-react";

import { DELIVERY_METHOD_OPTIONS } from "@/lib/business-rules/shipping";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Nosotros — DOMÉSTIKA",
  description:
    "Historia, universo corporativo y condiciones de compra y leasing de DOMÉSTIKA.",
};

export default function NosotrosPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-black text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-red">
            Desde 2087
          </p>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
            Un futuro optimista, hecho de servicio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/70">
            DOMÉSTIKA nace de la línea de ingeniería Súper Sónicos para llevar a cada hogar
            androides con oficio: no imitan personas, las acompañan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-4 flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
          <span className="h-5 w-1 bg-brand-red" />
          Nuestra historia
        </h2>
        <div className="flex flex-col gap-4 text-neutral-600">
          <p>
            Súper Sónicos empezó como un laboratorio de ingeniería doméstica: unidades pensadas
            para un problema concreto de una familia real, una a la vez. Ángela nació de la
            vocación de una enfermera de hospital. Ramón, de un jardinero silencioso y observador.
            Yun Sil, del ingenio de una amiga curiosa que hoy vive del otro lado del mundo. Cada
            androide de nuestro catálogo es un homenaje, no una copia: una forma de reconocer un
            oficio y ponerlo al servicio de más hogares.
          </p>
          <p>
            DOMÉSTIKA es la marca comercial de esa línea: la que toma unidades probadas puerta a
            puerta y las lleva a escala, con el mismo criterio de origen — retrofuturismo
            elegante, sin estridencias, con la calidez de lo hecho a mano aunque esté fabricado con
            tecnología de 2087.
          </p>
          <p>
            No vendemos ciencia ficción. Vendemos compañía, tiempo libre y una casa que funciona
            mejor. El resto es diseño.
          </p>
        </div>
      </section>

      <section className="border-y border-black/10 bg-brand-panel">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-4 flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
            <span className="h-5 w-1 bg-brand-red" />
            Universo corporativo
          </h2>
          <p className="text-neutral-600">
            Cada unidad Súper Sónicos que distribuye DOMÉSTIKA conserva su propia personalidad,
            oficio y forma de hablar. Se coordinan entre sí (Ángela delega en Jeeves-9, Catbot y
            Dogbot trabajan en alianza, Yun Sil mantiene a todas las demás) porque en una casa real
            nada funciona de manera aislada. Vender androides con carácter propio, en lugar de
            asistentes genéricos, es la decisión de diseño central de la marca.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-6 flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
          <span className="h-5 w-1 bg-brand-red" />
          Condiciones de compra y leasing
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <Wallet className="mb-3 size-6 text-brand-red" />
            <h3 className="text-sm font-bold uppercase tracking-wide">Compra</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Pago único, propiedad total de la unidad desde el día uno.
            </p>
          </div>
          <div>
            <Wallet className="mb-3 size-6 text-brand-red" />
            <h3 className="text-sm font-bold uppercase tracking-wide">Leasing</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Contrato mínimo de 24 meses, con mantenimiento incluido. Ideal para probar una unidad
              antes de decidir.
            </p>
          </div>
          <div>
            <ShieldCheck className="mb-3 size-6 text-brand-red" />
            <h3 className="text-sm font-bold uppercase tracking-wide">Garantía</h3>
            <p className="mt-1 text-sm text-neutral-500">
              24 meses de cobertura oficial en todos los modelos, compra o leasing.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-brand-panel">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-6 flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
            <Truck className="size-5" />
            Modalidades de envío
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {DELIVERY_METHOD_OPTIONS.map((option) => (
              <div key={option.value}>
                <h3 className="text-sm font-bold uppercase tracking-wide">{option.label}</h3>
                <p className="mt-1 text-sm text-neutral-500">{option.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-neutral-400">
            Los androides marcados con instalación especializada obligatoria solo se entregan bajo
            esa modalidad — la regla se aplica automáticamente en el carrito.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight">
          ¿Listo para conocer al androide indicado?
        </h2>
        <Button asChild size="lg">
          <Link href="/androides">Ver catálogo →</Link>
        </Button>
      </section>
    </div>
  );
}
