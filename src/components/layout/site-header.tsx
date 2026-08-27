import Link from "next/link";
import { Search, User, ShoppingCart } from "lucide-react";

import { CartBadge } from "./cart-badge";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/androides", label: "Androides" },
  { href: "/comparar", label: "Comparar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/nosotros", label: "Nosotros" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-black tracking-tight">
            DOM<span className="text-brand-red">É</span>STIKA
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 sm:block">
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

        <div className="flex items-center gap-4 sm:gap-5">
          <button
            aria-label="Buscar"
            className="hidden text-white/80 transition-colors hover:text-white sm:block"
          >
            <Search className="size-5" />
          </button>
          <button
            aria-label="Cuenta"
            className="hidden text-white/80 transition-colors hover:text-white sm:block"
          >
            <User className="size-5" />
          </button>
          <Link
            href="/carrito"
            aria-label="Carrito"
            className="flex items-center gap-2 border border-white/30 px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:border-white sm:px-4"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Carrito</span>
            <CartBadge />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
