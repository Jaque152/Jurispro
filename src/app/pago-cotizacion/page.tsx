"use client";

import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { AddToCartPanel } from "@/components/add-to-cart";
import { Action } from "@/components/ui/action";
import { useLanguage } from "@/lib/language-context";
import { getProduct } from "@/lib/products";

export default function PagoCotizacionPage() {
  const { t, lang } = useLanguage();
  const product = getProduct("pago-cotizacion", lang);
  if (!product) return null;

  return (
    <>
      <PageHero
        index="04"
        kicker={t.payQuotePage.kicker}
        title={
          <>
            {t.payQuotePage.titleStart}<em className="text-blush">{t.payQuotePage.titleHighlight}</em>
          </>
        }
        description={t.payQuotePage.description}
        breadcrumb={[
          { href: "/", label: t.payQuotePage.breadcrumbs.home },
          { href: "/pago-cotizacion", label: t.payQuotePage.breadcrumbs.pay },
        ]}
      />

      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-7">
              <h2 className="display-sm max-w-[18ch] text-ink">
                {t.payQuotePage.subtitle}
              </h2>
              <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-ink/60">
                {t.payQuotePage.body}
              </p>

              <div className="mt-10">
                <AddToCartPanel product={product} />
              </div>

              <ol className="mt-14 border-t border-ink/15">
                {t.payQuotePage.steps.map((step) => (
                  <li
                    key={step.index}
                    className="grid gap-2 border-b border-ink/12 py-7 sm:grid-cols-[auto_1fr] sm:gap-8"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-claret">
                      {step.index}
                    </span>
                    <div>
                      <h3 className="font-display text-[24px] leading-none text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-ink/60">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-wrap gap-3">
                <Action href="/cotiza" variant="outline" size="md">
                  {t.payQuotePage.noQuoteBtn}
                </Action>
                <Action href="/contacto" variant="outline" size="md">
                  {t.payQuotePage.contactBtn}
                </Action>
              </div>
            </div>

            <aside className="lg:col-span-5 xl:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-wine">
                <Image
                  src={product.image}
                  alt="Pago de cotización"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover duotone opacity-85"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-blush">
                    {t.payQuotePage.document.kicker}
                  </p>
                  <p className="mt-3 max-w-[22ch] font-display text-[26px] leading-tight text-paper">
                    {t.payQuotePage.document.title}
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-px bg-ink/12">
                <Cell label={t.payQuotePage.document.validityLabel} value={t.payQuotePage.document.validityValue} />
                <Cell label={t.payQuotePage.document.invoiceLabel} value="CFDI 4.0" />
                <Cell label={t.payQuotePage.document.currencyLabel} value="MXN" />
                <Cell label={t.payQuotePage.document.minLabel} value="$100.00" />
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-parchment px-5 py-4">
      <dt className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/40">
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-[18px] leading-none text-ink">
        {value}
      </dd>
    </div>
  );
}