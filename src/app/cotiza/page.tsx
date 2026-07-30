"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Action } from "@/components/ui/action";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export default function CotizaPage() {
  const { t } = useLanguage();
  
  const [sent, setSent] = useState(false);
  const [service, setService] = useState<string>(t.quotePage.form.services[0]);
  const [budget, setBudget] = useState<string>(t.quotePage.form.budgets[1]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("nombre") ?? "").trim()) next.nombre = t.quotePage.errors.required;
    const email = String(data.get("correo") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.correo = t.quotePage.errors.email;
    if (String(data.get("necesidad") ?? "").trim().length < 20)
      next.necesidad = t.quotePage.errors.need;
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <>
      <PageHero
        index="03"
        kicker={t.quotePage.kicker}
        title={
          <>
            {t.quotePage.titleStart}<em className="text-blush">{t.quotePage.titleHighlight}</em>
          </>
        }
        description={t.quotePage.description}
        breadcrumb={[
          { href: "/", label: t.quotePage.breadcrumbs.home },
          { href: "/cotiza", label: t.quotePage.breadcrumbs.quote },
        ]}
      />

      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* form */}
            <div className="lg:col-span-7 xl:col-span-8">
              {sent ? (
                <div className="flex flex-col items-start gap-7 border border-ink/15 bg-paper p-10 md:p-14">
                  <span className="flex h-12 w-12 items-center justify-center bg-claret text-paper">
                    <Check className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h2 className="display-sm max-w-[20ch] text-ink">
                    {t.quotePage.success.title}
                  </h2>
                  <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-ink/60">
                    {t.quotePage.success.body}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Action href="/pago-cotizacion" variant="claret" size="lg">
                      {t.quotePage.success.payBtn}
                      <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                    </Action>
                    <Action
                      variant="outline"
                      size="lg"
                      onClick={() => setSent(false)}
                    >
                      {t.quotePage.success.newBtn}
                    </Action>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="border border-ink/15 bg-paper p-7 md:p-10"
                >
                  <p className="label-mono text-claret">
                    {t.quotePage.form.title}
                  </p>

                  <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    {/* AQUI SE CORRIGEN LOS 3 ERRORES LEYENDO DE t.contact */}
                    <Field
                      name="nombre"
                      label={t.contact.nameLabel} 
                      required
                      error={errors.nombre}
                    />
                    <Field 
                      name="telefono" 
                      label={t.contact.phoneLabel} 
                      type="tel" 
                    />
                    <Field
                      name="correo"
                      label={t.contact.emailLabel}
                      type="email"
                      required
                      error={errors.correo}
                    />
                    <Field 
                      name="empresa" 
                      label={t.quotePage.form.company} 
                    />
                  </div>

                  <fieldset className="mt-10">
                    <legend className="label-mono text-ink/45">
                      {t.quotePage.form.serviceReq}
                    </legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.quotePage.form.services.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setService(item)}
                          className={cn(
                            "border px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors",
                            service === item
                              ? "border-claret bg-claret text-paper"
                              : "border-ink/20 text-ink/60 hover:border-claret hover:text-claret",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="mt-10">
                    <legend className="label-mono text-ink/45">
                      {t.quotePage.form.budget}
                    </legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.quotePage.form.budgets.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setBudget(item)}
                          className={cn(
                            "border px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em] tabular-nums transition-colors",
                            budget === item
                              ? "border-claret bg-claret text-paper"
                              : "border-ink/20 text-ink/60 hover:border-claret hover:text-claret",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-10">
                    <label
                      htmlFor="necesidad"
                      className="label-mono text-ink/45"
                    >
                      {t.quotePage.form.need} <span className="text-claret">*</span>
                    </label>
                    <textarea
                      id="necesidad"
                      name="necesidad"
                      rows={6}
                      placeholder={t.quotePage.form.needPlaceholder}
                      className="field mt-2 resize-none"
                    />
                    {errors.necesidad ? (
                      <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-destructive">
                        {errors.necesidad}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-ink/12 pt-8">
                    <p className="max-w-[38ch] font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-ink/35">
                      {t.quotePage.form.privacyText}
                    </p>
                    <Action type="submit" variant="claret" size="lg">
                      {t.quotePage.form.submit}
                      <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                    </Action>
                  </div>
                </form>
              )}
            </div>

            {/* aside copy */}
            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="border-t border-ink/15 pt-8">
                <h2 className="display-sm max-w-[16ch] text-ink">
                  {t.quotePage.aside.title}
                </h2>
                <div className="mt-8 space-y-8">
                  {t.quotePage.aside.steps.map((step) => (
                    <Note
                      key={step.index}
                      index={step.index}
                      title={step.title}
                      body={step.body}
                    />
                  ))}
                </div>

                <div className="mt-10 border border-ink/15 bg-paper p-7">
                  <p className="label-mono text-claret">
                    {t.quotePage.aside.payBox.title}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink/60">
                    {t.quotePage.aside.payBox.desc}
                  </p>
                  <Action
                    href="/pago-cotizacion"
                    variant="solid"
                    size="md"
                    className="mt-6 w-full"
                  >
                    {t.quotePage.aside.payBox.btn}
                    <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                  </Action>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-mono text-ink/45">
        {label} {required ? <span className="text-claret">*</span> : null}
      </label>
      <input id={name} name={name} type={type} className="field mt-2" />
      {error ? (
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Note({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-claret">
        {index}
      </span>
      <div>
        <h3 className="font-display text-[22px] leading-none text-ink">
          {title}
        </h3>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink/60">{body}</p>
      </div>
    </div>
  );
}