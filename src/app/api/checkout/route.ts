import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderNumber,
      customer,
      lines,
      subtotal,
      discount,
      iva,
      total,
      method,
      cardData,
      lang = "es",
    } = body;

    // 1. Autenticación y procesamiento con KEYCOP API
    const keycopEmail = process.env.KEYCOP_EMAIL;
    const keycopPassword = process.env.KEYCOP_PASSWORD;
    const keycopApiUrl = "https://api.keycop.com.mx";

    if (!keycopEmail || !keycopPassword) {
      console.warn("KEYCOP credentials not found in environment. Running in sandbox mode.");
    }

    // Petición de cobro a KEYCOP
    let paymentSuccess = true;
    let transactionId = `KC-${Date.now()}`;

    if (keycopEmail && keycopPassword) {
      const keycopResponse = await fetch(`${keycopApiUrl}/v1/transactions/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${Buffer.from(`${keycopEmail}:${keycopPassword}`).toString("base64")}`,
        },
        body: JSON.stringify({
          reference: orderNumber,
          amount: total,
          currency: "MXN",
          customerInformation: {
            firstName: customer.nombre,
            lastName: customer.apellidos,
            email: customer.email,
            phone1: customer.telefono,
          },
          cardData: method === "tarjeta" ? {
            cardNumber: cardData.number?.replace(/\s/g, ""),
            expirationMonth: cardData.expiry?.split("/")[0],
            expirationYear: `20${cardData.expiry?.split("/")[1]}`,
            cvv: cardData.cvv,
            cardHolderName: cardData.holder,
          } : undefined,
        }),
      });

      if (!keycopResponse.ok) {
        const errorData = await keycopResponse.json().catch(() => ({}));
        return NextResponse.json(
          { ok: false, message: errorData.message || "Error al procesar el pago con KEYCOP." },
          { status: 400 }
        );
      }

      const keycopResult = await keycopResponse.json();
      transactionId = keycopResult.transactionId || transactionId;
    }

    // 2. Envío de Correo de Confirmación vía RESEND (Bilingüe)
    if (process.env.RESEND_API_KEY && customer.email) {
      const isEs = lang === "es";
      
      const subject = isEs
        ? `Confirmación de Expediente ${orderNumber} — Lawyer Consultant`
        : `Case File Confirmation ${orderNumber} — Lawyer Consultant`;

      const itemsHtml = lines
        .map(
          (line: any) => `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-family: sans-serif; font-size: 14px;">
              <strong>${line.name}</strong> x${line.qty}
              ${line.note ? `<br/><small style="color: #666;">${line.note}</small>` : ""}
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; text-align: right; font-family: monospace; font-size: 14px;">
              $${(line.price * line.qty).toFixed(2)} MXN
            </td>
          </tr>`
        )
        .join("");

      const emailHtml = `
        <div style="background-color: #f7f5f0; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 32px; border: 1px solid #e0dcd5;">
            <h1 style="font-family: serif; font-size: 28px; margin-bottom: 8px; color: #5a1224;">Lawyer Consultant</h1>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-top: 0;">
              ${isEs ? "Confirmación de Pedido" : "Order Confirmation"}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

            <p style="font-size: 16px; leading-height: 1.5;">
              ${isEs ? `Estimado(a) <strong>${customer.nombre} ${customer.apellidos}</strong>,` : `Dear <strong>${customer.nombre} ${customer.apellidos}</strong>,`}
            </p>
            <p style="font-size: 14px; color: #444; line-height: 1.6;">
              ${
                isEs
                  ? `Hemos recibido tu pago correctamente a través de <strong>KEYCOP</strong>. Tu expediente ha sido abierto bajo el folio <strong>${orderNumber}</strong>.`
                  : `We have successfully received your payment via <strong>KEYCOP</strong>. Your case file has been opened under reference <strong>${orderNumber}</strong>.`
              }
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
              <thead>
                <tr style="text-align: left; font-size: 11px; text-transform: uppercase; color: #888; border-bottom: 2px solid #1a1a1a;">
                  <th style="padding-bottom: 8px;">${isEs ? "Servicio" : "Service"}</th>
                  <th style="padding-bottom: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top: 20px; text-align: right; font-family: monospace; font-size: 13px;">
              <p style="margin: 4px 0; color: #666;">Subtotal: $${subtotal.toFixed(2)} MXN</p>
              ${discount > 0 ? `<p style="margin: 4px 0; color: #5a1224;">${isEs ? "Descuento" : "Discount"}: −$${discount.toFixed(2)} MXN</p>` : ""}
              <p style="margin: 4px 0; color: #666;">IVA (16%): $${iva.toFixed(2)} MXN</p>
              <h2 style="font-size: 22px; color: #1a1a1a; margin: 12px 0 0 0; font-family: sans-serif;">
                Total: $${total.toFixed(2)} MXN
              </h2>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 20px 0;" />

            <h3 style="font-size: 15px; margin-bottom: 8px;">${isEs ? "¿Qué sigue?" : "Next Steps"}</h3>
            <ol style="font-size: 13px; color: #555; padding-left: 20px; line-height: 1.6;">
              <li>${isEs ? "Un abogado especialista revisará tus datos." : "A specialist lawyer will review your details."}</li>
              <li>${isEs ? "Recibirás un correo para agendar tu sesión de trabajo." : "You will receive an email to schedule your working session."}</li>
              <li>${isEs ? "Tu comprobante/CFDI 4.0 será emitido en el transcurso del día." : "Your CFDI 4.0 invoice will be issued during the day."}</li>
            </ol>

            <div style="margin-top: 32px; padding: 16px; background-color: #f7f5f0; font-size: 12px; color: #777; text-align: center;">
              ID de Transacción KEYCOP: <strong>${transactionId}</strong>
            </div>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
        to: [customer.email],
        subject,
        html: emailHtml,
      });
    }

    return NextResponse.json({
      ok: true,
      transactionId,
      orderNumber,
    });
  } catch (error: any) {
    console.error("Error in checkout route:", error);
    return NextResponse.json(
      { ok: false, message: error.message || "Error interno del servidor." },
      { status: 500 }
    );
  }
}