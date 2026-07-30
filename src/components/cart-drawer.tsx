"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN } from "@/lib/format";
import { Action } from "@/components/ui/action";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    setQty,
    remove,
    subtotal,
    discount,
    iva,
    total,
    count,
    coupon,
  } = useCart();
  
  const { t } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : closeCart())}>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="flex flex-col p-0"
      >
        <SheetTitle className="sr-only">{t.cart.title}</SheetTitle>

        <header className="flex items-center justify-between border-b border-ink/12 px-6 py-5">
          <div>
            <p className="label-mono text-claret">Expediente</p>
            <p className="mt-1 font-display text-[26px] leading-none text-ink">
              {t.cart.title}{" "}
              <span className="font-mono text-[11px] text-ink/40">
                ({count})
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-claret hover:bg-claret hover:text-paper"
          >
            <X className="h-4 w-4" strokeWidth={1.4} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="h-px w-16 bg-claret" />
            <p className="font-display whitespace-pre-wrap text-[28px] leading-tight text-ink/70">
              {t.cart.emptyTitle}
            </p>
            <p className="max-w-[26ch] text-[13px] leading-relaxed text-ink/50">
              {t.cart.emptyDesc}
            </p>
            <Action
              href="/tienda"
              variant="solid"
              size="md"
              onClick={closeCart}
            >
              {t.cart.goToStore}
            </Action>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul>
                {lines.map((line, i) => (
                  <li
                    key={line.id}
                    className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 border-b border-ink/10 py-5"
                  >
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.2em] text-claret">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <Link
                        href={`/producto/${line.slug}`}
                        onClick={closeCart}
                        className="mt-1 block font-display text-[21px] leading-tight text-ink hover:text-claret"
                      >
                        {line.name}
                      </Link>
                      {line.note ? (
                        <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/45">
                          {line.note}
                        </p>
                      ) : null}
                      <p className="mt-1 font-mono text-[10px] tabular-nums text-ink/50">
                        {formatMXN(line.price)} c/u
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/35 transition-colors hover:text-claret"
                      >
                        {t.cart.remove}
                      </button>
                      <p className="font-mono text-[13px] tabular-nums text-ink">
                        {formatMXN(line.price * line.qty)}
                      </p>
                    </div>

                    <div className="col-span-2 flex items-center border border-ink/15 self-start w-fit">
                      <Stepper
                        label={t.cart.addBtnSubtract}
                        onClick={() => setQty(line.id, line.qty - 1)}
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.6} />
                      </Stepper>
                      <span className="min-w-9 text-center font-mono text-[11px] tabular-nums text-ink">
                        {line.qty}
                      </span>
                      <Stepper
                        label={t.cart.addBtnAdd}
                        onClick={() => setQty(line.id, line.qty + 1)}
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.6} />
                      </Stepper>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-ink/12 bg-paper px-6 py-6">
              <dl className="space-y-2 font-mono text-[11px] tabular-nums">
                <Row label={t.cart.subtotal} value={formatMXN(subtotal)} />
                {discount > 0 ? (
                  <Row
                    label={`${t.cart.discount} · ${coupon}`}
                    value={`− ${formatMXN(discount)}`}
                    accent
                  />
                ) : null}
                <Row label={t.cart.tax} value={formatMXN(iva)} />
              </dl>

              <div className="mt-4 flex items-end justify-between border-t border-ink/12 pt-4">
                <span className="label-mono text-ink/50">{t.cart.total}</span>
                <span className="font-display text-[30px] leading-none tabular-nums text-ink">
                  {formatMXN(total)}
                </span>
              </div>

              <div className="mt-5 grid gap-2">
                <Action
                  href="/checkout"
                  variant="claret"
                  size="lg"
                  className="w-full"
                  onClick={closeCart}
                >
                  {t.cart.checkout}
                </Action>
                <Action
                  href="/carrito"
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={closeCart}
                >
                  {t.cart.viewCart}
                </Action>
              </div>

              <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-ink/35">
                {t.cart.secureAuth}
              </p>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Stepper({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:bg-wine hover:text-paper"
    >
      {children}
    </button>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={accent ? "text-claret" : "text-ink/55"}>{label}</dt>
      <dd className={accent ? "text-claret" : "text-ink/80"}>{value}</dd>
    </div>
  );
}