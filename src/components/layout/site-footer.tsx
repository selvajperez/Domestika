import Link from "next/link";

const NAV_COLUMNS = [
  {
    title: "Navegación",
    links: [
      { href: "/", label: "Inicio" },
      { href: "/androides", label: "Androides" },
      { href: "/comparar", label: "Comparar" },
      { href: "/favoritos", label: "Favoritos" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/nosotros", label: "Preguntas frecuentes" },
      { href: "/nosotros", label: "Envíos y entregas" },
      { href: "/nosotros", label: "Garantía" },
      { href: "/nosotros", label: "Leasing" },
    ],
  },
  {
    title: "Nosotros",
    links: [
      { href: "/nosotros", label: "Nuestra historia" },
      { href: "/nosotros", label: "Tecnología" },
      { href: "/nosotros", label: "Trabajá con nosotros" },
      { href: "/nosotros", label: "Contacto" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl font-black tracking-tight">
              DOM<span className="text-brand-red">É</span>STIKA
            </span>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Diseñamos androides para servir, acompañar y mejorar la vida de
              las personas.
            </p>
          </div>

          {NAV_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={`${column.title}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <span>© 2087 DOMÉSTIKA. Todos los derechos reservados.</span>
          <div className="flex gap-6">
            <Link href="/nosotros" className="hover:text-white">
              Términos y condiciones
            </Link>
            <Link href="/nosotros" className="hover:text-white">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
