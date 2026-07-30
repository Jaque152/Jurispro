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
      name: "Mini Consulta Express", tagline: "20 minutos, una pregunta, una respuesta.", turnaround: "48 horas",
      summary: "Una llamada breve para resolver una duda puntual: un plazo, una cláusula, un requisito. Ideal cuando necesitas una segunda opinión antes de firmar.",
      features: ["Sesión de 20 minutos por videollamada o chat", "Una materia por sesión", "Resumen escrito de la recomendación", "Disponibilidad dentro de las siguientes 48 horas"]
    },
    en: {
      name: "Express Mini Consultation", tagline: "20 minutes, one question, one answer.", turnaround: "48 hours",
      summary: "A brief call to resolve a specific doubt: a deadline, a clause, a requirement. Ideal when you need a second opinion before signing.",
      features: ["20-minute video or chat session", "One legal subject per session", "Written summary of the recommendation", "Availability within 48 hours"]
    }
  },
  {
    id: "16359", slug: "orientacion-societaria-inicial", price: 950, category: "individuales",
    image: "https://ext.same-assets.com/4174519126/1267390727.jpeg",
    es: {
      name: "Orientación Societaria Inicial", tagline: "El primer mapa de tu estructura corporativa.", turnaround: "3 días hábiles",
      summary: "Revisamos tu proyecto y te explicamos las rutas societarias posibles, sus costos, tiempos y obligaciones fiscales asociadas.",
      features: ["Sesión de diagnóstico de 45 minutos", "Comparativo de figuras societarias aplicables", "Ruta de constitución con tiempos estimados", "Checklist de documentos requeridos"]
    },
    en: {
      name: "Initial Corporate Orientation", tagline: "The first map of your corporate structure.", turnaround: "3 business days",
      summary: "We review your project and explain the possible corporate routes, costs, timelines, and associated tax obligations.",
      features: ["45-minute diagnostic session", "Comparison of applicable corporate figures", "Incorporation roadmap with estimated times", "Required documents checklist"]
    }
  },
  {
    id: "16360", slug: "asistencia-legal-personalizada", price: 1800, category: "individuales", featured: true,
    image: "https://ext.same-assets.com/4174519126/3614570213.jpeg",
    es: {
      name: "Legal Personalizada (Video/Chat)", tagline: "Una hora de trabajo dedicado a tu asunto.", turnaround: "5 días hábiles",
      summary: "Asistencia jurídica personalizada con revisión previa de documentos y una sesión de trabajo con el abogado responsable de tu caso.",
      features: ["Revisión previa de hasta 15 páginas de documentación", "Sesión de 60 minutos por videollamada o chat", "Opinión legal por escrito", "Una ronda de preguntas de seguimiento"]
    },
    en: {
      name: "Personalized Legal (Video/Chat)", tagline: "One hour of dedicated work for your case.", turnaround: "5 business days",
      summary: "Personalized legal assistance with prior document review and a working session with the lawyer responsible for your case.",
      features: ["Prior review of up to 15 pages of documentation", "60-minute video or chat session", "Written legal opinion", "One round of follow-up questions"]
    }
  },
  {
    id: "16495", slug: "tipo-de-sociedad", price: 3000, category: "societaria",
    image: "https://ext.same-assets.com/4174519126/99324081.jpeg",
    es: {
      name: "Tipo de Sociedad", tagline: "Elige la figura correcta antes de constituir.", turnaround: "7 días hábiles",
      summary: "Dictamen sobre el tipo de sociedad más adecuado para tu negocio: S.A. de C.V., S. de R.L., SAPI o SAS, considerando socios, inversión y gobierno corporativo.",
      features: ["Análisis de socios, aportaciones y control", "Dictamen comparativo entre figuras societarias", "Implicaciones fiscales y de responsabilidad", "Recomendación de cláusulas estatutarias clave", "Sesión de presentación de resultados"]
    },
    en: {
      name: "Company Type Assessment", tagline: "Choose the correct structure before incorporating.", turnaround: "7 business days",
      summary: "Assessment of the most suitable company type for your business (S.A. de C.V., S. de R.L., SAPI, or SAS), considering partners, investment, and corporate governance.",
      features: ["Analysis of partners, contributions, and control", "Comparative assessment of corporate structures", "Tax and liability implications", "Recommendation of key statutory clauses", "Results presentation session"]
    }
  },
  {
    id: "16498", slug: "cumplimiento-microempresa", price: 5000, category: "cumplimiento",
    image: "https://ext.same-assets.com/4174519126/858274363.jpeg",
    es: {
      name: "Microempresa", tagline: "Cumplimiento esencial para equipos de hasta 10 personas.", turnaround: "10 días hábiles",
      summary: "Plataforma anual de cumplimiento normativo para microempresas: los documentos indispensables para operar sin contingencias.",
      features: ["Diagnóstico normativo inicial", "Aviso de privacidad y políticas base", "2 consultas legales al año (45 min)", "Biblioteca de plantillas esenciales", "Alertas de cambios regulatorios"]
    },
    en: {
      name: "Micro-business", tagline: "Essential compliance for teams up to 10 people.", turnaround: "10 business days",
      summary: "Annual regulatory compliance platform for micro-businesses: the essential documents to operate without contingencies.",
      features: ["Initial regulatory diagnostic", "Privacy notice and core policies", "2 legal consultations per year (45 min)", "Essential templates library", "Regulatory change alerts"]
    }
  },
  {
    id: "16504", slug: "cumplimiento-pyme-estandar", price: 15000, category: "cumplimiento",
    image: "https://ext.same-assets.com/4174519126/2879693646.jpeg",
    es: {
      name: "PYME Estándar", tagline: "El programa base para empresas en crecimiento.", turnaround: "15 días hábiles",
      summary: "Cumplimiento normativo anual para PyMEs con operación establecida, contratos recurrentes y personal en nómina.",
      features: ["Diagnóstico normativo y matriz de riesgos", "Revisión de hasta 6 contratos tipo", "4 consultas legales al año (60 min)", "Políticas laborales y de datos personales", "Calendario anual de obligaciones"]
    },
    en: {
      name: "Standard SME", tagline: "The core program for growing companies.", turnaround: "15 business days",
      summary: "Annual regulatory compliance for SMEs with established operations, recurring contracts, and payroll staff.",
      features: ["Regulatory diagnostic and risk matrix", "Review of up to 6 standard contracts", "4 legal consultations per year (60 min)", "Labor and data privacy policies", "Annual obligations calendar"]
    }
  },
  {
    id: "16509", slug: "cumplimiento-pyme-avanzada", price: 25000, category: "cumplimiento", featured: true,
    image: "https://ext.same-assets.com/4174519126/3219178927.jpeg",
    es: {
      name: "PYME Avanzada", tagline: "Gobierno corporativo y control interno.", turnaround: "20 días hábiles",
      summary: "Para empresas con varias líneas de negocio, socios externos o proveedores internacionales que requieren trazabilidad documental.",
      features: ["Todo lo incluido en PYME Estándar", "Manual de gobierno corporativo", "Programa antilavado y código de ética", "8 consultas legales al año", "Capacitación anual al equipo directivo"]
    },
    en: {
      name: "Advanced SME", tagline: "Corporate governance and internal control.", turnaround: "20 business days",
      summary: "For companies with multiple business lines, external partners, or international suppliers requiring document traceability.",
      features: ["Everything in Standard SME", "Corporate governance manual", "Anti-money laundering program and code of ethics", "8 legal consultations per year", "Annual training for the management team"]
    }
  },
  {
    id: "16516", slug: "cumplimiento-empresa-mediana", price: 40000, category: "cumplimiento",
    image: "https://ext.same-assets.com/4174519126/1189411628.jpeg",
    es: {
      name: "Empresa Mediana", tagline: "Área jurídica externa de tiempo completo.", turnaround: "30 días hábiles",
      summary: "Plataforma integral de cumplimiento con abogado responsable asignado, reportes trimestrales al consejo y atención prioritaria.",
      features: ["Todo lo incluido en PYME Avanzada", "Abogado responsable asignado", "Reportes trimestrales al consejo", "Consultas legales ilimitadas por correo", "Acompañamiento en auditorías y due diligence"]
    },
    en: {
      name: "Mid-sized Company", tagline: "Full-time external legal department.", turnaround: "30 business days",
      summary: "Comprehensive compliance platform with an assigned responsible lawyer, quarterly reports to the board, and priority attention.",
      features: ["Everything in Advanced SME", "Assigned responsible lawyer", "Quarterly reports to the board", "Unlimited legal consultations via email", "Support during audits and due diligence"]
    }
  },
  {
    id: "16500", slug: "extra-microempresas", price: 800, category: "extras",
    image: "https://ext.same-assets.com/4174519126/2098822115.jpeg",
    es: {
      name: "Extra para Microempresas", tagline: "Consulta adicional para clientes Microempresa.", turnaround: "48 horas",
      summary: "Amplía tu plataforma con una consulta legal adicional de 45 minutos, con seguimiento por escrito.",
      features: ["1 consulta legal de 45 minutos", "Seguimiento por escrito", "Válida durante la vigencia de tu plataforma"]
    },
    en: {
      name: "Extra for Micro-businesses", tagline: "Additional consultation for Micro-business clients.", turnaround: "48 hours",
      summary: "Expand your platform with an additional 45-minute legal consultation, with written follow-up.",
      features: ["1 legal consultation of 45 minutes", "Written follow-up", "Valid during your platform's term"]
    }
  },
  {
    id: "16505", slug: "extra-pyme-estandar", price: 1000, category: "extras",
    image: "https://ext.same-assets.com/4174519126/1267390727.jpeg",
    es: {
      name: "Extra para PYME Estándar", tagline: "Horas adicionales para tu plan estándar.", turnaround: "48 horas",
      summary: "Bolsa complementaria de asesoría para picos de trabajo, revisiones urgentes o nuevos contratos.",
      features: ["2 consultas legales de 60 minutos", "Revisión de 1 contrato adicional", "Respuesta prioritaria en 24 horas"]
    },
    en: {
      name: "Extra for Standard SMEs", tagline: "Additional hours for your standard plan.", turnaround: "48 hours",
      summary: "Complementary advisory package for workload peaks, urgent reviews, or new contracts.",
      features: ["2 legal consultations of 60 minutes", "Review of 1 additional contract", "Priority response within 24 hours"]
    }
  },
  {
    id: "16510", slug: "extra-pyme-avanzada", price: 3500, category: "extras",
    image: "https://ext.same-assets.com/4174519126/3614570213.jpeg",
    es: {
      name: "Extra para PYME Avanzada", tagline: "Ampliación para operaciones complejas.", turnaround: "5 días hábiles",
      summary: "Refuerzo de horas y revisión documental para clientes con plataforma PYME Avanzada contratada.",
      features: ["4 consultas legales de 60 minutos", "Revisión de hasta 3 contratos adicionales", "Sesión de trabajo con el equipo interno"]
    },
    en: {
      name: "Extra for Advanced SMEs", tagline: "Extension for complex operations.", turnaround: "5 business days",
      summary: "Hours reinforcement and document review for clients with an Advanced SME platform.",
      features: ["4 legal consultations of 60 minutes", "Review of up to 3 additional contracts", "Working session with the internal team"]
    }
  },
  {
    id: "16515", slug: "extra-empresa-mediana", price: 10000, category: "extras",
    image: "https://ext.same-assets.com/4174519126/99324081.jpeg",
    es: {
      name: "Extra para Empresa Mediana", tagline: "Capacidad adicional para proyectos especiales.", turnaround: "10 días hábiles",
      summary: "Bloque de trabajo jurídico adicional para transacciones, litigios preventivos o auditorías fuera del alcance anual.",
      features: ["Bolsa de 20 horas de trabajo jurídico", "Abogado senior asignado al proyecto", "Reporte ejecutivo de cierre"]
    },
    en: {
      name: "Extra for Mid-sized Companies", tagline: "Additional capacity for special projects.", turnaround: "10 business days",
      summary: "Block of additional legal work for transactions, preventive litigation, or audits outside the annual scope.",
      features: ["20-hour package of legal work", "Senior lawyer assigned to the project", "Executive closing report"]
    }
  },
  {
    id: "16523", slug: "plan-legal-start", price: 8000, category: "corporativa",
    image: "https://ext.same-assets.com/4174519126/858274363.jpeg",
    es: {
      name: "Plan Legal Start", tagline: "Para fundadores que están armando la casa.", turnaround: "Mensual",
      summary: "Acompañamiento jurídico remoto para startups y negocios en etapa temprana, con lo indispensable para operar y contratar.",
      features: ["Revisión o elaboración de hasta 2 contratos (máx. 10 páginas)", "1 consulta legal al mes (60 min)", "Acceso a librería básica de plantillas", "Canal directo por chat en horario hábil"]
    },
    en: {
      name: "Legal Start Plan", tagline: "For founders building their foundation.", turnaround: "Monthly",
      summary: "Remote legal support for startups and early-stage businesses, with the essentials to operate and contract.",
      features: ["Review or drafting of up to 2 contracts (max. 10 pages)", "1 legal consultation per month (60 min)", "Access to basic template library", "Direct chat channel during business hours"]
    }
  },
  {
    id: "16526", slug: "plan-pyme-pro", price: 15900, category: "corporativa", featured: true,
    image: "https://ext.same-assets.com/4174519126/2879693646.jpeg",
    es: {
      name: "Plan PyME Pro", tagline: "El retainer más contratado del despacho.", turnaround: "Mensual",
      summary: "Asesoría legal corporativa remota con volumen de contratos, consultas y diagnóstico legal para empresas en operación.",
      features: ["Revisión o elaboración de hasta 4 contratos (máx. 10 páginas cada uno)", "Hasta 2 consultas legales (60 min cada una)", "Acceso a librería completa de plantillas + checklist legales", "Diagnóstico legal básico"]
    },
    en: {
      name: "SME Pro Plan", tagline: "The firm's most popular retainer.", turnaround: "Monthly",
      summary: "Remote corporate legal advisory with a high volume of contracts, consultations, and legal diagnostics for operating companies.",
      features: ["Review or drafting of up to 4 contracts (max. 10 pages each)", "Up to 2 legal consultations (60 min each)", "Access to complete template library + legal checklists", "Basic legal diagnostic"]
    }
  },
  {
    id: "16529", slug: "plan-corporativo-plus", price: 35400, category: "corporativa",
    image: "https://ext.same-assets.com/4174519126/3219178927.jpeg",
    es: {
      name: "Plan Corporativo Plus", tagline: "Dirección jurídica externa, sin nómina.", turnaround: "Mensual",
      summary: "El nivel más alto de acompañamiento remoto: equipo asignado, contratos ilimitados dentro del alcance y participación en comités.",
      features: ["Contratos ilimitados dentro del alcance acordado", "Hasta 6 consultas legales al mes", "Participación en 1 sesión de consejo o comité", "Diagnóstico legal avanzado y matriz de riesgos", "Tiempo de respuesta garantizado de 24 horas"]
    },
    en: {
      name: "Corporate Plus Plan", tagline: "External legal management, without the payroll.", turnaround: "Monthly",
      summary: "The highest level of remote support: assigned team, unlimited contracts within scope, and committee participation.",
      features: ["Unlimited contracts within agreed scope", "Up to 6 legal consultations per month", "Participation in 1 board or committee session", "Advanced legal diagnostic and risk matrix", "Guaranteed 24-hour response time"]
    }
  },
  {
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