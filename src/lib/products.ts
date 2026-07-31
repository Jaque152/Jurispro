export type Product = {
  id: string;
  slug: string;
  price: number;
  openPrice?: boolean;
  category: CategoryId;
  image: string;
  featured?: boolean;
  name: string;
  tagline: string;
  summary: string;
  features: string[];
  turnaround: string;
};

export type CategoryId =
  | "individuales"
  | "societaria"
  | "cumplimiento"
  | "extras"
  | "corporativa"
  | "orden";

export type Category = {
  id: CategoryId;
  index: string;
  image: string;
  name: string;
  kicker: string;
  description: string;
};

export type Language = "es" | "en";
export const IVA_RATE = 0.16;

const rawCategories = [
  {
    id: "individuales",
    index: "01",
    image: "https://ext.same-assets.com/4174519126/2098822115.jpeg",
    es: { name: "Servicios individuales", kicker: "Puntual", description: "Intervenciones acotadas para resolver una duda concreta sin abrir un expediente completo." },
    en: { name: "Individual services", kicker: "Specific", description: "Targeted interventions to resolve a specific doubt without opening a full case file." }
  },
  {
    id: "societaria",
    index: "02",
    image: "https://ext.same-assets.com/4174519126/1267390727.jpeg",
    es: { name: "Asesoría societaria", kicker: "Estructura", description: "Definición del vehículo corporativo correcto antes de constituir, invertir o reestructurar." },
    en: { name: "Corporate advisory", kicker: "Structure", description: "Definition of the correct corporate vehicle before incorporating, investing, or restructuring." }
  },
  {
    id: "cumplimiento",
    index: "03",
    image: "https://ext.same-assets.com/4174519126/3614570213.jpeg",
    es: { name: "Plataforma de cumplimiento normativo", kicker: "Compliance", description: "Programas anuales de cumplimiento dimensionados al tamaño y al riesgo de tu operación." },
    en: { name: "Regulatory compliance platform", kicker: "Compliance", description: "Annual compliance programs scaled to the size and risk of your operation." }
  },
  {
    id: "extras",
    index: "04",
    image: "https://ext.same-assets.com/4174519126/99324081.jpeg",
    es: { name: "Asesorías legales extra", kicker: "Ampliación", description: "Bolsas de horas adicionales para clientes que ya cuentan con una plataforma contratada." },
    en: { name: "Extra legal advisory", kicker: "Extension", description: "Additional hour packages for clients who already have a contracted platform." }
  },
  {
    id: "corporativa",
    index: "05",
    image: "https://ext.same-assets.com/4174519126/858274363.jpeg",
    es: { name: "Corporativa remota", kicker: "Retainer", description: "Acompañamiento continuo con un equipo jurídico asignado, contratos y diagnóstico incluidos." },
    en: { name: "Remote corporate", kicker: "Retainer", description: "Continuous support with an assigned legal team, including contracts and diagnostics." }
  },
  {
    id: "orden",
    index: "06",
    image: "https://ext.same-assets.com/4174519126/2879693646.jpeg",
    es: { name: "Orden legal", kicker: "A la medida", description: "Cotizaciones personalizadas y pagos de propuestas emitidas por el despacho." },
    en: { name: "Legal order", kicker: "Custom", description: "Custom quotes and payments for proposals issued by the firm." }
  },
];

const rawProducts = [
  {
    id: "16358", slug: "mini-consulta-express", price: 250, category: "individuales", featured: true,
    image: "https://ext.same-assets.com/4174519126/2098822115.jpeg",
    es: {
      name: "MINI CONSULTA EXPRESS", 
      tagline: "", 
      turnaround: "",
      summary: "Asistencia legal puntual por videollamada o chat para resolver dudas muy específicas (ej. ¿Qué contrato me conviene? ¿Qué hago ante una multa del SAT?).",
      features: [
        "Duración: 15 a 20 minutos", 
        "Incluye: Respuesta clara a una duda puntual + guía básica o referencia a recursos legales", 
        "Ideal para: Emprendedores, freelancers o personas físicas con dudas simples"
      ]
    },
    en: {
      name: "EXPRESS MINI CONSULTATION", 
      tagline: "", 
      turnaround: "",
      summary: "Specific legal assistance via video call or chat to resolve very specific doubts (e.g. Which contract suits me? What do I do about a SAT fine?).",
      features: [
        "Duration: 15 to 20 minutes", 
        "Includes: Clear answer to a specific doubt + basic guide or reference to legal resources", 
        "Ideal for: Entrepreneurs, freelancers, or individuals with simple doubts"
      ]
    }
  },
  {
    id: "16359", slug: "orientacion-societaria-inicial", price: 950, category: "individuales",
    image: "https://ext.same-assets.com/4174519126/1267390727.jpeg",
    es: {
      name: "ORIETACIÓN SOCIETARIA INICIAL", 
      tagline: "", 
      turnaround: "",
      summary: "Sesión básica para quienes quieren constituir una empresa y no saben qué tipo de sociedad elegir (S.A., S. de R.L., SAS, etc.).",
      features: [
        "Duración: 30 minutos", 
        "Incluye: Análisis rápido del perfil del negocio y recomendación del tipo de sociedad más conveniente", 
        "Ideal para: Nuevos emprendedores, pequeños inversionistas, negocios familiares"
      ]
    },
    en: {
      name: "INITIAL CORPORATE ORIENTATION", 
      tagline: "", 
      turnaround: "",
      summary: "Basic session for those who want to incorporate a company and do not know what type of structure to choose (S.A., S. de R.L., SAS, etc.).",
      features: [
        "Duration: 30 minutes", 
        "Includes: Quick analysis of the business profile and recommendation of the most suitable company type", 
        "Ideal for: New entrepreneurs, small investors, family businesses"
      ]
    }
  },
  {
    id: "16360", slug: "asistencia-legal-personalizada", price: 1800, category: "individuales", featured: true,
    image: "https://ext.same-assets.com/4174519126/3614570213.jpeg",
    es: {
      name: "LEGAL PERSONALIZADA (VIDEO/CHAT)", 
      tagline: "", 
      turnaround: "",
      summary: "Asistencia Legal Personalizada por Videollamada o Chat\n\nSesión en línea para resolver temas legales urgentes o específicos. Puedes consultar sobre contratos, cumplimiento, relaciones laborales, riesgos legales, etc.",
      features: [
        "Duración: 50 minutos", 
        "Incluye: Diagnóstico del problema + orientación legal inmediata + recomendaciones prácticas", 
        "Ideal para: Negocios en operación, PYMES, startups o profesionales independientes"
      ]
    },
    en: {
      name: "PERSONALIZED LEGAL (VIDEO/CHAT)", 
      tagline: "", 
      turnaround: "",
      summary: "Personalized Legal Assistance via Video call or Chat\n\nOnline session to resolve urgent or specific legal issues. You can consult on contracts, compliance, labor relations, legal risks, etc.",
      features: [
        "Duration: 50 minutes", 
        "Includes: Diagnosis of the problem + immediate legal guidance + practical recommendations", 
        "Ideal for: Operating businesses, SMEs, startups, or independent professionals"
      ]
    }
  },
  {
    id: "16495", slug: "tipo-de-sociedad", price: 3000, category: "societaria",
    image: "https://ext.same-assets.com/4174519126/99324081.jpeg",
    es: {
      name: "TIPO DE SOCIEDAD", 
      tagline: "", 
      turnaround: "",
      summary: "Evaluación legal y estratégica para ayudarte a elegir el tipo de sociedad que más te conviene: SAS, S. de R.L., S.A. de C.V., etc., según tus objetivos, socios, obligaciones fiscales y escalabilidad.",
      features: [
        "Duración: 60 minutos", 
        "Medio: Videollamada profesional", 
        "Incluye: Análisis de tu modelo de negocio + recomendación detallada y justificada", 
        "Ideal para: Personas físicas, emprendedores, socios que planean constituir una empresa"
      ]
    },
    en: {
      name: "COMPANY TYPE", 
      tagline: "", 
      turnaround: "",
      summary: "Legal and strategic evaluation to help you choose the most suitable company type: SAS, S. de R.L., S.A. de C.V., etc., according to your objectives, partners, tax obligations, and scalability.",
      features: [
        "Duration: 60 minutes", 
        "Medium: Professional video call", 
        "Includes: Analysis of your business model + detailed and justified recommendation", 
        "Ideal for: Individuals, entrepreneurs, partners planning to incorporate a company"
      ]
    }
  },
  {
    id: "16498", slug: "cumplimiento-microempresa", price: 5000, category: "cumplimiento",
    image: "https://ext.same-assets.com/4174519126/858274363.jpeg",
    es: {
      name: "MICROEMPRESA", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Recordatorios automáticos de obligaciones (SAT, IMSS, etc.)", 
        "Calendario legal interactivo", 
        "Acceso a biblioteca legal básica (formatos comunes)", 
        "1 usuario"
      ]
    },
    en: {
      name: "MICRO-BUSINESS", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Automatic obligation reminders (SAT, IMSS, etc.)", 
        "Interactive legal calendar", 
        "Access to basic legal library (common templates)", 
        "1 user"
      ]
    }
  },
  {
    id: "16504", slug: "cumplimiento-pyme-estandar", price: 15000, category: "cumplimiento",
    image: "https://ext.same-assets.com/4174519126/2879693646.jpeg",
    es: {
      name: "PYME ESTANDAR", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Biblioteca normativa actualizada + filtros por sector", 
        "Recordatorios automáticos", 
        "Dashboard básico con indicadores de cumplimiento", 
        "Alertas de cambios legales clave", 
        "Hasta 5 usuarios con roles"
      ]
    },
    en: {
      name: "STANDARD SME", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Updated regulatory library + sector filters", 
        "Automatic reminders", 
        "Basic dashboard with compliance indicators", 
        "Key legal change alerts", 
        "Up to 5 users with roles"
      ]
    }
  },
  {
    id: "16509", slug: "cumplimiento-pyme-avanzada", price: 25000, category: "cumplimiento", featured: true,
    image: "https://ext.same-assets.com/4174519126/3219178927.jpeg",
    es: {
      name: "PYME AVANZADA", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Biblioteca normativa actualizada + filtros por sector", 
        "Recordatorios automáticos", 
        "Dashboard básico con indicadores de cumplimiento", 
        "Alertas de cambios legales clave", 
        "Hasta 5 usuarios con roles", 
        "Auditoría de cumplimiento", 
        "Módulo de capacitación interna para empleados 5 horas", 
        "Reportes descargables personalizados", 
        "Hasta 10 usuarios"
      ]
    },
    en: {
      name: "ADVANCED SME", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Updated regulatory library + sector filters", 
        "Automatic reminders", 
        "Basic dashboard with compliance indicators", 
        "Key legal change alerts", 
        "Up to 5 users with roles",
        "Compliance audit",
        "Internal training module for employees (5 hours)",
        "Custom downloadable reports",
        "Up to 10 users"
      ]
    }
  },
  {
    id: "16516", slug: "cumplimiento-empresa-mediana", price: 40000, category: "cumplimiento",
    image: "https://ext.same-assets.com/4174519126/1189411628.jpeg",
    es: {
      name: "EMPRESA MEDIANA", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Biblioteca normativa actualizada + filtros por sector",
        "Recordatorios automáticos",
        "Dashboard básico con indicadores de cumplimiento",
        "Alertas de cambios legales clave",
        "Hasta 5 usuarios con roles",
        "Auditoría de cumplimiento",
        "Reportes descargables personalizados",
        "Hasta 10 usuarios",
        "Integración con ERP o sistema contable (mediante API o Zapier)",
        "Alertas automatizadas por email/SMS",
        "Informes legales detallados (PDF)",
        "Hasta 20 usuarios",
        "Capacitación interna por industria 5 horas"
      ]
    },
    en: {
      name: "MID-SIZED COMPANY", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Updated regulatory library + sector filters",
        "Automatic reminders",
        "Basic dashboard with compliance indicators",
        "Key legal change alerts",
        "Up to 5 users with roles",
        "Compliance audit",
        "Custom downloadable reports",
        "Up to 10 users",
        "Integration with ERP or accounting system (via API or Zapier)",
        "Automated alerts via email/SMS",
        "Detailed legal reports (PDF)",
        "Up to 20 users",
        "Internal industry training (5 hours)"
      ]
    }
  },
  {
    id: "16500", slug: "extra-microempresas", price: 800, category: "extras",
    image: "https://ext.same-assets.com/4174519126/2098822115.jpeg",
    es: {
      name: "EXTRA PARA MICROEMPRESAS", 
      tagline: "", 
      turnaround: "",
      summary: "Consulta adicional a la plataforma de cumplimiento normativo para microempresas",
      features: ["Duración 30 min"]
    },
    en: {
      name: "EXTRA FOR MICRO-BUSINESSES", 
      tagline: "", 
      turnaround: "",
      summary: "Additional consultation for the micro-business regulatory compliance platform",
      features: ["Duration 30 min"]
    }
  },
  {
    id: "16505", slug: "extra-pyme-estandar", price: 1000, category: "extras",
    image: "https://ext.same-assets.com/4174519126/1267390727.jpeg",
    es: {
      name: "EXTRA PARA PYME ESTANDAR", 
      tagline: "", 
      turnaround: "",
      summary: "Consulta adicional a la plataforma de cumplimiento normativo para PYME Estandar",
      features: ["Duración 60 min"]
    },
    en: {
      name: "EXTRA FOR STANDARD SME", 
      tagline: "", 
      turnaround: "",
      summary: "Additional consultation for the standard SME regulatory compliance platform",
      features: ["Duration 60 min"]
    }
  },
  {
    id: "16510", slug: "extra-pyme-avanzada", price: 3500, category: "extras",
    image: "https://ext.same-assets.com/4174519126/3614570213.jpeg",
    es: {
      name: "EXTRA PARA PYME AVANZADA", 
      tagline: "", 
      turnaround: "",
      summary: "Consulta adicional a la plataforma de cumplimiento normativo para PYME Avanzada",
      features: ["Curso de 4 horas"]
    },
    en: {
      name: "EXTRA FOR ADVANCED SME", 
      tagline: "", 
      turnaround: "",
      summary: "Additional consultation for the advanced SME regulatory compliance platform",
      features: ["4-hour course"]
    }
  },
  {
    id: "16515", slug: "extra-empresa-mediana", price: 10000, category: "extras",
    image: "https://ext.same-assets.com/4174519126/99324081.jpeg",
    es: {
      name: "EXTRA PARA EMPRESA MEDIANA", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: ["Integración adicional con software interno"]
    },
    en: {
      name: "EXTRA FOR MID-SIZED COMPANY", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: ["Additional integration with internal software"]
    }
  },
  {
    id: "16523", slug: "plan-legal-start", price: 8000, category: "corporativa",
    image: "https://ext.same-assets.com/4174519126/858274363.jpeg",
    es: {
      name: "PLAN LEGAL START", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Revisión de 1 a 2 contratos o documentos legales (máx. 5 páginas cada uno)", 
        "1 consulta legal remota (30 minutos)", 
        "Acceso a plantillas legales básicas (contratos de prestación de servicios, NDA, etc.)"
      ]
    },
    en: {
      name: "LEGAL START PLAN", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Review of 1 to 2 contracts or legal documents (max. 5 pages each)", 
        "1 remote legal consultation (30 minutes)", 
        "Access to basic legal templates (service agreements, NDAs, etc.)"
      ]
    }
  },
  {
    id: "16526", slug: "plan-pyme-pro", price: 15900, category: "corporativa", featured: true,
    image: "https://ext.same-assets.com/4174519126/2879693646.jpeg",
    es: {
      name: "PLAN PYME PRO", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Revisión o elaboración de hasta 4 contratos (máx. 10 páginas cada uno)", 
        "Hasta 2 consultas legales (60 min cada una)", 
        "Acceso a librería completa de plantillas + checklist legales", 
        "Diagnóstico legal básico"
      ]
    },
    en: {
      name: "SME PRO PLAN", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Review or drafting of up to 4 contracts (max. 10 pages each)", 
        "Up to 2 legal consultations (60 min each)", 
        "Access to complete template library + legal checklists", 
        "Basic legal diagnosis"
      ]
    }
  },
  {
    id: "16529", slug: "plan-corporativo-plus", price: 35400, category: "corporativa",
    image: "https://ext.same-assets.com/4174519126/3219178927.jpeg",
    es: {
      name: "PLAN CORPORATIVO PLUS", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Revisión o redacción de hasta 7 contratos o documentos", 
        "Consultoría legal", 
        "Capacitación online para diferentes áreas (finanzas, RH, comercial, etc.)", 
        "Análisis de riesgos contractuales y mapeo de obligaciones", 
        "Soporte legal prioritario", 
        "Acceso a herramientas colaborativas (seguimiento de contratos, alertas)"
      ]
    },
    en: {
      name: "CORPORATE PLUS PLAN", 
      tagline: "", 
      turnaround: "",
      summary: "",
      features: [
        "Review or drafting of up to 7 contracts or documents", 
        "Legal consulting", 
        "Online training for different areas (finance, HR, commercial, etc.)", 
        "Contractual risk analysis and obligations mapping", 
        "Priority legal support", 
        "Access to collaborative tools (contract tracking, alerts)"
      ]
    }
  },
  {
    // Mantenemos los datos originales de la cotización ya que no hay imagen para validarlo.
    id: "16999", slug: "pago-cotizacion", price: 0, openPrice: true, category: "orden",
    image: "https://ext.same-assets.com/4174519126/1189411628.jpeg",
    es: {
      name: "Pago de Cotización", tagline: "Liquida una propuesta emitida por el despacho.", turnaround: "Inmediato",
      summary: "Si ya recibiste una cotización personalizada, captura el folio y el importe autorizado para completar tu pago en línea.",
      features: ["Captura el folio de tu cotización", "Importe libre según la propuesta autorizada", "Comprobante y factura CFDI 4.0"]
    },
    en: {
      name: "Quote Payment", tagline: "Settle a proposal issued by the firm.", turnaround: "Immediate",
      summary: "If you have already received a custom quote, enter the folio and authorized amount to complete your payment online.",
      features: ["Enter your quote folio", "Custom amount according to authorized proposal", "Receipt and CFDI 4.0 invoice"]
    }
  }
];

// ---------------------------------------------------------
// Helpers dinámicos
// ---------------------------------------------------------

export function getProducts(lang: Language = "es"): Product[] {
  return rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    price: p.price,
    openPrice: p.openPrice,
    category: p.category as CategoryId,
    image: p.image,
    featured: p.featured,
    ...p[lang],
  }));
}

export function getCategories(lang: Language = "es"): Category[] {
  return rawCategories.map((c) => ({
    id: c.id as CategoryId,
    index: c.index,
    image: c.image,
    ...c[lang],
  }));
}

export const products = getProducts("es"); // Fallback estático para legacy code

export function getProduct(slug: string, lang: Language = "es") {
  return getProducts(lang).find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId, lang: Language = "es") {
  return getCategories(lang).find((c) => c.id === id);
}

export function productsByCategory(id: CategoryId, lang: Language = "es") {
  return getProducts(lang).filter((p) => p.category === id);
}

export function relatedProducts(slug: string, lang: Language = "es", limit = 3) {
  const allProducts = getProducts(lang);
  const current = allProducts.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCategory = allProducts.filter(
    (p) => p.category === current.category && p.slug !== slug && !p.openPrice,
  );
  const rest = allProducts.filter(
    (p) => p.category !== current.category && !p.openPrice,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}