"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Action } from "@/components/ui/action";
import { Reveal } from "@/components/reveal";
import { ContactSection } from "@/components/contact-section";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/lib/language-context";
import { getProducts } from "@/lib/products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { t, lang } = useLanguage();
  
  // Obtenemos los productos dinámicamente según el idioma
  const products = getProducts(lang);
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* ─────────────────────────────────────────── HERO */}
      <section className="grain relative overflow-hidden border-b border-ink/12 bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 md:px-10">
          <div className="grid gap-10 pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-20">
            <div className="lg:col-span-7 xl:col-span-7">
              <div className="flex items-center gap-4 animate-fade">
                <span className="h-px w-10 bg-claret" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-bark">
                  {t.homePage.hero.kicker}
                </span>
              </div>

              <h1 className="display-xl mt-8 text-ink">
                <span className="block animate-rise [animation-delay:80ms]">
                  {t.homePage.hero.title1}
                </span>
                <span className="block animate-rise italic text-claret [animation-delay:200ms]">
                  {t.homePage.hero.title2}
                </span>
                <span className="block animate-rise [animation-delay:320ms]">
                  {t.homePage.hero.title3}
                </span>
              </h1>

              <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="max-w-[46ch] animate-rise text-[15px] leading-relaxed text-ink/65 [animation-delay:420ms]">
                  {t.homePage.hero.description}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 animate-rise [animation-delay:520ms]">
                <Action href="/tienda" variant="solid" size="lg">
                  {t.homePage.hero.btnStore}
                  <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                </Action>
                <Action href="/cotiza" variant="outline" size="lg">
                  {t.homePage.hero.btnQuote}
                </Action>
              </div>
            </div>

            {/* image column */}
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-wine animate-wipe [animation-delay:200ms] lg:aspect-[3/4]">
                <Image
                  src="https://ext.same-assets.com/4174519126/2879693646.jpeg"
                  alt="Balanza de la justicia"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover duotone opacity-90 transition-transform duration-[1600ms] hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-wine/35 mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-paper/60">
                    {t.homePage.hero.imgCaption}
                  </p>
                  <p className="mt-2 max-w-[24ch] font-display text-[24px] leading-tight text-paper">
                    {t.homePage.hero.imgText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── PRACTICE MARQUEE */}
      <section className="overflow-hidden border-b border-ink/12 bg-stone/60 py-4">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {t.homePage.practices.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center gap-8 whitespace-nowrap px-8 font-display text-[22px] text-ink/45"
                >
                  {item}
                  <span className="text-[10px] text-claret">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────── CÓNOCENOS */}
      <section id="conocenos" className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] tracking-[0.24em] text-claret">
                    01
                  </span>
                  <span className="h-px w-12 bg-claret/50" />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/50">
                    {t.homePage.about.kicker}
                  </span>
                </div>
                <h2 className="display-md mt-6 text-ink">
                  {t.homePage.about.titleStart}
                  <em className="text-claret">{t.homePage.about.titleHighlight}</em>{t.homePage.about.titleEnd}
                </h2>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={120}>
              <p className="max-w-[62ch] font-display text-[26px] leading-[1.28] text-ink/85 md:text-[32px]">
                {t.homePage.about.lead}
              </p>
              <p className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-ink/60">
                {t.homePage.about.body}
              </p>

              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                <FeaturePanel
                  image="https://ext.same-assets.com/4174519126/1267390727.jpeg"
                  index={t.homePage.about.feature1.index}
                  title={t.homePage.about.feature1.title}
                  body={t.homePage.about.feature1.body}
                />
                <FeaturePanel
                  image="https://ext.same-assets.com/4174519126/3614570213.jpeg"
                  index={t.homePage.about.feature2.index}
                  title={t.homePage.about.feature2.title}
                  body={t.homePage.about.feature2.body}
                />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Action href="/cotiza" variant="solid" size="md">
                  {t.homePage.about.btnQuote}
                  <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
                </Action>
                <Action href="/pago-cotizacion" variant="outline" size="md">
                  {t.homePage.about.btnPayQuote}
                </Action>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── POR QUÉ ELEGIRNOS */}
      <section className="border-y border-ink/12 bg-paper">
        <div className="mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.24em] text-claret">
                  02
                </span>
                <span className="h-px w-12 bg-claret/50" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/50">
                  {t.homePage.why.kicker}
                </span>
              </div>
              <h2 className="display-md mt-6 whitespace-pre-wrap text-ink">
                {t.homePage.why.title}
              </h2>
              <p className="mt-7 max-w-[44ch] text-[14.5px] leading-relaxed text-ink/60">
                {t.homePage.why.desc}
              </p>

              <div className="mt-12 hidden aspect-[16/10] w-full overflow-hidden lg:block">
                <Image
                  src="https://ext.same-assets.com/4174519126/99324081.jpeg"
                  alt="Documento legal"
                  width={900}
                  height={560}
                  className="h-full w-full object-cover duotone"
                />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={120}>
              <Accordion
                type="single"
                collapsible
                defaultValue="filosofia"
                className="border-t border-ink/15"
              >
                {t.homePage.why.pillars.map((pillar) => (
                  <AccordionItem
                    key={pillar.id}
                    value={pillar.id}
                    className="border-b border-ink/15"
                  >
                    <AccordionTrigger className="py-7 text-ink hover:text-claret [&>span]:text-claret">
                      <span className="flex items-baseline gap-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-claret">
                          {pillar.index}
                        </span>
                        <span className="font-display text-[28px] leading-none md:text-[34px]">
                          {pillar.title}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pl-0 md:pl-[3.6rem]">
                      <p className="max-w-[58ch] text-[14.5px] leading-relaxed text-ink/60">
                        {pillar.body}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Action
                href="/tienda"
                variant="solid"
                size="lg"
                className="mt-10"
              >
                {t.homePage.why.btnStore}
                <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
              </Action>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── DESTACADOS */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.24em] text-claret">
                  03
                </span>
                <span className="h-px w-12 bg-claret/50" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/50">
                  {t.homePage.featured.kicker}
                </span>
              </div>
              <h2 className="display-md mt-6 text-ink">
                {t.homePage.featured.titleStart}
                <em className="text-claret"> {t.homePage.featured.titleHighlight}</em>{t.homePage.featured.titleEnd}
              </h2>
            </div>
            <Link
              href="/tienda"
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 hover:text-claret"
            >
              {t.homePage.featured.viewAll.replace("{count}", products.filter((p) => !p.openPrice).length.toString())}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.4}
              />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 90}>
                <ProductCard product={product} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── PROCESO */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div className="relative mx-auto max-w-[1680px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.24em] text-blush">
                04
              </span>
              <span className="h-px w-12 bg-blush/50" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-paper/50">
                {t.homePage.process.kicker}
              </span>
            </div>
            <h2 className="display-md mt-6 max-w-[16ch] text-paper">
              {t.homePage.process.title}
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-px border border-paper/12 bg-paper/12 md:grid-cols-2 xl:grid-cols-4">
            {t.homePage.process.steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 80} as="li">
                <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-wine">
                  <span className="font-display text-[52px] leading-none text-blush/70">
                    {item.step}
                  </span>
                  <h3 className="mt-6 font-display text-[24px] leading-tight text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-paper/55">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────────────────────────────────── CONTACTO */}
      <ContactSection />
    </>
  );
}

function FeaturePanel({ image, index, title, body }: { image: string; index: string; title: string; body: string }) {
  return (
    <div className="group relative aspect-[5/4] overflow-hidden bg-wine">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 30vw"
        className="object-cover duotone opacity-80 transition-transform duration-[1400ms] group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-blush">
          {index}
        </p>
        <h3 className="mt-2 font-display text-[26px] leading-none text-paper">
          {title}
        </h3>
        <p className="mt-2 max-w-[30ch] text-[12.5px] leading-relaxed text-paper/60">
          {body}
        </p>
      </div>
    </div>
  );
}