"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Action } from "@/components/ui/action";
import { useLanguage } from "@/lib/language-context";

export function ContactSection({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLanguage();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    
    // Extracción de datos
    const nombre = String(data.get("nombre") ?? "").trim();
    const telefono = String(data.get("telefono") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const asunto = String(data.get("asunto") ?? "").trim();
    const mensaje = String(data.get("mensaje") ?? "").trim();

    // Validaciones
    if (!nombre) next.nombre = t.contact.errors.name;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t.contact.errors.email;
    if (!asunto) next.asunto = t.contact.errors.subject;
    if (mensaje.length < 12) next.mensaje = t.contact.errors.message;

    setErrors(next);

    // Si no hay errores, disparamos el fetch a nuestra nueva API
    if (Object.keys(next).length === 0) {
      setSending(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, telefono, email, asunto, mensaje, lang }),
        });

        if (res.ok) {
          setSent(true);
        } else {
          console.error("Error en la respuesta del servidor");
        }
      } catch (error) {
        console.error("Error de red al enviar contacto:", error);
      } finally {
        setSending(false);
      }
    }
  };

  return (
    <section
      id="contacto"
      className="grain relative overflow-hidden bg-wine text-paper"
    >
      <div className="relative mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.24em] text-blush">
                {compact ? "01" : "05"}
              </span>
              <span className="h-px w-12 bg-blush/60" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-paper/55">
                {t.contact.kicker}
              </span>
            </div>

            <h2 className="display-md mt-6 text-paper">
              {t.contact.titleStart}
              <em className="text-blush">{t.contact.titleHighlight}</em>
              {t.contact.titleEnd}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[14.5px] leading-relaxed text-paper/60">
              {t.contact.description}
            </p>

            <Accordion
              type="single"
              collapsible
              defaultValue="direccion"
              className="mt-10 border-t border-paper/15"
            >
              {t.contact.details.map((detail) => (
                <AccordionItem
                  key={detail.id}
                  value={detail.id}
                  className="border-b border-paper/15"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-[22px] text-paper hover:text-blush hover:no-underline [&>svg]:text-blush">
                    {detail.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[14px] leading-relaxed text-paper/60">
                    {detail.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:col-span-7">
            {sent ? (
              <div className="flex h-full min-h-[420px] flex-col items-start justify-center border border-paper/20 bg-paper/[0.04] p-10">
                <span className="flex h-12 w-12 items-center justify-center bg-claret text-paper">
                  <Check className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-8 font-display text-[34px] leading-tight text-paper">
                  {t.contact.successTitle}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[14.5px] leading-relaxed text-paper/60">
                  {t.contact.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-blush underline-offset-4 hover:underline"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-paper/15 bg-paper/[0.03] p-7 md:p-10"
              >
                <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
                  <Field
                    name="nombre"
                    label={t.contact.nameLabel}
                    required
                    error={errors.nombre}
                    disabled={sending}
                  />
                  <Field
                    name="telefono"
                    label={t.contact.phoneLabel}
                    type="tel"
                    disabled={sending}
                  />
                  <Field
                    name="email"
                    label={t.contact.emailLabel}
                    type="email"
                    required
                    error={errors.email}
                    disabled={sending}
                  />
                  <Field
                    name="asunto"
                    label={t.contact.subjectLabel}
                    required
                    error={errors.asunto}
                    disabled={sending}
                  />
                </div>

                <div className="mt-7">
                  <label htmlFor="mensaje" className="label-mono text-paper/50">
                    {t.contact.messageLabel} <span className="text-blush">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    disabled={sending}
                    className="mt-2 w-full resize-none border-0 border-b border-paper/25 bg-transparent py-3 text-[15px] text-paper outline-none transition-colors placeholder:text-paper/25 focus:border-blush disabled:opacity-50"
                    placeholder={t.contact.messagePlaceholder}
                  />
                  {errors.mensaje ? (
                    <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-blush">
                      {errors.mensaje}
                    </p>
                  ) : null}
                </div>

                <div className="mt-9 flex flex-wrap items-center justify-between gap-5">
                  <p className="max-w-[36ch] font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-paper/35">
                    {t.contact.privacyNotice}
                  </p>
                  <Action
                    type="submit"
                    variant="claret"
                    size="lg"
                    disabled={sending}
                  >
                    {sending 
                      ? (lang === "es" ? "Enviando..." : "Sending...") 
                      : t.contact.submitBtn
                    }
                    {!sending && <ArrowRight className="h-3 w-3" strokeWidth={1.6} />}
                  </Action>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
  disabled,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-mono text-paper/50">
        {label} {required ? <span className="text-blush">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        className="mt-2 w-full border-0 border-b border-paper/25 bg-transparent py-3 text-[15px] text-paper outline-none transition-colors placeholder:text-paper/25 focus:border-blush disabled:opacity-50"
      />
      {error ? (
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-blush">
          {error}
        </p>
      ) : null}
    </div>
  );
}