"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN } from "@/lib/format";
import { Action } from "@/components/ui/action";
import { PageHero } from "@/components/page-hero";

export default function CarritoPage() {
  // LIMPIEZA: Se eliminaron discount, coupon, applyCoupon y removeCoupon
  const {
    lines,
    setQty,
    remove,
    clear,
    subtotal,
    iva,
    total,
    count,
    hydrated,
  } = useCart();
  const { t } = useLanguage();
  
  // LIMPIEZA: Se eliminó const [code, setCode] = useState("");

  return (
    <>
      <PageHero
        index="06"
        kicker={t.cartPage.kicker}
        title={
          <>
            {t.cartPage.titleStart} <em className="text-blush">{t.cartPage.titleHighlight}</em>
          </>
        }
        description={t.cartPage.description}
        breadcrumb={[
          { href: "/", label: t.cartPage.breadcrumbs.home },
          { href: "/tienda", label: t.cartPage.breadcrumbs.store },
          { href: "/carrito", label: t.cartPage.breadcrumbs.cart },
        ]}
      />

      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
          {!hydrated ? (
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
              {t.cartPage.loading}
            </p>
          ) : lines.length === 0 ? (
            <div className="flex flex-col items-start gap-7 border border-ink/12 bg-paper p-10 md:p-16">
              <span className="h-px w-16 bg-claret" />
              <h2 className="display-sm max-w-[18ch] text-ink">
                {t.cartPage.emptyTitle}
              </h2>
              <p className="max-w-[48ch] text-[14.5px] leading-relaxed text-ink/60">
                {t.cartPage.emptyDesc}
              </p>
              <Action href="/tienda" variant="solid" size="lg">
                {t.cartPage.goToStore}
                <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
              </Action>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* lines */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="flex items-center justify-between border-b border-ink/15 pb-4">
                  <p className="label-mono text-ink/50">
                    {count} {count === 1 ? t.cartPage.itemsCount : t.cartPage.itemsCountPlural}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      clear();
                      toast(t.cartPage.toastCleared);
                    }}
                    className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/40 transition-colors hover:text-claret"
                  >
                    {t.cartPage.clearCart}
                  </button>
                </div>

                <ul>
                  {lines.map((line, i) => (
                    <li
                      key={line.id}
                      className="grid grid-cols-1 gap-5 border-b border-ink/12 py-8 sm:grid-cols-[1fr_auto] sm:items-start"
                    >
                      <div>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-claret">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Link
                          href={`/producto/${line.slug}`}
                          className="mt-2 block max-w-[24ch] font-display text-[27px] leading-tight text-ink transition-colors hover:text-claret"
                        >
                          {line.name}
                        </Link>
                        {line.note ? (
                          <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">
                            {line.note}
                          </p>
                        ) : null}
                        <p className="mt-2 font-mono text-[11px] tabular-nums text-ink/50">
                          {formatMXN(line.price)} {t.cartPage.each}
                        </p>

                        <div className="mt-5 flex items-center gap-4">
                          <div className="flex items-center border border-ink/20">
                            <button
                              type="button"
                              aria-label={t.cartPage.subAria}
                              onClick={() => setQty(line.id, line.qty - 1)}
                              className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:bg-wine hover:text-paper"
                            >
                              <Minus
                                className="h-3.5 w-3.5"
                                strokeWidth={1.5}
                              />
                            </button>
                            <span className="min-w-11 text-center font-mono text-[12px] tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={t.cartPage.addAria}
                              onClick={() => setQty(line.id, line.qty + 1)}
                              className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:bg-wine hover:text-paper"
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(line.id)}
                            className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/40 transition-colors hover:text-claret"
                          >
                            <X className="h-3 w-3" strokeWidth={1.6} />
                            {t.cartPage.remove}
                          </button>
                        </div>
                      </div>

                      <p className="font-display text-[30px] leading-none tabular-nums text-ink sm:text-right">
                        {formatMXN(line.price * line.qty)}
                      </p>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/tienda"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 hover:text-claret"
                >
                  {t.cartPage.keepExploring}
                </Link>
              </div>

              {/* summary */}
              <aside className="lg:col-span-5 xl:col-span-4">
                <div className="border border-ink/15 bg-paper p-7 lg:sticky lg:top-32 md:p-8">
                  <p className="label-mono text-claret">{t.cartPage.summary.title}</p>
                  <h2 className="mt-3 font-display text-[30px] leading-none text-ink">
                    {t.cartPage.summary.order}
                  </h2>

                  <div className="mt-7 space-y-3 border-t border-ink/12 pt-6 font-mono text-[11.5px] tabular-nums">
                    <Row label={t.cartPage.summary.subtotal} value={formatMXN(subtotal)} />
                    {/* LIMPIEZA: Se eliminó el bloque condicional del descuento */}
                    <Row label={t.cartPage.summary.tax} value={formatMXN(iva)} />
                  </div>

                  {/* LIMPIEZA: Se eliminó el div completo que contenía la lógica del input del cupón */}

                  <div className="mt-7 flex items-end justify-between border-t border-ink/15 pt-6">
                    <span className="label-mono text-ink/50">{t.cartPage.summary.total}</span>
                    <span className="font-display text-[38px] leading-none tabular-nums text-ink">
                      {formatMXN(total)}
                    </span>
                  </div>

                  <Action
                    href="/checkout"
                    variant="claret"
                    size="lg"
                    className="mt-7 w-full"
                  >
                    {t.cartPage.summary.checkoutBtn}
                    <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                  </Action>

                  <p className="mt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-ink/35">
                    {t.cartPage.summary.secure}
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={accent ? "text-claret" : "text-ink/55"}>{label}</span>
      <span className={accent ? "text-claret" : "text-ink/80"}>{value}</span>
    </div>
  );
}
