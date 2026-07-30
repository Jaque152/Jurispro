"use client"; 

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const { t, lang, setLanguage } = useLanguage();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1680px] px-5 pt-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BrandMark className="h-9 w-9 text-blush" />
            <p className="mt-7 max-w-sm font-display text-[30px] leading-[1.12] text-paper md:text-[36px]">
              {t.footer.taglineStart}
              <em className="text-blush">{t.footer.highlight}</em>
              {t.footer.taglineEnd}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <PayMark>Visa</PayMark>
              <PayMark>Mastercard</PayMark>
              <PayMark>Amex</PayMark>
              <PayMark>SPEI</PayMark>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="label-mono text-blush">{t.footer.addressTitle}</h3>
            <address className="mt-5 not-italic text-[14px] leading-relaxed text-paper/65">
              Mariano Escobedo 375, Piso 14, Depto. 1403
              <br />
              Bosque de Chapultepec I Sección
              <br />
              Miguel Hidalgo, CP 11580
              <br />
              Ciudad de México
            </address>
          </div>

          <div className="lg:col-span-2">
            <h3 className="label-mono text-blush">{t.footer.contactTitle}</h3>
            <ul className="mt-5 space-y-2 text-[14px] text-paper/65">
              <li>
                <a href="tel:+525525838843" className="link-underline hover:text-paper">
                  +52 1 55 2583 8843
                </a>
              </li>
              <li>
                <a
                  href="mailto:resuelve@jurispro.com.mx"
                  className="link-underline break-all hover:text-paper"
                >
                  resuelve@jurispro.com.mx
                </a>
              </li>
              <li className="pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
                {t.footer.schedule}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="label-mono text-blush">{t.footer.indexTitle}</h3>
            <ul className="mt-5 space-y-2 text-[14px] text-paper/65">
              {t.footer.sitemap.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="label-mono text-blush">{t.footer.languageTitle}</h3>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                  lang === "es" ? "text-paper" : "text-paper/40 hover:text-blush"
                )}
              >
                ES
              </button>
              <span className="font-mono text-[11px] text-paper/20">/</span>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                  lang === "en" ? "text-paper" : "text-paper/40 hover:text-blush"
                )}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* oversized wordmark */}
        <div className="mt-20 select-none overflow-hidden">
          <span className="block whitespace-nowrap font-display text-[15vw] leading-[0.8] tracking-[-0.03em] text-paper/8">
            JurisPro
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/12 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/40">
            © {new Date().getFullYear()} JurisPro. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {t.footer.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/40 transition-colors hover:text-blush"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function PayMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-paper/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/50">
      {children}
    </span>
  );
}