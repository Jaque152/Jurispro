import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

type Doc = {
  slug: string;
  index: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const DOCS: Doc[] = [
  {
    slug: "terminos-y-condiciones",
    index: "T-01",
    title: "Términos y condiciones de uso",
    updated: "Enero 2026",
    intro:
      "Estos términos regulan el acceso y la contratación de servicios jurídicos a través del sitio de Jurispro .",
    sections: [
      {
        heading: "1. Objeto",
        body: [
          "El presente documento regula el uso del sitio y la contratación en línea de los servicios legales publicados en la tienda. Al realizar un pedido, el cliente manifiesta haber leído y aceptado estos términos.",
          "Los servicios se prestan de forma remota, salvo que la propuesta indique expresamente lo contrario.",
        ],
      },
      {
        heading: "2. Alcance de los servicios",
        body: [
          "Cada servicio publica su alcance, entregables y plazo estimado. Cualquier actividad fuera de ese alcance requiere una cotización adicional aceptada por escrito.",
          "La contratación de un servicio no constituye una relación de representación legal en juicio, salvo pacto expreso.",
        ],
      },
      {
        heading: "3. Precios y facturación",
        body: [
          "Los precios se expresan en pesos mexicanos (MXN) y no incluyen el Impuesto al Valor Agregado, que se calcula al momento del pago.",
          "Emitimos CFDI 4.0 el mismo día del pago siempre que los datos fiscales se hayan capturado correctamente en el proceso de compra.",
        ],
      },
      {
        heading: "4. Responsabilidad",
        body: [
          "Las opiniones legales se emiten con base en la información proporcionada por el cliente. La omisión o inexactitud de dicha información libera al despacho de responsabilidad por el resultado.",
        ],
      },
    ],
  },
  {
    slug: "reembolsos-y-cancelaciones",
    index: "T-02",
    title: "Política de reembolsos y cancelaciones",
    updated: "Enero 2026",
    intro:
      "Condiciones aplicables a la cancelación de servicios contratados y a la devolución de honorarios.",
    sections: [
      {
        heading: "1. Cancelación antes del inicio",
        body: [
          "Puedes cancelar cualquier servicio dentro de las 24 horas siguientes al pago, siempre que el trabajo no haya iniciado, con reembolso del 100% del importe pagado.",
        ],
      },
      {
        heading: "2. Servicios iniciados",
        body: [
          "Si el abogado asignado ya inició la revisión documental o la sesión fue agendada, se retendrá el 30% del importe por concepto de gastos de apertura de expediente.",
          "Los servicios entregados en su totalidad no son reembolsables.",
        ],
      },
      {
        heading: "3. Reprogramación",
        body: [
          "Las sesiones pueden reprogramarse sin costo con al menos 12 horas de anticipación. Las inasistencias sin aviso se consideran sesión consumida.",
        ],
      },
      {
        heading: "4. Plazos de devolución",
        body: [
          "Los reembolsos se procesan por la misma vía de pago dentro de los 10 días hábiles siguientes a la autorización.",
        ],
      },
    ],
  },
  {
    slug: "aviso-de-privacidad",
    index: "T-03",
    title: "Aviso de privacidad",
    updated: "Enero 2026",
    intro:
      "Jurispro  es responsable del tratamiento de los datos personales que nos proporcionas.",
    sections: [
      {
        heading: "1. Datos que recabamos",
        body: [
          "Nombre, datos de contacto, domicilio, información fiscal y la documentación que compartas para la atención de tu asunto.",
        ],
      },
      {
        heading: "2. Finalidades",
        body: [
          "Prestar los servicios contratados, emitir comprobantes fiscales, dar seguimiento a tu expediente y cumplir obligaciones legales.",
          "Finalidades secundarias: enviarte comunicaciones sobre cambios normativos relevantes. Puedes oponerte en cualquier momento.",
        ],
      },
      {
        heading: "3. Confidencialidad",
        body: [
          "Toda la información se maneja bajo secreto profesional y protocolos internos de seguridad. No compartimos datos con terceros salvo obligación legal.",
        ],
      },
      {
        heading: "4. Derechos ARCO",
        body: [
          "Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiendo a resuelve@jurispro.com.mx.",
        ],
      },
    ],
  },
];

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS.find((d) => d.slug === slug);
  return { title: doc?.title ?? "Documento legal" };
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const doc = DOCS.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        index={doc.index}
        kicker={`Actualizado · ${doc.updated}`}
        title={doc.title}
        description={doc.intro}
        breadcrumb={[
          { href: "/", label: "Inicio" },
          { href: `/legal/${doc.slug}`, label: "Legal" },
        ]}
      />

      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav className="lg:col-span-3">
              <p className="label-mono text-ink/45">Documentos</p>
              <ul className="mt-5 space-y-3 border-t border-ink/15 pt-5">
                {DOCS.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/legal/${item.slug}`}
                      className={
                        item.slug === doc.slug
                          ? "font-display text-[19px] leading-tight text-claret"
                          : "font-display text-[19px] leading-tight text-ink/55 transition-colors hover:text-claret"
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="lg:col-span-8 lg:col-start-5">
              {doc.sections.map((section) => (
                <section
                  key={section.heading}
                  className="border-t border-ink/15 py-9 first:border-t-0 first:pt-0"
                >
                  <h2 className="font-display text-[27px] leading-tight text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="max-w-[70ch] text-[14.5px] leading-relaxed text-ink/65"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <p className="mt-6 border-t border-ink/15 pt-8 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-ink/35">
                Documento de referencia con fines de demostración. Solicita la
                versión firmada al despacho.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
