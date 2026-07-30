"use client";

import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { Action } from "@/components/ui/action";
import { getProducts, getCategories, productsByCategory } from "@/lib/products";
import { formatMXN } from "@/lib/format";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export default function TiendaPage() {
  const { t, lang } = useLanguage();
  
  // Obtenemos los catálogos en el idioma del usuario
  const products = getProducts(lang);
  const categories = getCategories(lang);

  const priced = products.filter((p) => !p.openPrice);
  const cheapest = Math.min(...priced.map((p) => p.price));

  return (
    <>
      <PageHero
        index="02"
        kicker={t.storePage.kicker}
        title={
          <>
            {t.storePage.titleStart}<em className="text-blush">{t.storePage.titleHighlight}</em>{t.storePage.titleEnd}
          </>
        }
        description={t.storePage.description.replace("{count}", priced.length.toString()).replace("{min}", formatMXN(cheapest))}
        breadcrumb={[
          { href: "/", label: t.storePage.breadcrumbs.home },
          { href: "/tienda", label: t.storePage.breadcrumbs.store },
        ]}
      />

      {/* index of categories */}
      <section className="border-b border-ink/12 bg-paper">
        <div className="mx-auto max-w-[1680px] px-5 md:px-10">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => {
              const count = productsByCategory(category.id, lang).length;
              return (
                <li
                  key={category.id}
                  className={cn(
                    "border-b border-ink/10",
                    "md:border-r md:[&:nth-child(2n)]:border-r-0",
                    "lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0",
                    i >= categories.length - 2 && "md:border-b-0",
                  )}
                >
                  <a
                    href={`#${category.id}`}
                    className="group flex items-baseline justify-between gap-4 py-5 pr-2 transition-colors md:px-6 md:first:pl-0"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[9.5px] tracking-[0.2em] text-claret">
                        {category.index}
                      </span>
                      <span className="font-display text-[20px] leading-none text-ink transition-colors group-hover:text-claret">
                        {category.name}
                      </span>
                    </span>
                    <span className="font-mono text-[9.5px] tabular-nums text-ink/35">
                      {String(count).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {categories.map((category, ci) => {
        const items = productsByCategory(category.id, lang);
        if (items.length === 0) return null;
        const dark = ci % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
            className={
              dark
                ? "grain relative overflow-hidden border-b border-ink/12 bg-paper scroll-mt-28"
                : "border-b border-ink/12 bg-parchment scroll-mt-28"
            }
          >
            <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
              <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-claret">
                      {category.index}
                    </span>
                    <span className="h-px w-12 bg-claret/50" />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/50">
                      {category.kicker}
                    </span>
                  </div>
                  <h2 className="display-md mt-5 max-w-[18ch] text-ink">
                    {category.name}
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="max-w-[46ch] text-[14.5px] leading-relaxed text-ink/60">
                    {category.description}
                  </p>
                </div>
              </Reveal>

              <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((product, i) => (
                  <Reveal key={product.id} delay={i * 70}>
                    <ProductCard product={product} index={i + 1} />
                  </Reveal>
                ))}

                {/* filler panel keeps the grid rhythm on short rows */}
                {items.length % 3 !== 0 ? (
                  <Reveal delay={items.length * 70} className="hidden xl:block">
                    <div className="relative h-full min-h-[320px] overflow-hidden bg-wine">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="33vw"
                        className="object-cover duotone opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-blush">
                          {category.kicker}
                        </p>
                        <p className="mt-3 max-w-[20ch] font-display text-[28px] leading-tight text-paper">
                          {category.name}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      {/* closing CTA */}
      <section className="grain relative overflow-hidden bg-wine text-paper">
        <div className="relative mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-blush">
                {t.storePage.cta.kicker}
              </p>
              <h2 className="display-md mt-5 max-w-[18ch] text-paper">
                {t.storePage.cta.title}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-[44ch] text-[14.5px] leading-relaxed text-paper/60">
                {t.storePage.cta.desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Action href="/cotiza" variant="claret" size="lg">
                  {t.storePage.cta.btnQuote}
                </Action>
                <Action href="/pago-cotizacion" variant="ghost" size="lg">
                  {t.storePage.cta.btnPay}
                </Action>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}