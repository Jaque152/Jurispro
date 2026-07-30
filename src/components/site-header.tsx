"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context"; // <-- Importamos
import { formatMXN } from "@/lib/format";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { count, subtotal, openCart, hydrated } = useCart();
  const { t } = useLanguage(); // <-- Consumimos el diccionario
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname) setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* announcement ticker */}
      <div className="relative z-50 overflow-hidden border-b border-ink/15 bg-wine text-paper">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {t.header.ticker.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center gap-6 whitespace-nowrap px-6 py-[7px] font-mono text-[9.5px] uppercase tracking-[0.28em] text-paper/70"
                >
                  {item}
                  <span className="text-blush">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-500",
          scrolled
            ? "border-ink/12 bg-parchment/92 backdrop-blur-md"
            : "border-transparent bg-parchment",
        )}
      >
        <div className="mx-auto flex h-[76px] max-w-[1680px] items-center justify-between gap-6 px-5 md:px-10">
          {/* wordmark */}
          <Link href="/" className="group flex items-center gap-3">
            <BrandMark className="h-7 w-7 text-claret transition-transform duration-500 group-hover:rotate-[-8deg]" />
            <span className="leading-none">
              <span className="block font-display text-[19px] tracking-[0.01em] text-ink">
                JurisPro
              </span>
              <span className="mt-[3px] block font-mono text-[8.5px] uppercase tracking-[0.3em] text-bark/70">
                {t.header.subtitle}
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {t.header.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-baseline gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                    active ? "text-claret" : "text-ink/70 hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "text-[8px]",
                      active ? "text-claret" : "text-ink/30",
                    )}
                  >
                    {item.index}
                  </span>
                  <span className="link-underline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCart}
              className="group flex items-center gap-3 border border-ink/20 px-4 py-2.5 transition-colors hover:border-claret hover:bg-claret hover:text-paper"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                {t.header.cart}
              </span>
              <span className="h-3 w-px bg-current opacity-30" />
              <span className="font-mono text-[10px] tabular-nums tracking-[0.1em]">
                {hydrated ? formatMXN(subtotal).replace("MX$", "$") : "$0.00"}
              </span>
              <span className="relative -mr-1 flex h-5 min-w-5 items-center justify-center bg-claret px-1 font-mono text-[9px] text-paper group-hover:bg-wine">
                {hydrated ? count : 0}
              </span>
            </button>

            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(true)}
              className="flex h-[42px] w-[42px] items-center justify-center border border-ink/20 text-ink transition-colors hover:border-claret hover:text-claret lg:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-wine transition-[opacity,visibility] duration-500 lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="grain relative flex h-full flex-col">
          <div className="flex h-[76px] items-center justify-between px-5">
            <span className="font-display text-[19px] text-paper">
              JurisPro
            </span>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="flex h-[42px] w-[42px] items-center justify-center border border-paper/25 text-paper"
            >
              <X className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-5">
            {t.header.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-4 border-b border-paper/12 py-5"
                style={{
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <span className="font-mono text-[9px] tracking-[0.2em] text-blush">
                  {item.index}
                </span>
                <span className="font-display text-[34px] leading-none text-paper transition-colors group-hover:text-blush">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-5 pb-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-paper/50">
            +52 1 55 2583 8843
            <br />
            resuelve@jurispro.com.mx
          </div>
        </div>
      </div>
    </>
  );
}