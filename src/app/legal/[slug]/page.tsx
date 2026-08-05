"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/lib/language-context";

type Doc = {
  slug: string;
  index: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const DOCS: Record<"es" | "en", Doc[]> = {
  es: [
    {
      slug: "terminos-y-condiciones",
      index: "T-01",
      title: "Términos y Condiciones de Uso",
      updated: "Enero 2026",
      intro:
        "Porque valoramos tu tiempo y el nuestro. En WRITE AS A LAWYER S.A. DE C.V., mejor conocida como Jurispro, queremos ofrecerte una experiencia clara, justa y profesional en cada servicio que contrates a través de nuestro sitio jurispro.com.mx. Sabemos que pueden surgir imprevistos o cambios de plan, por eso te explicamos de forma transparente cómo funcionan nuestras políticas de cancelación, reprogramación y reembolso.",
      sections: [
        {
          heading: "1. Servicios cubiertos por esta política",
          body: [
            "Esta política aplica a todos los servicios contratados directamente a través del sitio web, incluyendo:",
            "MiniConsulta Legal Express",
            "Orientación Societaria Inicial",
            "Asistencia Legal Personalizada por Videollamada o Chat",
            "Asesoría sobre el Tipo de Sociedad más Adecuada",
            "Planes de Asesoría Corporativa Remota (Start, PyME Pro, Corporativo Plus)",
            "Plataforma de Cumplimiento Normativo en cualquiera de sus versiones (Microempresa, PyME Estándar, Avanzada o Empresa Mediana)"
          ],
        },
        {
          heading: "2. Reembolsos por causas imputables a Jurispro",
          body: [
            "En caso de que Jurispro deba cancelar un servicio por motivos internos (como fallas técnicas, causas de fuerza mayor o indisponibilidad del consultor), te ofreceremos las siguientes opciones:",
            "Reprogramar la sesión para otra fecha conveniente, sin costo adicional, o",
            "Solicitar un reembolso total del monto pagado.",
            "Los reembolsos se procesarán dentro de un plazo máximo de 10 días hábiles a partir de la confirmación de procedencia, y se realizarán por el mismo método de pago utilizado originalmente."
          ],
        },
        {
          heading: "3. Servicios no reembolsables",
          body: [
            "Por la naturaleza de nuestros servicios digitales y personalizados, no se otorgarán reembolsos en los siguientes casos:",
            "Una vez que el servicio haya sido prestado total o parcialmente, incluyendo asesorías por videollamada, chat o revisión de documentos.",
            "En la activación de la Plataforma de Cumplimiento Normativo, una vez que se haya otorgado acceso al usuario.",
            "Cuando el cliente proporcione información incorrecta o incompleta que impida la adecuada prestación del servicio.",
            "Cuando la cancelación se solicite fuera de los plazos establecidos en esta política."
          ],
        },
        {
          heading: "4. Procedimiento para solicitar un reembolso",
          body: [
            "Si cumples con los criterios anteriores y deseas solicitar un reembolso, envía un correo electrónico a resuelve@jurispro.com.mx con la siguiente información:",
            "Nombre completo y número de pedido o referencia de pago.",
            "Servicio contratado y fecha de compra.",
            "Motivo de la solicitud (cancelación, reprogramación o incidencia).",
            "Comprobante de pago.",
            "Tu solicitud será revisada en un plazo máximo de 5 días hábiles, y recibirás una respuesta con la resolución y los pasos a seguir."
          ],
        },
        {
          heading: "6. Modificaciones, reprogramaciones o sustituciones",
          body: [
            "En caso de que necesites reprogramar tu sesión, puedes hacerlo sin costo una sola vez, siempre que avises con al menos 24 horas de anticipación.",
            "Si por alguna razón deseas transferir tu sesión a otra persona (por ejemplo, un socio o colaborador), puedes hacerlo informándonos con anticipación para actualizar el registro de la cita, enviando un correo a resuelve@jurispro.com.mx.",
            "Para servicios de suscripción o planes mensuales (por ejemplo, asesorías corporativas o plataforma SaaS), cualquier cambio o cancelación deberá solicitarse con al menos 10 días naturales de anticipación al siguiente ciclo de facturación."
          ],
        },
        {
          heading: "7. Métodos de pago y reembolso",
          body: [
            "Todos los pagos se procesan a través de un agregador de pagos autorizado, mediante tarjeta de crédito o débito.",
            "Jurispro no almacena ni tiene acceso a la información bancaria de los usuarios.",
            "En caso de aprobarse un reembolso, este se realizará a través del mismo método de pago utilizado originalmente, sujeto a los tiempos de procesamiento del banco o entidad emisora."
          ],
        },
        {
          heading: "8. Casos especiales",
          body: [
            "Si surge algún caso no contemplado expresamente en esta política, Jurispro analizará la situación individualmente, buscando siempre una solución justa y razonable para ambas partes.",
            "Nuestro compromiso es actuar con transparencia, empatía y profesionalismo."
          ],
        },
        {
          heading: "9. Contacto",
          body: [
            "Si tienes alguna duda o deseas presentar una solicitud de cancelación o reembolso, escríbenos a: resuelve@jurispro.com.mx.",
            "Por favor, incluye tu nombre completo, fecha de contratación y el servicio al que hace referencia tu mensaje."
          ],
        },
      ],
    },
    {
      slug: "reembolsos-y-cancelaciones",
      index: "T-02",
      title: "Política de Reembolsos y Cancelaciones",
      updated: "Enero 2026",
      intro:
        "Porque valoramos tu tiempo y el nuestro. En WRITE AS A LAWYER S.A. DE C.V., mejor conocida como JURISPRO, queremos ofrecerte una experiencia clara, justa y profesional en cada servicio que contrates a través de nuestro sitio resuelve@jurispro.com.mx. Sabemos que pueden surgir imprevistos o cambios de plan, por eso te explicamos de forma transparente cómo funcionan nuestras políticas de cancelación, reprogramación y reembolso.",
      sections: [
        {
          heading: "1. Servicios cubiertos por esta política",
          body: [
            "Esta política aplica a todos los servicios contratados directamente a través del sitio web, incluyendo:",
            "MiniConsulta Legal Express",
            "Orientación Societaria Inicial",
            "Asistencia Legal Personalizada por Videollamada o Chat",
            "Asesoría sobre el Tipo de Sociedad más Adecuada",
            "Planes de Asesoría Corporativa Remota (Start, PyME Pro, Corporativo Plus)",
            "Plataforma de Cumplimiento Normativo en cualquiera de sus versiones (Microempresa, PyME Estándar, Avanzada o Empresa Mediana)"
          ],
        },
        {
          heading: "2. Reembolsos por causas imputables a JURISPRO",
          body: [
            "En caso de que JURISPRO deba cancelar un servicio por motivos internos (como fallas técnicas, causas de fuerza mayor o indisponibilidad del consultor), te ofreceremos las siguientes opciones:",
            "Reprogramar la sesión para otra fecha conveniente, sin costo adicional, o",
            "Solicitar un reembolso total del monto pagado.",
            "Los reembolsos se procesarán dentro de un plazo máximo de 10 días hábiles a partir de la confirmación de procedencia, y se realizarán por el mismo método de pago utilizado originalmente."
          ],
        },
        {
          heading: "3. Servicios no reembolsables",
          body: [
            "Por la naturaleza de nuestros servicios digitales y personalizados, no se otorgarán reembolsos en los siguientes casos:",
            "Una vez que el servicio haya sido prestado total o parcialmente, incluyendo asesorías por videollamada, chat o revisión de documentos.",
            "En la activación de la Plataforma de Cumplimiento Normativo, una vez que se haya otorgado acceso al usuario.",
            "Cuando el cliente proporcione información incorrecta o incompleta que impida la adecuada prestación del servicio.",
            "Cuando la cancelación se solicite fuera de los plazos establecidos en esta política."
          ],
        },
        {
          heading: "4. Procedimiento para solicitar un reembolso",
          body: [
            "Si cumples con los criterios anteriores y deseas solicitar un reembolso, envía un correo electrónico a resuelve@jurispro.com.mx con la siguiente información:",
            "Nombre completo y número de pedido o referencia de pago.",
            "Servicio contratado y fecha de compra.",
            "Motivo de la solicitud (cancelación, reprogramación o incidencia).",
            "Comprobante de pago.",
            "Tu solicitud será revisada en un plazo máximo de 5 días hábiles, y recibirás una respuesta con la resolución y los pasos a seguir."
          ],
        },
        {
          heading: "6. Modificaciones, reprogramaciones o sustituciones",
          body: [
            "En caso de que necesites reprogramar tu sesión, puedes hacerlo sin costo una sola vez, siempre que avises con al menos 24 horas de anticipación.",
            "Si por alguna razón deseas transferir tu sesión a otra persona (por ejemplo, un socio o colaborador), puedes hacerlo informándonos con anticipación para actualizar el registro de la cita, enviando un correo a resuelve@jurispro.com.mx.",
            "Para servicios de suscripción o planes mensuales (por ejemplo, asesorías corporativas o plataforma SaaS), cualquier cambio o cancelación deberá solicitarse con al menos 10 días naturales de anticipación al siguiente ciclo de facturación."
          ],
        },
        {
          heading: "7. Métodos de pago y reembolso",
          body: [
            "Todos los pagos se procesan a través de un agregador de pagos autorizado, mediante tarjeta de crédito o débito.",
            "JURISPRO no almacena ni tiene acceso a la información bancaria de los usuarios.",
            "En caso de aprobarse un reembolso, este se realizará a través del mismo método de pago utilizado originalmente, sujeto a los tiempos de procesamiento del banco o entidad emisora."
          ],
        },
        {
          heading: "8. Casos especiales",
          body: [
            "Si surge algún caso no contemplado expresamente en esta política, JURISPRO analizará la situación individualmente, buscando siempre una solución justa y razonable para ambas partes.",
            "Nuestro compromiso es actuar con transparencia, empatía y profesionalismo."
          ],
        },
        {
          heading: "9. Contacto",
          body: [
            "Si tienes alguna duda o deseas presentar una solicitud de cancelación o reembolso, escríbenos a: resuelve@jurispro.com.mx.",
            "Por favor, incluye tu nombre completo, fecha de contratación y el servicio al que hace referencia tu mensaje."
          ],
        },
      ],
    },
    {
      slug: "aviso-de-privacidad",
      index: "T-03",
      title: "Aviso de Privacidad",
      updated: "Enero 2026",
      intro:
        "Tu confianza es lo más importante para nosotros. En WRITE AS A LAWYER S.A. DE C.V., mejor conocida como JURISPRO, con domicilio en Mariano Escobedo 375, Piso 14, Dpto. 1403, Colonia Bosque de Chapultepec I Sección, Miguel Hidalgo, C.P. 11580, Ciudad de México, entendemos que tu privacidad no es solo un tema legal, sino también de respeto y confianza. Por eso, queremos contarte de forma clara y sencilla cómo usamos, protegemos y cuidamos tu información personal cuando visitas nuestro sitio web jurispro.com.mx, cuando contratas alguno de nuestros servicios o cuando interactúas con nosotros por cualquier medio digital.",
      sections: [
        {
          heading: "1. Responsable del tratamiento de tus datos personales",
          body: [
            "El responsable del tratamiento de tus datos es WRITE AS A LAWYER S.A. DE C.V. (JURISPRO). Puedes contactarnos a través del correo: resuelve@jurispro.com.mx para cualquier duda o solicitud relacionada con tus datos personales."
          ],
        },
        {
          heading: "2. Datos personales que podemos recopilar",
          body: [
            "Cuando utilizas el Sitio o contratas nuestros servicios, podemos solicitarte algunos datos personales, dependiendo de la naturaleza del servicio. Estos pueden incluir:",
            "Datos de identificación: nombre, apellido, RFC, CURP, fecha de nacimiento, razón social (si aplica).",
            "Datos de contacto: teléfono, correo electrónico, dirección fiscal o comercial.",
            "Datos de facturación y pago: número de tarjeta (procesado por el agregador de pagos, no almacenado por nosotros), comprobantes fiscales y datos de facturación.",
            "Datos profesionales o empresariales (si aplica): ocupación, tipo de sociedad, sector o actividad económica.",
            "Datos de navegación: dirección IP, tipo de dispositivo, sistema operativo, cookies o identificadores digitales que nos ayuden a mejorar tu experiencia.",
            "No solicitamos ni tratamos datos personales sensibles, como información médica, religiosa o biométrica."
          ],
        },
        {
          heading: "3. Finalidades del tratamiento",
          body: [
            "Usamos tus datos personales exclusivamente para las siguientes finalidades:",
            "Finalidades primarias (necesarias para la prestación del servicio):",
            "Registrar, procesar y confirmar la contratación de nuestros servicios legales o de cumplimiento.",
            "Brindarte acceso a videollamadas, chats, sesiones o plataformas en línea.",
            "Emitir facturas y comprobantes fiscales.",
            "Dar seguimiento a tus solicitudes o consultas legales.",
            "Contactarte en caso de actualizaciones, aclaraciones o incidencias con tu contratación.",
            "Administrar y mantener la seguridad del Sitio y sus servicios digitales.",
            "Finalidades secundarias (opcionales, pero útiles para mejorar tu experiencia):",
            "Enviarte información, tips legales o contenido educativo relacionado con nuestros servicios.",
            "Invitarte a talleres, cursos o eventos organizados por JURISPRO.",
            "Realizar encuestas de satisfacción y mejora de calidad.",
            "En caso de que no desees que tus datos se usen para estas finalidades secundarias, puedes solicitarlo en cualquier momento enviando un correo resuelve@jurispro.com.mx. Tu decisión no afectará la prestación de los servicios que contrates."
          ],
        },
        {
          heading: "4. Uso de cookies y tecnologías similares",
          body: [
            "Cuando navegas en nuestro Sitio, se instalan cookies y tecnologías similares (como etiquetas web, píxeles o almacenamiento local) que nos ayudan a mejorar tu experiencia.",
            "Las cookies permiten que el sitio recuerde tus preferencias, idioma, tipo de dispositivo y te ofrezca una navegación más fluida. También usamos cookies analíticas (por ejemplo, Google Analytics) para conocer cómo interactúan los usuarios con el sitio y poder optimizar nuestros contenidos y servicios.",
            "Puedes desactivar o eliminar las cookies desde la configuración de tu navegador en cualquier momento, aunque hacerlo podría afectar el funcionamiento de algunas secciones del sitio. Al continuar navegando en jurispro.com.mx, aceptas el uso de cookies conforme a este Aviso de Privacidad."
          ],
        },
        {
          heading: "5. Transferencias de datos personales",
          body: [
            "JURISPRO no vende ni comparte tus datos personales con terceros sin tu consentimiento.Sin embargo, podremos transferir tus datos cuando sea necesario para cumplir con las siguientes situaciones:",
            "A proveedores que nos apoyan en el procesamiento de pagos, alojamiento web o soporte técnico (por ejemplo, plataformas de videollamadas o facturación).",
            "A autoridades competentes cuando sea requerido por ley, mandato judicial o procedimiento legal.",
            "A socios o aliados profesionales únicamente cuando sea necesario para atender la solicitud o servicio que tú hayas contratado.",
            "En todos los casos, exigimos a dichos terceros el mismo nivel de protección y confidencialidad que mantenemos internamente."
          ],
        },
        {
          heading: "6. Derechos ARCO",
          body: [
            "Sabemos lo importante que es tener control sobre tu información personal. Por eso, la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) te reconoce una serie de derechos que puedes ejercer en cualquier momento respecto de tus datos. Estos son los llamados Derechos ARCO:",
            "Acceso: Puedes solicitar en todo momento que te confirmemos si tenemos tus datos personales y, en caso afirmativo, acceder a ellos, conocer su origen y las finalidades para las que los usamos.",
            "Rectificación: Si alguno de tus datos es incorrecto, está desactualizado o incompleto, puedes pedirnos que lo corrijamos o actualicemos.",
            "Cancelación: Puedes solicitarnos la eliminación de tus datos cuando consideres que no se requieren para alguna de las finalidades señaladas, que estén siendo utilizados de forma indebida o que haya vencido el plazo necesario para su tratamiento.",
            "Oposición: Puedes oponerte al tratamiento de tus datos por motivos legítimos o cuando quieras limitar su uso para fines secundarios o promocionales.",
            "Además, puedes revocar el consentimiento que nos hayas otorgado para el tratamiento de tus datos personales, en cualquier momento, siempre que no sea necesario para cumplir obligaciones legales derivadas de una relación vigente contigo. También puedes limitar el uso o divulgación de tu información para dejar de recibir comunicaciones o materiales informativos.",
            "¿Cómo ejercer tus derechos?",
            "Para ejercer cualquiera de estos derechos, solo necesitas enviar una solicitud al correo electrónico resuelve@jurispro.com.mx, indicando lo siguiente:",
            "Tu nombre completo y algún medio de contacto (correo o teléfono).",
            "Una descripción clara del derecho que deseas ejercer (acceso, rectificación, cancelación, oposición, revocación o limitación del uso).",
            "En su caso, la documentación o información que nos ayude a ubicar tus datos personales (por ejemplo, el servicio que contrataste, fecha o folio).",
            "Copia de un documento que acredite tu identidad o, si actúas a nombre de alguien más, copia del documento que te autorice como representante legal.",
            "Plazos y respuesta",
            "Una vez recibida tu solicitud, JURISPRO te enviará un acuse de recibo y analizará la información proporcionada.",
            "El plazo máximo para responder es de 20 días hábiles contados a partir de la recepción de tu solicitud. Si tu petición resulta procedente, haremos efectiva la acción solicitada dentro de los 15 días hábiles siguientes a la fecha en que se comunique la respuesta.",
            "En caso de que falte información o documentación, te lo haremos saber por el mismo medio para que puedas completarla en un plazo de 10 días hábiles; este plazo no se contará dentro de los 20 días iniciales.",
            "Si no recibes respuesta en el tiempo indicado o consideras que tu solicitud no fue atendida correctamente, tienes el derecho de acudir al Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) para presentar una inconformidad o queja conforme a los plazos establecidos por la ley."
          ],
        },
        {
          heading: "7. Conservación y seguridad de los datos",
          body: [
            "Tus datos personales serán almacenados únicamente por el tiempo necesario para cumplir con las finalidades descritas, los plazos legales aplicables o hasta que solicites su eliminación.",
            "JURISPRO adopta medidas técnicas, administrativas y físicas razonables para proteger tu información contra pérdida, acceso no autorizado, alteración o destrucción.Toda la información se gestiona en servidores seguros y bajo protocolos de cifrado."
          ],
        },
        {
          heading: "8. Actualizaciones al Aviso de Privacidad",
          body: [
            "Podemos modificar este Aviso de Privacidad en cualquier momento para adaptarlo a cambios legales, mejoras en nuestros procesos o nuevos servicios. Las actualizaciones se publicarán en esta misma página, indicando la fecha de la última modificación. Te recomendamos revisar periódicamente este documento."
          ],
        },
        {
          heading: "9. Consentimiento",
          body: [
            "Al utilizar este Sitio o contratar cualquiera de nuestros servicios, aceptas y otorgas tu consentimiento para el tratamiento de tus datos personales conforme a este Aviso de Privacidad."
          ],
        },
      ],
    },
  ],
  en: [
    {
      slug: "terminos-y-condiciones",
      index: "T-01",
      title: "Terms and Conditions of Use",
      updated: "January 2026",
      intro:
        "Because we value your time and ours. At WRITE AS A LAWYER S.A. DE C.V., better known as Jurispro, we want to offer you a clear, fair, and professional experience in every service you contract through our site jurispro.com.mx. We know that unforeseen events or changes of plan may arise, so we transparently explain how our cancellation, rescheduling, and refund policies work.",
      sections: [
        {
          heading: "1. Services covered by this policy",
          body: [
            "This policy applies to all services contracted directly through the website, including:",
            "Express Legal Mini-Consultation",
            "Initial Corporate Orientation",
            "Personalized Legal Assistance via Video Call or Chat",
            "Advisory on the Most Suitable Company Type",
            "Remote Corporate Advisory Plans (Start, SME Pro, Corporate Plus)",
            "Regulatory Compliance Platform in any of its versions (Micro-business, Standard SME, Advanced, or Mid-sized Company)"
          ],
        },
        {
          heading: "2. Refunds for causes attributable to Jurispro",
          body: [
            "In the event that Jurispro must cancel a service for internal reasons (such as technical failures, force majeure, or consultant unavailability), we will offer you the following options:",
            "Reschedule the session for another convenient date, at no additional cost, or",
            "Request a full refund of the paid amount.",
            "Refunds will be processed within a maximum period of 10 business days from the confirmation of origin, and will be made using the original payment method."
          ],
        },
        {
          heading: "3. Non-refundable services",
          body: [
            "Due to the nature of our digital and personalized services, no refunds will be granted in the following cases:",
            "Once the service has been fully or partially provided, including advisory via video call, chat, or document review.",
            "Upon activation of the Regulatory Compliance Platform, once access has been granted to the user.",
            "When the client provides incorrect or incomplete information that prevents the proper provision of the service.",
            "When the cancellation is requested outside the deadlines established in this policy."
          ],
        },
        {
          heading: "4. Procedure to request a refund",
          body: [
            "If you meet the above criteria and wish to request a refund, send an email to resuelve@jurispro.com.mx with the following information:",
            "Full name and order number or payment reference.",
            "Contracted service and purchase date.",
            "Reason for the request (cancellation, rescheduling, or incident).",
            "Proof of payment.",
            "Your request will be reviewed within a maximum period of 5 business days, and you will receive a response with the resolution and steps to follow."
          ],
        },
        {
          heading: "6. Modifications, rescheduling, or substitutions",
          body: [
            "In case you need to reschedule your session, you can do so at no cost once, provided you notify us at least 24 hours in advance.",
            "If for any reason you wish to transfer your session to another person (for example, a partner or collaborator), you can do so by informing us in advance to update the appointment record, sending an email to resuelve@jurispro.com.mx.",
            "For subscription services or monthly plans (for example, corporate advisory or SaaS platform), any change or cancellation must be requested at least 10 calendar days prior to the next billing cycle."
          ],
        },
        {
          heading: "7. Payment and refund methods",
          body: [
            "All payments are processed through an authorized payment aggregator, using a credit or debit card.",
            "Jurispro does not store nor have access to users' banking information.",
            "If a refund is approved, it will be made via the original payment method, subject to the processing times of the bank or issuing entity."
          ],
        },
        {
          heading: "8. Special cases",
          body: [
            "If any case arises that is not expressly covered in this policy, Jurispro will analyze the situation individually, always seeking a fair and reasonable solution for both parties.",
            "Our commitment is to act with transparency, empathy, and professionalism."
          ],
        },
        {
          heading: "9. Contact",
          body: [
            "If you have any questions or wish to submit a cancellation or refund request, write to us at: resuelve@jurispro.com.mx.",
            "Please include your full name, contracting date, and the service your message refers to."
          ],
        },
      ],
    },
    {
      slug: "reembolsos-y-cancelaciones",
      index: "T-02",
      title: "Refund and Cancellation Policy",
      updated: "January 2026",
      intro:
        "Because we value your time and ours. At WRITE AS A LAWYER S.A. DE C.V., better known as JURISPRO, we want to offer you a clear, fair, and professional experience in every service you contract through our site resuelve@jurispro.com.mx. We know that unforeseen events or changes of plan may arise, so we transparently explain how our cancellation, rescheduling, and refund policies work.",
      sections: [
        {
          heading: "1. Services covered by this policy",
          body: [
            "This policy applies to all services contracted directly through the website, including:",
            "Express Legal Mini-Consultation",
            "Initial Corporate Orientation",
            "Personalized Legal Assistance via Video Call or Chat",
            "Advisory on the Most Suitable Company Type",
            "Remote Corporate Advisory Plans (Start, SME Pro, Corporate Plus)",
            "Regulatory Compliance Platform in any of its versions (Micro-business, Standard SME, Advanced, or Mid-sized Company)"
          ],
        },
        {
          heading: "2. Refunds for causes attributable to JURISPRO",
          body: [
            "In the event that JURISPRO must cancel a service for internal reasons (such as technical failures, force majeure, or consultant unavailability), we will offer you the following options:",
            "Reschedule the session for another convenient date, at no additional cost, or",
            "Request a full refund of the paid amount.",
            "Refunds will be processed within a maximum period of 10 business days from the confirmation of origin, and will be made using the original payment method."
          ],
        },
        {
          heading: "3. Non-refundable services",
          body: [
            "Due to the nature of our digital and personalized services, no refunds will be granted in the following cases:",
            "Once the service has been fully or partially provided, including advisory via video call, chat, or document review.",
            "Upon activation of the Regulatory Compliance Platform, once access has been granted to the user.",
            "When the client provides incorrect or incomplete information that prevents the proper provision of the service.",
            "When the cancellation is requested outside the deadlines established in this policy."
          ],
        },
        {
          heading: "4. Procedure to request a refund",
          body: [
            "If you meet the above criteria and wish to request a refund, send an email to resuelve@jurispro.com.mx with the following information:",
            "Full name and order number or payment reference.",
            "Contracted service and purchase date.",
            "Reason for the request (cancellation, rescheduling, or incident).",
            "Proof of payment.",
            "Your request will be reviewed within a maximum period of 5 business days, and you will receive a response with the resolution and steps to follow."
          ],
        },
        {
          heading: "6. Modifications, rescheduling, or substitutions",
          body: [
            "In case you need to reschedule your session, you can do so at no cost once, provided you notify us at least 24 hours in advance.",
            "If for any reason you wish to transfer your session to another person (for example, a partner or collaborator), you can do so by informing us in advance to update the appointment record, sending an email to resuelve@jurispro.com.mx.",
            "For subscription services or monthly plans (for example, corporate advisory or SaaS platform), any change or cancellation must be requested at least 10 calendar days prior to the next billing cycle."
          ],
        },
        {
          heading: "7. Payment and refund methods",
          body: [
            "All payments are processed through an authorized payment aggregator, using a credit or debit card.",
            "JURISPRO does not store nor have access to users' banking information.",
            "If a refund is approved, it will be made via the original payment method, subject to the processing times of the bank or issuing entity."
          ],
        },
        {
          heading: "8. Special cases",
          body: [
            "If any case arises that is not expressly covered in this policy, JURISPRO will analyze the situation individually, always seeking a fair and reasonable solution for both parties.",
            "Our commitment is to act with transparency, empathy, and professionalism."
          ],
        },
        {
          heading: "9. Contact",
          body: [
            "If you have any questions or wish to submit a cancellation or refund request, write to us at: resuelve@jurispro.com.mx.",
            "Please include your full name, contracting date, and the service your message refers to."
          ],
        },
      ],
    },
    {
      slug: "aviso-de-privacidad",
      index: "T-03",
      title: "Privacy Policy",
      updated: "January 2026",
      intro:
        "Your trust is the most important thing to us. At WRITE AS A LAWYER S.A. DE C.V., better known as JURISPRO, with address at Mariano Escobedo 375, Piso 14, Dpto. 1403, Colonia Bosque de Chapultepec I Sección, Miguel Hidalgo, C.P. 11580, Mexico City, we understand that your privacy is not only a legal issue, but also a matter of respect and trust. Therefore, we want to tell you clearly and simply how we use, protect, and care for your personal information when you visit our website jurispro.com.mx, when you contract any of our services, or when you interact with us through any digital means.",
      sections: [
        {
          heading: "1. Data Controller",
          body: [
            "The data controller for your personal data is WRITE AS A LAWYER S.A. DE C.V. (JURISPRO). You can contact us via email at resuelve@jurispro.com.mx for any questions or requests related to your personal data."
          ],
        },
        {
          heading: "2. Personal Data We May Collect",
          body: [
            "When you use the Site or contract our services, we may ask for some personal data, depending on the nature of the service. These may include:",
            "Identification data: first name, last name, RFC, CURP, date of birth, business name (if applicable).",
            "Contact data: phone number, email address, tax or commercial address.",
            "Billing and payment data: card number (processed by the payment aggregator, not stored by us), tax receipts, and billing information.",
            "Professional or business data (if applicable): occupation, type of company, sector, or economic activity.",
            "Navigation data: IP address, device type, operating system, cookies, or digital identifiers that help us improve your experience.",
            "We do not request or process sensitive personal data, such as medical, religious, or biometric information."
          ],
        },
        {
          heading: "3. Purposes of Processing",
          body: [
            "We use your personal data exclusively for the following purposes:",
            "Primary purposes (necessary for service provision):",
            "Register, process, and confirm the contracting of our legal or compliance services.",
            "Grant you access to video calls, chats, sessions, or online platforms.",
            "Issue invoices and tax receipts.",
            "Follow up on your requests or legal inquiries.",
            "Contact you regarding updates, clarifications, or incidents with your contract.",
            "Manage and maintain the security of the Site and its digital services.",
            "Secondary purposes (optional, but useful for improving your experience):",
            "Send you information, legal tips, or educational content related to our services.",
            "Invite you to workshops, courses, or events organized by JURISPRO.",
            "Conduct satisfaction and quality improvement surveys.",
            "In case you do not want your data to be used for these secondary purposes, you can request it at any time by sending an email to resuelve@jurispro.com.mx. Your decision will not affect the provision of the services you contract."
          ],
        },
        {
          heading: "4. Use of Cookies and Similar Technologies",
          body: [
            "When you browse our Site, cookies and similar technologies (such as web beacons, pixels, or local storage) are installed to help us improve your experience.",
            "Cookies allow the site to remember your preferences, language, device type, and offer you smoother navigation. We also use analytical cookies (for example, Google Analytics) to understand how users interact with the site and to optimize our content and services.",
            "You can disable or delete cookies from your browser settings at any time, although doing so may affect the functionality of some sections of the site. By continuing to browse jurispro.com.mx, you accept the use of cookies in accordance with this Privacy Policy."
          ],
        },
        {
          heading: "5. Transfers of Personal Data",
          body: [
            "JURISPRO does not sell or share your personal data with third parties without your consent. However, we may transfer your data when necessary to comply with the following situations:",
            "To suppliers who support us in payment processing, web hosting, or technical support (for example, video call or billing platforms).",
            "To competent authorities when required by law, judicial mandate, or legal procedure.",
            "To partners or professional allies only when necessary to attend to the request or service you have contracted.",
            "In all cases, we require such third parties to maintain the same level of protection and confidentiality that we maintain internally."
          ],
        },
        {
          heading: "6. ARCO Rights",
          body: [
            "We know how important it is to have control over your personal information. Therefore, the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP) recognizes a series of rights that you can exercise at any time regarding your data. These are the so-called ARCO Rights:",
            "Access: You can request at any time that we confirm whether we have your personal data and, if so, access them, know their origin, and the purposes for which we use them.",
            "Rectification: If any of your data is incorrect, outdated, or incomplete, you can ask us to correct or update it.",
            "Cancellation: You can request the deletion of your data when you consider that it is not required for any of the indicated purposes, that it is being used improperly, or that the period necessary for its processing has expired.",
            "Opposition: You can oppose the processing of your data for legitimate reasons or when you want to limit its use for secondary or promotional purposes.",
            "Additionally, you can revoke the consent you have granted us for the processing of your personal data at any time, provided it is not necessary to comply with legal obligations derived from an active relationship with you. You can also limit the use or disclosure of your information to stop receiving communications or informative materials.",
            "How to exercise your rights?",
            "To exercise any of these rights, you only need to send a request to the email address resuelve@jurispro.com.mx, indicating the following:",
            "Your full name and some means of contact (email or phone).",
            "A clear description of the right you wish to exercise (access, rectification, cancellation, opposition, revocation, or limitation of use).",
            "Where applicable, the documentation or information that helps us locate your personal data (for example, the service you contracted, date, or folio).",
            "A copy of a document that proves your identity or, if you act on behalf of someone else, a copy of the document that authorizes you as a legal representative.",
            "Deadlines and response",
            "Once your request is received, JURISPRO will send you an acknowledgment of receipt and will analyze the provided information.",
            "The maximum period to respond is 20 business days from the receipt of your request. If your request is valid, we will make the requested action effective within the 15 business days following the date the response is communicated.",
            "In case information or documentation is missing, we will let you know by the same means so you can complete it within a period of 10 business days; this period will not be counted within the initial 20 days.",
            "If you do not receive a response within the indicated time or consider that your request was not properly attended to, you have the right to go to the National Institute of Transparency, Access to Information and Protection of Personal Data (INAI) to file a complaint in accordance with the deadlines established by law."
          ],
        },
        {
          heading: "7. Data Retention and Security",
          body: [
            "Your personal data will only be stored for the time necessary to fulfill the described purposes, the applicable legal deadlines, or until you request their deletion.",
            "JURISPRO adopts reasonable technical, administrative, and physical measures to protect your information against loss, unauthorized access, alteration, or destruction. All information is managed on secure servers and under encryption protocols."
          ],
        },
        {
          heading: "8. Updates to the Privacy Policy",
          body: [
            "We may modify this Privacy Policy at any time to adapt it to legal changes, improvements in our processes, or new services. Updates will be published on this same page, indicating the date of the last modification. We recommend reviewing this document periodically."
          ],
        },
        {
          heading: "9. Consent",
          body: [
            "By using this Site or contracting any of our services, you accept and grant your consent for the processing of your personal data in accordance with this Privacy Policy."
          ],
        },
      ],
    },
  ],
};

export default function LegalPage() {
  const { slug } = useParams() as { slug: string };
  const { lang } = useLanguage();

  const currentDocs = DOCS[lang] || DOCS.es;
  const doc = currentDocs.find((d) => d.slug === slug);
  
  if (!doc) notFound();

  const breadcrumbHome = lang === "es" ? "Inicio" : "Home";
  const docsNavTitle = lang === "es" ? "Documentos" : "Documents";
  const disclaimer = lang === "es" 
    ? "Documento de referencia con fines de demostración. Solicita la versión firmada al despacho." 
    : "Reference document for demonstration purposes. Request the signed version from the firm.";
  const updateKicker = lang === "es" 
    ? `Actualizado · ${doc.updated}` 
    : `Updated · ${doc.updated}`;

  return (
    <>
      <PageHero
        index={doc.index}
        kicker={updateKicker}
        title={doc.title}
        description={doc.intro}
        breadcrumb={[
          { href: "/", label: breadcrumbHome },
          { href: `/legal/${doc.slug}`, label: "Legal" },
        ]}
      />

      <section className="bg-parchment">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav className="lg:col-span-3">
              <p className="label-mono text-ink/45">{docsNavTitle}</p>
              <ul className="mt-5 space-y-3 border-t border-ink/15 pt-5">
                {currentDocs.map((item) => (
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
                    {section.body.map((paragraph, index) => (
                      <p
                        key={index}
                        className="max-w-[70ch] text-[14.5px] leading-relaxed text-ink/65"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <p className="mt-6 border-t border-ink/15 pt-8 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-ink/35">
                {disclaimer}
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}