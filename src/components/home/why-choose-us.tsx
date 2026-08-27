import { ShieldCheck, Cog, BatteryCharging, Headset, Truck } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Tecnología avanzada",
    description: "Desarrollos propios con IA y aprendizaje continuo.",
  },
  {
    icon: Cog,
    title: "Diseño y calidad",
    description: "Materiales premium, resistentes y elegantes.",
  },
  {
    icon: BatteryCharging,
    title: "Autonomía real",
    description: "Baterías de larga duración y carga rápida.",
  },
  {
    icon: Headset,
    title: "Soporte especializado",
    description: "Asistencia técnica 24/7 y garantía extendida.",
  },
  {
    icon: Truck,
    title: "Envío e instalación",
    description: "Entrega segura e instalación especializada en todo el país.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-panel">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight">
          <span className="h-5 w-1 bg-brand-red" />
          ¿Por qué elegir DOMÉSTIKA?
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {REASONS.map((reason) => (
            <div key={reason.title} className="flex flex-col gap-3">
              <reason.icon className="size-7 text-brand-red" />
              <h3 className="text-sm font-bold uppercase tracking-wide">
                {reason.title}
              </h3>
              <p className="text-sm text-neutral-500">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
