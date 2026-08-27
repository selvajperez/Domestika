"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { PlaceholderPortrait } from "@/components/product/placeholder-portrait";

const INFO_ITEMS = [
  { title: "Online", subtitle: "Todos los modelos disponibles" },
  { title: "Garantía", subtitle: "24 meses" },
  { title: "Soporte 24/7", subtitle: "Asistencia técnica especializada" },
];

export function Hero() {
  return (
    <section className="border-b border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex min-w-0 flex-col justify-center"
        >
          <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
            Tecnología.
            <br />
            Compañía.
            <br />
            <span className="text-brand-red">Evolución.</span>
          </h1>
          <p className="mt-6 max-w-md text-white/70">
            En DOMÉSTIKA creamos androides para transformar tu hogar en un
            lugar más eficiente, seguro y humano.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="primary">
              <Link href="/androides">
                Ver catálogo
                <span aria-hidden>→</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/nosotros">Conocer más</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex min-w-0 flex-col gap-4"
        >
          <PlaceholderPortrait label="D14" code="DOMÉSTIKA · SERIE D-14" dark />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
            {INFO_ITEMS.map((item) => (
              <div
                key={item.title}
                className="border border-white/15 px-4 py-3"
              >
                <p className="text-sm font-bold uppercase tracking-wide">
                  {item.title}
                </p>
                <p className="text-xs text-white/50">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
