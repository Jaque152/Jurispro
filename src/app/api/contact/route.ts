import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, telefono, email, asunto, mensaje, lang = "es" } = body;

    const isEs = lang === "es";
    
    // AQUÍ: Ajustamos el Remitente con Nombre "JurisPro" [cite: 1]
    const senderEmail = "JurisPro <resuelve@jurispro.com.mx>";

    // 1. CORREO DE CONFIRMACIÓN PARA EL USUARIO (Bilingüe)
    const userSubject = isEs
      ? `Mensaje recibido: ${asunto} — JurisPro`
      : `Message received: ${asunto} — JurisPro`;

    const userHtml = `
      <div style="background-color: #f7f5f0; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 32px; border: 1px solid #e0dcd5;">
          <h1 style="font-family: serif; font-size: 28px; margin-bottom: 8px; color: #5a1224;">JurisPro</h1>
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-top: 0;">
            ${isEs ? "Confirmación de Contacto" : "Contact Confirmation"}
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

          <p style="font-size: 16px; line-height: 1.5;">
            ${isEs ? `Hola <strong>${nombre}</strong>,` : `Hello <strong>${nombre}</strong>,`}
          </p>
          <p style="font-size: 14px; color: #444; line-height: 1.6;">
            ${
              isEs
                ? `Gracias por escribirnos. Hemos recibido tu mensaje y un abogado de nuestro equipo revisará tu caso para ponerse en contacto contigo en un máximo de 48 horas hábiles.`
                : `Thank you for writing to us. We have received your message and a lawyer from our team will review your case to contact you within 48 business hours.`
            }
          </p>

          <div style="background-color: #f9f9f9; padding: 16px; margin-top: 20px; border-left: 4px solid #5a1224;">
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>${isEs ? "Detalles de tu mensaje:" : "Message details:"}</strong></p>
            <p style="margin: 4px 0; font-size: 13px; color: #555;"><strong>${isEs ? "Teléfono:" : "Phone:"}</strong> ${telefono || "N/A"}</p>
            <p style="margin: 4px 0; font-size: 13px; color: #555;"><strong>${isEs ? "Asunto:" : "Subject:"}</strong> ${asunto}</p>
            <p style="margin: 12px 0 0 0; font-size: 13px; color: #555; white-space: pre-wrap;">"${mensaje}"</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 20px 0;" />

          <p style="font-size: 12px; color: #888; text-align: center;">
            ${isEs ? "Este es un mensaje automático, por favor no respondas a este correo." : "This is an automated message, please do not reply to this email."}
          </p>
        </div>
      </div>
    `;

    // 2. CORREO DE ALERTA PARA EL DESPACHO (Uso interno)
    const adminHtml = `
      <div style="font-family: sans-serif; color: #1a1a1a;">
        <h2 style="color: #5a1224;">Nuevo prospecto / Mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Teléfono:</strong> ${telefono || "No especificado"}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Idioma de navegación:</strong> ${lang.toUpperCase()}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e5e5;" />
        <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${mensaje}</p>
      </div>
    `;

    // Validar si existe la API KEY
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    // Ejecutar ambos envíos en paralelo
    await Promise.all([
      // Enviar al Usuario
      resend.emails.send({
        from: senderEmail,
        to: [email],
        subject: userSubject,
        html: userHtml,
      }),
      // Notificar al Despacho (Reply-To configurado para responderle al cliente directo)
      resend.emails.send({
        from: senderEmail,
        to: ["resuelve@jurispro.com.mx"],
        replyTo: email, 
        subject: `[LEAD] ${asunto} - ${nombre}`,
        html: adminHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { ok: false, message: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}