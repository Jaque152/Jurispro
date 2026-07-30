"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IVA_RATE, products, type Product } from "./products";

export type CartLine = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
};

export type OrderRecord = {
  number: string;
  createdAt: string;
  email: string;
  name: string;
  method: string;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  iva: number;
  total: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  discount: number;
  iva: number;
  total: number;
  coupon: string | null;
  isOpen: boolean;
  hydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (
    product: Product,
    opts?: { qty?: number; price?: number; note?: string; silent?: boolean },
  ) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  lastOrder: OrderRecord | null;
  saveOrder: (order: OrderRecord) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "lc.cart.v1";
const COUPON_KEY = "lc.coupon.v1";
const ORDER_KEY = "lc.order.v1";

/** Simple promo table — percentage off the subtotal. */
const COUPONS: Record<string, { pct: number; label: string }> = {
  PRIMERACONSULTA: { pct: 0.1, label: "10% en tu primer expediente" },
  CDMX2026: { pct: 0.15, label: "15% clientes Ciudad de México" },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);

  /* -------------------------------------------------- hydrate */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
      const savedCoupon = window.localStorage.getItem(COUPON_KEY);
      if (savedCoupon && COUPONS[savedCoupon]) setCoupon(savedCoupon);
      const savedOrder = window.localStorage.getItem(ORDER_KEY);
      if (savedOrder) setLastOrder(JSON.parse(savedOrder) as OrderRecord);
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  /* -------------------------------------------------- persist */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (coupon) window.localStorage.setItem(COUPON_KEY, coupon);
      else window.localStorage.removeItem(COUPON_KEY);
    } catch {
      /* storage unavailable */
    }
  }, [coupon, hydrated]);

  /* -------------------------------------------------- actions */
  const add: CartContextValue["add"] = useCallback((product, opts = {}) => {
    const qty = Math.max(1, opts.qty ?? 1);
    const price = opts.price ?? product.price;
    const lineId = product.openPrice ? `${product.id}:${price}` : product.id;

    setLines((prev) => {
      const existing = prev.find((l) => l.id === lineId);
      if (existing) {
        return prev.map((l) =>
          l.id === lineId ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [
        ...prev,
        {
          id: lineId,
          slug: product.slug,
          name: product.name,
          price,
          qty,
          note: opts.note,
        },
      ];
    });

    if (!opts.silent) setIsOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 99) } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const key = code.trim().toUpperCase();
    if (!key) return { ok: false, message: "Escribe un código." };
    if (!COUPONS[key])
      return { ok: false, message: "El código no es válido o expiró." };
    setCoupon(key);
    return { ok: true, message: COUPONS[key].label };
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const saveOrder = useCallback((order: OrderRecord) => {
    setLastOrder(order);
    try {
      window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch {
      /* storage unavailable */
    }
  }, []);

  /* -------------------------------------------------- totals */
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.qty, 0),
    [lines],
  );
  const discount = useMemo(
    () => (coupon ? Math.round(subtotal * COUPONS[coupon].pct * 100) / 100 : 0),
    [coupon, subtotal],
  );
  const iva = useMemo(
    () => Math.round((subtotal - discount) * IVA_RATE * 100) / 100,
    [subtotal, discount],
  );
  const total = subtotal - discount + iva;
  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines],
  );

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    discount,
    iva,
    total,
    coupon,
    isOpen,
    hydrated,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    add,
    setQty,
    remove,
    clear,
    applyCoupon,
    removeCoupon,
    lastOrder,
    saveOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function couponLabel(code: string | null) {
  if (!code) return null;
  return COUPONS[code]?.label ?? null;
}

export function findProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
