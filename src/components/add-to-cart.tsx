"use client";

import { useState } from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import type { Product } from "@/lib/products";
import { Action } from "@/components/ui/action";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  className,
  variant = "outline",
}: {
  product: Product;
  className?: string;
  variant?: "solid" | "claret" | "outline" | "ghost";
}) {
  const { add } = useCart();
  const { t } = useLanguage();

  if (product.openPrice) {
    return (
      <Action
        href={`/producto/${product.slug}`}
        variant={variant}
        size="sm"
        className={className}
      >
        {t.cart.captureAmount}
        <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
      </Action>
    );
  }

  return (
    <Action
      variant={variant}
      size="sm"
      className={className}
      onClick={() => {
        add(product);
        toast.success(t.cart.addedToast, {
          description: product.name,
        });
      }}
    >
      {t.cart.addBtn}
      <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
    </Action>
  );
}

export function AddToCartPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const { t } = useLanguage();
  const [qty, setQty] = useState(1);
  const [amount, setAmount] = useState("");
  const [folio, setFolio] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (product.openPrice) {
    const submit = () => {
      const value = Number.parseFloat(amount.replace(/[^0-9.]/g, ""));
      if (!folio.trim()) {
        setError(t.cart.errorFolio);
        return;
      }
      if (!value || value < 100) {
        setError(t.cart.errorAmount);
        return;
      }
      setError(null);
      add(product, {
        price: Math.round(value * 100) / 100,
        note: `Folio ${folio.trim().toUpperCase()}`,
      });
      toast.success(t.cart.quoteAddedToast, {
        description: `Folio ${folio.trim().toUpperCase()}`,
      });
      setAmount("");
      setFolio("");
    };

    return (
      <div className="border border-ink/15 bg-paper p-6">
        <p className="label-mono text-claret">{t.cart.quotePayment}</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="label-mono text-ink/50">{t.cart.folioLabel}</span>
            <input
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              placeholder={t.cart.folioPlaceholder}
              className="field mt-2 font-mono uppercase"
            />
          </label>
          <label className="block">
            <span className="label-mono text-ink/50">{t.cart.amountLabel}</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              placeholder="0.00"
              className="field mt-2 font-mono tabular-nums"
            />
          </label>
        </div>
        {error ? (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-destructive">
            {error}
          </p>
        ) : null}
        <Action
          variant="claret"
          size="lg"
          className="mt-6 w-full"
          onClick={submit}
        >
          {t.cart.addBtn}
          <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
        </Action>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-stretch gap-3">
      <div className="flex items-center border border-ink/20">
        <Step onClick={() => setQty((q) => Math.max(1, q - 1))} label={t.cart.addBtnSubtract}>
          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Step>
        <span className="min-w-12 text-center font-mono text-[12px] tabular-nums text-ink">
          {qty}
        </span>
        <Step onClick={() => setQty((q) => Math.min(99, q + 1))} label={t.cart.addBtnAdd}>
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Step>
      </div>

      <Action
        variant="claret"
        size="lg"
        className="flex-1 min-w-[220px]"
        onClick={() => {
          add(product, { qty });
          toast.success(t.cart.addedToast, { description: product.name });
        }}
      >
        {t.cart.addBtn}
        <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
      </Action>
    </div>
  );
}

function Step({
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
      className={cn(
        "flex h-14 w-11 items-center justify-center text-ink/60 transition-colors hover:bg-wine hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}