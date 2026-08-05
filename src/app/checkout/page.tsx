"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN, orderNumber } from "@/lib/format";
import { Action } from "@/components/ui/action";
import { PageHero } from "@/components/page-hero";
import { cn } from "@/lib/utils";

const USO_CFDI = [
  "G03 — Gastos en general",
  "G01 — Adquisición de mercancías",
  "P01 — Por definir",
  "D10 — Pagos por servicios educativos",
];

const PAISES = [
  { value: "MX", label: "México" },
  { value: "US", label: "Estados Unidos" },
  { value: "CA", label: "Canadá" },
  { value: "DE", label: "Alemania" },
  { value: "AR", label: "Argentina" },
  { value: "AU", label: "Australia" },
  { value: "BO", label: "Bolivia" },
  { value: "BR", label: "Brasil" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CO", label: "Colombia" },
  { value: "KR", label: "Corea del Sur" },
  { value: "CR", label: "Costa Rica" },
  { value: "CU", label: "Cuba" },
  { value: "EC", label: "Ecuador" },
  { value: "SV", label: "El Salvador" },
  { value: "AE", label: "Emiratos Árabes Unidos" },
  { value: "ES", label: "España" },
  { value: "FR", label: "Francia" },
  { value: "GT", label: "Guatemala" },
  { value: "HN", label: "Honduras" },
  { value: "IN", label: "India" },
  { value: "IE", label: "Irlanda" },
  { value: "IT", label: "Italia" },
  { value: "JP", label: "Japón" },
  { value: "NI", label: "Nicaragua" },
  { value: "NL", label: "Países Bajos" },
  { value: "PA", label: "Panamá" },
  { value: "PY", label: "Paraguay" },
  { value: "PE", label: "Perú" },
  { value: "PT", label: "Portugal" },
  { value: "GB", label: "Reino Unido" },
  { value: "DO", label: "República Dominicana" },
  { value: "CH", label: "Suiza" },
  { value: "UY", label: "Uruguay" },
  { value: "VE", label: "Venezuela" },
];

const initialForm = {
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  empresa: "",
  calle: "",
  colonia: "",
  ciudad: "",
  estado: "",
  cp: "",
  pais: "MX",
  rfc: "",
  razon: "",
  uso: USO_CFDI[0],
  notas: "",
  tarjeta: "",
  vence: "",
  cvv: "",
  titular: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  
  // LIMPIEZA: Se eliminan discount y coupon de la extracción del contexto
  const {
    lines,
    subtotal,
    iva,
    total,
    count,
    hydrated,
    clear,
    saveOrder,
  } = useCart();

  const [form, setForm] = useState(initialForm);
  const [invoice, setInvoice] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const set = (key: keyof typeof initialForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const digits = useMemo(() => form.tarjeta.replace(/\D/g, ""), [form.tarjeta]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.nombre.trim()) next.nombre = t.checkoutPage.errors.required;
    if (!form.apellidos.trim()) next.apellidos = t.checkoutPage.errors.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = t.checkoutPage.errors.email;
    if (form.telefono.replace(/\D/g, "").length < 10)
      next.telefono = t.checkoutPage.errors.phone;
    if (!form.calle.trim()) next.calle = t.checkoutPage.errors.required;
    if (!form.ciudad.trim()) next.ciudad = t.checkoutPage.errors.required;
    if (!form.estado.trim()) next.estado = t.checkoutPage.errors.required;
    if (!/^\d{5}$/.test(form.cp.trim())) next.cp = t.checkoutPage.errors.zip;

    if (invoice) {
      if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i.test(form.rfc.trim()))
        next.rfc = t.checkoutPage.errors.rfc;
      if (!form.razon.trim()) next.razon = t.checkoutPage.errors.required;
    }

    if (digits.length < 15 || digits.length > 16)
      next.tarjeta = t.checkoutPage.errors.card;
    if (!/^\d{2}\/\d{2}$/.test(form.vence.trim())) next.vence = t.checkoutPage.errors.expiry;
    if (!/^\d{3,4}$/.test(form.cvv.trim())) next.cvv = t.checkoutPage.errors.cvv;
    if (!form.titular.trim()) next.titular = t.checkoutPage.errors.required;

    if (!terms) next.terms = t.checkoutPage.errors.terms;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      toast.error(t.checkoutPage.errors.toast);
      window.setTimeout(() => {
        document
          .querySelector("[data-error='true']")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
      return;
    }

    setProcessing(true);
    const orderId = orderNumber();

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: orderId,
          customer: {
            nombre: form.nombre.trim(),
            apellidos: form.apellidos.trim(),
            email: form.email.trim(),
            telefono: form.telefono.trim(),
            calle: form.calle.trim(),
            colonia: form.colonia.trim(),
            ciudad: form.ciudad.trim(),
            estado: form.estado.trim(),
            cp: form.cp.trim(),
            pais: form.pais,
          },
          lines,
          subtotal,
          iva,
          total,
          // LIMPIEZA: Ya no enviamos "discount" en el payload
          cardData: {
            number: form.tarjeta,
            expiry: form.vence,
            cvv: form.cvv,
            holder: form.titular,
          },
          lang, 
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Error procesando el pago.");
      }

      saveOrder({
        number: orderId,
        createdAt: new Date().toISOString(),
        email: form.email.trim(),
        name: `${form.nombre.trim()} ${form.apellidos.trim()}`,
        method: t.checkoutPage.paymentMethods[0].name,
        lines,
        subtotal,
        discount: 0, // Mantenemos 0 para evitar romper el OrderRecord si aún lo requiere
        iva,
        total,
      });

      clear();
      setProcessing(false);
      router.push("/checkout/confirmacion");
    } catch (err: unknown) {
      setProcessing(false);
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado al contactar con el banco.";
      toast.error(errorMessage);
    }
  };

  if (!hydrated) {
    return (
      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-32 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
            {t.checkoutPage.loading}
          </p>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHero
          index="07"
          kicker="Pago"
          title="Checkout"
          breadcrumb={[
            { href: "/", label: t.cartPage.breadcrumbs.home },
            { href: "/carrito", label: t.cartPage.breadcrumbs.cart },
            { href: "/checkout", label: t.checkoutPage.breadcrumbs.checkout },
          ]}
        />
        <section className="bg-parchment">
          <div className="mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
            <div className="flex max-w-2xl flex-col items-start gap-7 border border-ink/12 bg-paper p-10 md:p-16">
              <span className="h-px w-16 bg-claret" />
              <h2 className="display-sm text-ink">
                {t.checkoutPage.emptyTitle}
              </h2>
              <p className="text-[14.5px] leading-relaxed text-ink/60">
                {t.checkoutPage.emptyDesc}
              </p>
              <Action href="/tienda" variant="solid" size="lg">
                {t.cartPage.goToStore}
                <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
              </Action>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        index="07"
        kicker={t.checkoutPage.kicker}
        title={
          <>
            {t.checkoutPage.titleStart} <em className="text-blush">{t.checkoutPage.titleHighlight}</em>
          </>
        }
        description={t.checkoutPage.description}
        breadcrumb={[
          { href: "/", label: t.cartPage.breadcrumbs.home },
          { href: "/carrito", label: t.cartPage.breadcrumbs.cart },
          { href: "/checkout", label: t.checkoutPage.breadcrumbs.checkout },
        ]}
      />

      <section className="bg-parchment">
        <form
          onSubmit={submit}
          noValidate
          className="mx-auto grid max-w-[1680px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-7 xl:col-span-8">
            {/* BLOCKS DEL FORMULARIO SE MANTIENEN IGUAL */}
            <Block index="01" title={t.checkoutPage.blocks.contact}>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Field label={t.checkoutPage.fields.name} value={form.nombre} onChange={(v) => set("nombre", v)} error={errors.nombre} required disabled={processing} />
                <Field label={t.checkoutPage.fields.lastName} value={form.apellidos} onChange={(v) => set("apellidos", v)} error={errors.apellidos} required disabled={processing} />
                <Field label={t.checkoutPage.fields.email} type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} required disabled={processing} />
                <Field label={t.checkoutPage.fields.phone} type="tel" value={form.telefono} onChange={(v) => set("telefono", v)} error={errors.telefono} required disabled={processing} />
                <Field label={t.checkoutPage.fields.company} value={form.empresa} onChange={(v) => set("empresa", v)} className="sm:col-span-2" disabled={processing} />
              </div>
            </Block>

            <Block index="02" title={t.checkoutPage.blocks.address}>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Field label={t.checkoutPage.fields.street} value={form.calle} onChange={(v) => set("calle", v)} error={errors.calle} required className="sm:col-span-2" disabled={processing} />
                <Field label={t.checkoutPage.fields.suburb} value={form.colonia} onChange={(v) => set("colonia", v)} disabled={processing} />
                <Field label={t.checkoutPage.fields.zip} value={form.cp} onChange={(v) => set("cp", v.replace(/\D/g, "").slice(0, 5))} error={errors.cp} required mono disabled={processing} />
                <Field label={t.checkoutPage.fields.city} value={form.ciudad} onChange={(v) => set("ciudad", v)} error={errors.ciudad} required disabled={processing} />
                <Field label={t.checkoutPage.fields.state} value={form.estado} onChange={(v) => set("estado", v)} error={errors.estado} required disabled={processing} />
                <div className="sm:col-span-2">
                  <span className="label-mono text-ink/45">{lang === "en" ? "Country" : "País"}</span>
                  <select disabled={processing} value={form.pais} onChange={(e) => set("pais", e.target.value)} className="field mt-2 cursor-pointer appearance-none">
                    {PAISES.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                  </select>
                </div>
              </div>
            </Block>

            <Block index="04" title={t.checkoutPage.blocks.payment}>
              <div className="border border-ink/15 bg-paper p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5 mb-6">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60">
                    <Lock className="h-3.5 w-3.5 text-claret" strokeWidth={1.6} />
                    Pasarela procesada por KEYCOP
                  </div>
                  <div className="relative h-7 w-28">
                    <Image
                      src="/logo-keycop-2.png"
                      alt="KEYCOP Payment Gateway"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <Field
                    label={t.checkoutPage.fields.cardNum}
                    value={form.tarjeta}
                    onChange={(v) =>
                      set(
                        "tarjeta",
                        v
                          .replace(/\D/g, "")
                          .slice(0, 16)
                          .replace(/(.{4})/g, "$1 ")
                          .trim(),
                      )
                    }
                    error={errors.tarjeta}
                    required
                    mono
                    placeholder="4242 4242 4242 4242"
                    className="sm:col-span-2"
                    disabled={processing}
                  />
                  <Field
                    label={t.checkoutPage.fields.expiry}
                    value={form.vence}
                    onChange={(v) => {
                      const d = v.replace(/\D/g, "").slice(0, 4);
                      set(
                        "vence",
                        d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d,
                      );
                    }}
                    error={errors.vence}
                    required
                    mono
                    placeholder="12/28"
                    disabled={processing}
                  />
                  <Field
                    label={t.checkoutPage.fields.cvv}
                    type="password"
                    value={form.cvv}
                    onChange={(v) =>
                      set("cvv", v.replace(/\D/g, "").slice(0, 4))
                    }
                    error={errors.cvv}
                    required
                    mono
                    placeholder="•••"
                    disabled={processing}
                  />
                  <Field
                    label={t.checkoutPage.fields.cardholder}
                    value={form.titular}
                    onChange={(v) => set("titular", v)}
                    error={errors.titular}
                    required
                    className="sm:col-span-2"
                    disabled={processing}
                  />
                </div>
              </div>
            </Block>

            <Block index="05" title={t.checkoutPage.blocks.notes}>
              <textarea
                value={form.notas}
                onChange={(e) => set("notas", e.target.value)}
                rows={4}
                placeholder={t.checkoutPage.fields.notesPlaceholder}
                className="field resize-none"
                disabled={processing}
              />
            </Block>

            <div data-error={errors.terms ? "true" : undefined}>
              <label className="flex cursor-pointer items-start gap-4">
                <Box checked={terms} onChange={() => setTerms(!terms)} label={t.checkoutPage.errors.terms} />
                <span className="text-[13.5px] leading-relaxed text-ink/65">
                  {t.checkoutPage.terms.agree}
                  <Link href="/legal/terminos-y-condiciones" className="text-claret underline underline-offset-4">
                    {t.checkoutPage.terms.termsLink}
                  </Link>
                  , {t.checkoutPage.terms.and}
                  <Link href="/legal/reembolsos-y-cancelaciones" className="text-claret underline underline-offset-4">
                    {t.checkoutPage.terms.refundsLink}
                  </Link>{" "}
                  {t.checkoutPage.terms.and}
                  <Link href="/legal/aviso-de-privacidad" className="text-claret underline underline-offset-4">
                    {t.checkoutPage.terms.privacyLink}
                  </Link>
                  .
                </span>
              </label>
              {errors.terms ? (
                <p className="mt-2 pl-8 font-mono text-[9.5px] uppercase tracking-[0.16em] text-destructive">
                  {errors.terms}
                </p>
              ) : null}
            </div>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="border border-ink/15 bg-paper lg:sticky lg:top-32">
              <div className="border-b border-ink/12 p-7 md:p-8">
                <p className="label-mono text-claret">{t.checkoutPage.summaryTitle}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                  {count} {count === 1 ? t.cartPage.itemsCount : t.cartPage.itemsCountPlural}
                </p>

                <ul className="mt-6 space-y-4">
                  {lines.map((line) => (
                    <li key={line.id} className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="max-w-[22ch] font-display text-[19px] leading-tight text-ink">{line.name}</p>
                        <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/40">
                          {line.qty} × {formatMXN(line.price)}
                          {line.note ? ` · ${line.note}` : ""}
                        </p>
                      </div>
                      <p className="shrink-0 font-mono text-[12px] tabular-nums text-ink/80">
                        {formatMXN(line.price * line.qty)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* LIMPIEZA: Eliminada la fila de Descuentos condicional que ya no existe */}
              <div className="space-y-3 border-b border-ink/12 p-7 font-mono text-[11.5px] tabular-nums md:p-8">
                <SumRow label={t.cartPage.summary.subtotal} value={formatMXN(subtotal)} />
                <SumRow label={t.cartPage.summary.tax} value={formatMXN(iva)} />
              </div>

              <div className="p-7 md:p-8">
                <div className="flex items-end justify-between">
                  <span className="label-mono text-ink/50">{t.cartPage.summary.total}</span>
                  <span className="font-display text-[38px] leading-none tabular-nums text-ink">
                    {formatMXN(total)}
                  </span>
                </div>

                <Action type="submit" variant="claret" size="lg" className="mt-7 w-full" disabled={processing}>
                  {processing ? t.checkoutPage.processing : t.checkoutPage.payBtn}
                  {!processing ? <ArrowRight className="h-3 w-3" strokeWidth={1.6} /> : null}
                </Action>

                <div className="mt-6 flex items-start gap-3 border-t border-ink/12 pt-6">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-claret" strokeWidth={1.4} />
                  <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-ink/40">
                    {t.checkoutPage.securityBadge}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14 border-t border-ink/15 pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-claret">{index}</span>
        <h2 className="font-display text-[28px] leading-none text-ink">{title}</h2>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, error, required, type = "text", mono, placeholder, className, disabled }: {
  label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; type?: string; mono?: boolean; placeholder?: string; className?: string; disabled?: boolean;
}) {
  return (
    <div className={className} data-error={error ? "true" : undefined}>
      <span className="label-mono text-ink/45">
        {label} {required ? <span className="text-claret">*</span> : null}
      </span>
      <input disabled={disabled} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={cn("field mt-2 disabled:opacity-50", mono && "font-mono tracking-[0.08em]", error && "border-destructive")} />
      {error ? <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-destructive">{error}</p> : null}
    </div>
  );
}

function Box({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
      <input type="checkbox" aria-label={label} checked={checked} onChange={onChange} className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0" />
      <span aria-hidden="true" className={cn("flex h-4 w-4 items-center justify-center border transition-colors peer-focus-visible:ring-1 peer-focus-visible:ring-claret peer-focus-visible:ring-offset-2", checked ? "border-claret bg-claret" : "border-ink/30 bg-transparent")}>
        {checked ? <span className="h-1.5 w-1.5 bg-paper" /> : null}
      </span>
    </span>
  );
}

function SumRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={accent ? "text-claret" : "text-ink/55"}>{label}</span>
      <span className={accent ? "text-claret" : "text-ink/80"}>{value}</span>
    </div>
  );
}
