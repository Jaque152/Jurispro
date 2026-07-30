"use client";

import { ArrowRight, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN } from "@/lib/format";
import { Action } from "@/components/ui/action";

export default function ConfirmacionPage() {
  const { lastOrder, hydrated } = useCart();
  const { t, lang } = useLanguage();

  return (
    <>
      <section className="grain relative overflow-hidden bg-wine text-paper">
        <div
          className="pointer-events-none absolute -right-32 top-0 h-full w-[52%] opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 40%, hsl(var(--blush)) 0%, transparent 62%)",
          }}
        />
        <div className="relative mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
          <span className="flex h-14 w-14 items-center justify-center bg-blush text-wine">
            <Check className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <p className="mt-9 font-mono text-[9.5px] uppercase tracking-[0.24em] text-blush">
            {t.confirmationPage.kicker}
          </p>
          <h1 className="display-lg mt-5 max-w-[16ch] text-paper">
            {t.confirmationPage.titleStart}<em className="text-blush">{t.confirmationPage.titleHighlight}</em>{t.confirmationPage.titleEnd}
          </h1>
          {hydrated && lastOrder ? (
            <p className="mt-7 font-mono text-[12px] uppercase tracking-[0.2em] text-paper/60">
              {t.confirmationPage.folioFormat.replace("{number}", lastOrder.number).replace("{method}", lastOrder.method)}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
          {!hydrated ? (
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
              {t.confirmationPage.loading}
            </p>
          ) : !lastOrder ? (
            <div className="flex max-w-2xl flex-col items-start gap-7 border border-ink/12 bg-paper p-10 md:p-16">
              <span className="h-px w-16 bg-claret" />
              <h2 className="display-sm text-ink">
                {t.confirmationPage.emptyTitle}
              </h2>
              <p className="text-[14.5px] leading-relaxed text-ink/60">
                {t.confirmationPage.emptyDesc}
              </p>
              <Action href="/tienda" variant="solid" size="lg">
                {t.confirmationPage.btnStore}
                <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
              </Action>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7 xl:col-span-8">
                <h2 className="display-sm text-ink">{t.confirmationPage.nextStepsTitle}</h2>
                <ol className="mt-9 border-t border-ink/15">
                  {t.confirmationPage.steps.map((item) => (
                    <li
                      key={item.step}
                      className="grid gap-2 border-b border-ink/12 py-7 sm:grid-cols-[auto_1fr] sm:gap-8"
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] text-claret">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-display text-[25px] leading-none text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-ink/60">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Action href="/tienda" variant="solid" size="lg">
                    {t.confirmationPage.btnStore}
                    <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                  </Action>
                  <Action href="/contacto" variant="outline" size="lg">
                    {t.confirmationPage.btnContact}
                  </Action>
                </div>
              </div>

              {/* receipt */}
              <aside className="lg:col-span-5 xl:col-span-4">
                <div className="border border-ink/15 bg-paper">
                  <div className="border-b border-dashed border-ink/20 p-7 md:p-8">
                    <p className="label-mono text-claret">{t.confirmationPage.receiptTitle}</p>
                    <p className="mt-3 font-display text-[30px] leading-none text-ink">
                      {lastOrder.number}
                    </p>
                    <dl className="mt-6 space-y-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/50">
                      <div className="flex justify-between gap-4">
                        <dt>{t.confirmationPage.receiptClient}</dt>
                        <dd className="text-right text-ink/75">
                          {lastOrder.name}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>{t.confirmationPage.receiptEmail}</dt>
                        <dd className="break-all text-right text-ink/75">
                          {lastOrder.email}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>{t.confirmationPage.receiptDate}</dt>
                        <dd className="text-right text-ink/75">
                          {new Date(lastOrder.createdAt).toLocaleDateString(
                            lang === "es" ? "es-MX" : "en-US",
                            { day: "2-digit", month: "long", year: "numeric" },
                          )}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>{t.confirmationPage.receiptMethod}</dt>
                        <dd className="text-right text-ink/75">
                          {lastOrder.method}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <ul className="space-y-4 border-b border-dashed border-ink/20 p-7 md:p-8">
                    {lastOrder.lines.map((line) => (
                      <li
                        key={line.id}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="max-w-[22ch] font-display text-[18px] leading-tight text-ink">
                            {line.name}
                          </p>
                          <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/40">
                            {line.qty} × {formatMXN(line.price)}
                          </p>
                        </div>
                        <p className="shrink-0 font-mono text-[12px] tabular-nums text-ink/80">
                          {formatMXN(line.price * line.qty)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 p-7 font-mono text-[11.5px] tabular-nums md:p-8">
                    <div className="flex justify-between text-ink/55">
                      <span>{t.cartPage.summary.subtotal}</span>
                      <span>{formatMXN(lastOrder.subtotal)}</span>
                    </div>
                    {lastOrder.discount > 0 ? (
                      <div className="flex justify-between text-claret">
                        <span>{t.cartPage.summary.discount}</span>
                        <span>− {formatMXN(lastOrder.discount)}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between text-ink/55">
                      <span>{t.cartPage.summary.tax}</span>
                      <span>{formatMXN(lastOrder.iva)}</span>
                    </div>
                    <div className="flex items-end justify-between border-t border-ink/15 pt-5">
                      <span className="label-mono text-ink/50">{t.confirmationPage.paidText}</span>
                      <span className="font-display text-[34px] leading-none text-ink">
                        {formatMXN(lastOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-ink/35">
                  {t.confirmationPage.demoNote}
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}