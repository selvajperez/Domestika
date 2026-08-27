import Link from "next/link";
import { Search, User, ShoppingCart } from "lucide-react";

import { CartBadge } from "./cart-badge";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/androides", label: "Androides" },
  { href: "/comparar", label: "Comparar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/nosotros", label: "Nosotros" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-black tracking-tight">
            DOM<span className="text-brand-red">É</span>STIKA
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
            Androides para una vida extraordinaria
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Buscar"
            className="text-white/80 transition-colors hover:text-white"
          >
            <Search className="size-5" />
          </button>
          <button
            aria-label="Cuenta"
            className="text-white/80 transition-colors hover:text-white"
          >
            <User className="size-5" />
          </button>
          <Link
            href="/carrito"
            className="flex items-center gap-2 border border-white/30 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:border-white"
          >
            <ShoppingCart className="size-4" />
            Carrito
            <CartBadge />
          </Link>
        </div>
      </div>
    </header>
  );
}
