"use client";

// Nota: La exportación de `metadata` ha sido removida porque 
// este archivo ahora es un Client Component para soportar i18n.

import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/contact-section";
import { useLanguage } from "@/lib/language-context";

export default function ContactoPage() {
  const { t } = useLanguage();

  const CHANNELS = [
    {
      label: t.contactPage.channels[0].label,
      value: "+52 1 55 2583 8843",
      href: "tel:+525525838843",
      detail: t.contactPage.channels[0].detail,
    },
    {
      label: t.contactPage.channels[1].label,
      value: "resuelve@jurispro.com.mx",
      href: "mailto:resuelve@jurispro.com.mx",
      detail: t.contactPage.channels[1].detail,
    },
    {
      label: t.contactPage.channels[2].label,
      value: "Mariano Escobedo 375, Piso 14",
      href: "https://maps.google.com/?q=Mariano+Escobedo+375+CDMX",
      detail: t.contactPage.channels[2].detail,
    },
  ];

  return (
    <>
      <PageHero
        index="05"
        kicker={t.contactPage.kicker}
        title={
          <>
            {t.contactPage.titleStart}<em className="text-blush">{t.contactPage.titleHighlight}</em>
          </>
        }
        description={t.contactPage.description}
        breadcrumb={[
          { href: "/", label: t.contactPage.breadcrumbs.home },
          { href: "/contacto", label: t.contactPage.breadcrumbs.contact },
        ]}
      />

      <section className="border-b border-ink/12 bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ul className="lg:col-span-7">
              {CHANNELS.map((channel, i) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel="noreferrer"
                    className="group grid gap-3 border-b border-ink/12 py-8 sm:grid-cols-[auto_1fr] sm:gap-10"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-claret">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="label-mono block text-ink/45">
                        {channel.label}
                      </span>
                      <span className="mt-3 block font-display text-[30px] leading-none text-ink transition-colors group-hover:text-claret md:text-[38px]">
                        {channel.value}
                      </span>
                      <span className="mt-3 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/40">
                        {channel.detail}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-wine">
                <Image
                  src="https://ext.same-assets.com/4174519126/1189411628.jpeg"
                  alt="Oficinas JurisPro"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover duotone opacity-85"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-blush">
                    {t.contactPage.hqLabel}
                  </p>
                  <p className="mt-3 max-w-[24ch] font-display text-[26px] leading-tight text-paper">
                    {t.contactPage.hqAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection compact />
    </>
  );
}