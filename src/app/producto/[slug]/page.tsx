"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  getCategory,
  getProduct,
  relatedProducts,
} from "@/lib/products";
import { formatMXN } from "@/lib/format";
import { AddToCartPanel } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Action } from "@/components/ui/action";
import { useLanguage } from "@/lib/language-context";

export default function ProductPage() {
  const { slug } = useParams() as { slug: string };
  const { t, lang } = useLanguage();
  
  const product = getProduct(slug, lang);
  if (!product) notFound();

  const category = getCategory(product.category, lang);
  const related = relatedProducts(slug, lang, 3);
  const iva = product.openPrice ? 0 : product.price * 0.16;

  return (
    <>
      <section className="border-b border-ink/12 bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 md:px-10">
          <nav className="flex flex-wrap items-center gap-1.5 py-6 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/40">
            <Link href="/" className="hover:text-claret">
              {t.productPage.breadcrumbs.home}
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.4} />
            <Link href="/tienda" className="hover:text-claret">
              {t.productPage.breadcrumbs.store}
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.4} />
            <Link
              href={`/tienda#${product.category}`}
              className="hover:text-claret"
            >
              {category?.name}
            </Link>
          </nav>

          <div className="grid gap-10 pb-16 lg:grid-cols-12 lg:gap-14 lg:pb-24">
            {/* image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-wine">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover duotone opacity-85"
                />
                <div className="pointer-events-none absolute inset-0 bg-wine/25 mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/60">
                    {t.productPage.expLabel} {product.id}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-blush">
                    {category?.kicker}
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-px bg-ink/12">
                <SpecCell label={t.productPage.specs.delivery} value={product.turnaround} />
                <SpecCell label={t.productPage.specs.modality} value={t.productPage.specs.remote} />
                <SpecCell label={t.productPage.specs.currency} value="MXN" />
                <SpecCell label={t.productPage.specs.invoice} value="CFDI 4.0" />
              </dl>
            </div>

            {/* detail */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.24em] text-claret">
                  {category?.index}
                </span>
                <span className="h-px w-12 bg-claret/50" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/50">
                  {category?.name}
                </span>
              </div>

              <h1 className="display-lg mt-6 max-w-[16ch] text-ink">
                {product.name}
              </h1>

              <p className="mt-6 max-w-[52ch] font-display text-[22px] leading-snug text-ink/70">
                {product.tagline}
              </p>

              <div className="mt-9 flex flex-wrap items-end gap-x-8 gap-y-3 border-y border-ink/12 py-7">
                <div>
                  <p className="label-mono text-ink/45">{t.productPage.feesLabel}</p>
                  <p className="mt-2 font-display text-[46px] leading-none tabular-nums text-ink">
                    {product.openPrice
                      ? t.product.tbd
                      : formatMXN(product.price)}
                  </p>
                </div>
                {!product.openPrice ? (
                  <div className="pb-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                      {t.productPage.taxNote}
                    </p>
                    <p className="mt-1 font-mono text-[11px] tabular-nums text-ink/55">
                      {t.productPage.totalWithTax} {formatMXN(product.price + iva)}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-8">
                <AddToCartPanel product={product} />
              </div>

              <div className="mt-12 grid gap-10 md:grid-cols-2">
                <div>
                  <h2 className="label-mono text-claret">{t.productPage.includesLabel}</h2>
                  <ul className="mt-5 space-y-3 border-t border-ink/12 pt-5">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-[14px] leading-relaxed text-ink/65"
                      >
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-claret" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="label-mono text-claret">{t.productPage.descLabel}</h2>
                  <p className="mt-5 border-t border-ink/12 pt-5 text-[14px] leading-relaxed text-ink/65">
                    {product.summary}
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink/45">
                    {t.productPage.afterPayNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-sm text-ink">
              {t.productPage.relatedTitle}
            </h2>
            <Action href="/tienda" variant="outline" size="sm">
              {t.productPage.relatedBtn}
            </Action>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <ProductCard product={item} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
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