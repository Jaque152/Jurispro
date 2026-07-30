"use client"; // <-- Asegúrate de que este componente se vuelva cliente para leer el idioma

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatMXN } from "@/lib/format";
import { AddToCartButton } from "@/components/add-to-cart";
import { useLanguage } from "@/lib/language-context";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { t } = useLanguage();

  return (
    <article className="group relative flex flex-col justify-between border border-ink/12 bg-paper p-7 transition-all duration-500 hover:border-claret/50 hover:shadow-[0_18px_50px_-30px_rgba(16,32,26,0.55)] md:p-8">
      {/* corner index */}
      <span className="absolute right-6 top-6 font-mono text-[9px] tracking-[0.2em] text-ink/25">
        {String(index).padStart(2, "0")}
      </span>

      <div>
        <p className="label-mono text-claret">{product.turnaround}</p>

        <Link href={`/producto/${product.slug}`} className="mt-4 block">
          <h3 className="max-w-[16ch] font-display text-[28px] leading-[1.04] tracking-[-0.01em] text-ink transition-colors group-hover:text-claret md:text-[32px]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 max-w-[34ch] text-[13.5px] leading-relaxed text-ink/60">
          {product.tagline}
        </p>

        <ul className="mt-6 space-y-1.5 border-t border-ink/10 pt-5">
          {product.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex gap-2.5 text-[12.5px] leading-snug text-ink/55"
            >
              <span className="mt-[7px] h-px w-2.5 shrink-0 bg-claret" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
          <div>
            <p className="label-mono text-ink/40">{t.product.from}</p>
            <p className="mt-1 font-display text-[30px] leading-none tabular-nums text-ink">
              {product.openPrice ? t.product.tbd : formatMXN(product.price)}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/35">
              {t.product.taxIncluded}
            </p>
          </div>
          <Link
            href={`/producto/${product.slug}`}
            aria-label={`Ver ${product.name}`}
            className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink/50 transition-all duration-300 group-hover:border-claret group-hover:bg-claret group-hover:text-paper"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
          </Link>
        </div>

        <AddToCartButton product={product} className="mt-5 w-full" />
      </div>
    </article>
  );
}