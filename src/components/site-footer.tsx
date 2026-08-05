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
            <div className="flex gap-2">
              <div className="px-3 py-1.5 bg-white rounded flex items-center justify-center">
                <svg className="h-4" viewBox="0 0 780 500" fill="none"><rect width="780" height="500" rx="40" fill="white"/><path fill="#1434CB" d="M293.2 348.7l33.3-190.4h53.3l-33.3 190.4h-53.3zM500.8 163c-10.5-3.9-27-8.1-47.6-8.1-52.4 0-89.3 26.4-89.6 64.2-.3 28 26.5 43.6 46.7 52.9 20.7 9.5 27.7 15.6 27.6 24.1-.1 13-16.6 19-31.9 19-21.3 0-32.6-3-50.1-10.3l-6.9-3.1-7.5 43.8c12.4 5.4 35.5 10.1 59.4 10.4 55.7 0 91.9-26.1 92.3-66.5.2-22.2-14-39.1-44.6-53-18.6-9-30-15-29.9-24.1 0-8.1 9.6-16.7 30.5-16.7 17.4-.3 30 3.5 39.8 7.5l4.8 2.3 7.2-42.4h.8zM581.8 158.3h-41c-12.7 0-22.2 3.5-27.8 16.2l-78.8 178.2h55.7l11.1-29.1h68.1l6.5 29.1H624l-42.2-194.4zm-65.6 125.2c4.4-11.2 21.3-54.4 21.3-54.4-.3.5 4.4-11.4 7.1-18.7l3.6 16.9s10.2 46.6 12.4 56.2h-44.4z"/><path fill="#1434CB" d="M239.5 158.3L187.4 289l-5.5-26.8c-9.6-30.7-39.5-64-73-80.6l47.5 166.9h56l83.2-190.2h-56.1z"/><path fill="#F7B600" d="M146.9 158.3H61.3l-.6 3.5c66.4 16 110.3 54.7 128.5 101.2l-18.5-88.8c-3.2-12.1-12.5-15.5-23.8-15.9z"/></svg>
              </div>
              <div className="px-3 py-1.5 bg-white rounded flex items-center justify-center">
                <svg className="h-4" viewBox="0 0 152 100" fill="none"><rect width="152" height="100" rx="8" fill="white"/><circle cx="55" cy="50" r="30" fill="#EB001B"/><circle cx="97" cy="50" r="30" fill="#F79E1B"/><path d="M76 27.5C82.6 32.8 87 40.8 87 50C87 59.2 82.6 67.2 76 72.5C69.4 67.2 65 59.2 65 50C65 40.8 69.4 32.8 76 27.5Z" fill="#FF5F00"/></svg>
              </div>
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
        <div className="mt-10 select-none ">
          <span className="block font-display text-[10vw] leading-[1.0] tracking-[-0.03em] text-paper/8">
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