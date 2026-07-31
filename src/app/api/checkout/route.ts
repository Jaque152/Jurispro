import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
}

interface CheckoutBody {
  orderNumber: string;
  customer: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
  };
  lines: CartLine[];
  subtotal: number;
  discount: number;
  iva: number;
  total: number;
  cardData: {
    number: string;
    expiry: string;
    cvv: string;
    holder: string;
  };
  lang?: "es" | "en";
}

export async function POST(request: Request) {
  try {
    const body: CheckoutBody = await request.json();
    const {
      orderNumber,
      customer,
      lines,
      subtotal,
      discount,
      iva,
      total,
      cardData,
      lang = "es",
    } = body;

    // ==========================================
    // 1. PROCESAR PAGO CON KEYCOP API
    // ==========================================
    const keycopEmail = process.env.KEYCOP_EMAIL;
    const keycopPassword = process.env.KEYCOP_PASSWORD;
    const keycopApiUrl = process.env.KEYCOP_API_URL || "https://api.keycop.com.mx";
    
    let transactionId = `KC-${Date.now()}`;

    if (keycopEmail && keycopPassword) {
      // Limpiamos los datos de la tarjeta para evitar errores de formato (ej. si el usuario pone "12 / 25")
      const cleanCardNumber = cardData.number?.replace(/\s/g, "");
      const cleanExpiry = cardData.expiry?.replace(/\s/g, "").split("/");
      const expMonth = cleanExpiry?.[0];
      const expYear = cleanExpiry?.[1]?.length === 2 ? `20${cleanExpiry[1]}` : cleanExpiry?.[1];

      const keycopResponse = await fetch(`${keycopApiUrl}/v1/transactions/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${Buffer.from(`${keycopEmail}:${keycopPassword}`).toString("base64")}`,
        },
        body: JSON.stringify({
          reference: orderNumber,
          amount: Number(total.toFixed(2)), // Aseguramos formato numérico exacto de 2 decimales
          currency: 484, // CORRECCIÓN CRÍTICA: Keycop requiere el código ISO 4217 numérico (484) para MXN
          customerInformation: {
            firstName: customer.nombre,
            lastName: customer.apellidos,
            email: customer.email,
            phone1: customer.telefono,
          },
          cardData: {
            cardNumber: cleanCardNumber,
            expirationMonth: expMonth,
            expirationYear: expYear,
            cvv: cardData.cvv,
            cardHolderName: cardData.holder,
          }
        }),
      });

      if (!keycopResponse.ok) {
        const errorData = await keycopResponse.json().catch(() => ({}));
        return NextResponse.json(
          { ok: false, message: errorData.message || "Error al procesar la tarjeta con KEYCOP." },
          { status: 400 }
        );
      }

      const keycopResult = await keycopResponse.json();
      transactionId = keycopResult.id || keycopResult.transactionId || transactionId;
    } else {
      console.warn("KEYCOP credentials not found. Simulating successful payment.");
    }

    // ==========================================
    // 2. ENVIAR CORREO DE CONFIRMACIÓN (RESEND)
    // ==========================================
    if (process.env.RESEND_API_KEY && customer.email) {
      const isEs = lang === "es";
      const subject = isEs
        ? `Confirmación de Expediente ${orderNumber} — Lawyer Consultant`
        : `Case File Confirmation ${orderNumber} — Lawyer Consultant`;

      const itemsHtml = lines
        .map(
          (line: CartLine) => `
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
              ${isEs ? "Confirmación de Pago" : "Payment Confirmation"}
            </p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <p style="font-size: 16px;">
              ${isEs ? `Estimado(a) <strong>${customer.nombre}</strong>,` : `Dear <strong>${customer.nombre}</strong>,`}
            </p>
            <p style="font-size: 14px; color: #444; line-height: 1.6;">
              ${isEs 
                  ? `Hemos recibido tu pago correctamente mediante <strong>tarjeta bancaria</strong>. Tu expediente ha sido abierto bajo el folio <strong>${orderNumber}</strong>.`
                  : `We have successfully received your payment via <strong>credit/debit card</strong>. Your case file has been opened under reference <strong>${orderNumber}</strong>.`}
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
              <thead>
                <tr style="text-align: left; font-size: 11px; text-transform: uppercase; color: #888; border-bottom: 2px solid #1a1a1a;">
                  <th style="padding-bottom: 8px;">${isEs ? "Servicio" : "Service"}</th>
                  <th style="padding-bottom: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>
            <div style="margin-top: 20px; text-align: right; font-family: monospace; font-size: 13px;">
              <p style="margin: 4px 0; color: #666;">Subtotal: $${subtotal.toFixed(2)} MXN</p>
              ${discount > 0 ? `<p style="margin: 4px 0; color: #5a1224;">${isEs ? "Descuento" : "Discount"}: −$${discount.toFixed(2)} MXN</p>` : ""}
              <p style="margin: 4px 0; color: #666;">IVA (16%): $${iva.toFixed(2)} MXN</p>
              <h2 style="font-size: 22px; color: #1a1a1a; margin: 12px 0 0 0; font-family: sans-serif;">Total: $${total.toFixed(2)} MXN</h2>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 20px 0;" />
            <h3 style="font-size: 15px; margin-bottom: 8px;">${isEs ? "¿Qué sigue?" : "Next Steps"}</h3>
            <ol style="font-size: 13px; color: #555; padding-left: 20px; line-height: 1.6;">
              <li>${isEs ? "Un abogado revisará tus datos." : "A lawyer will review your details."}</li>
              <li>${isEs ? "Recibirás un correo para agendar tu sesión." : "You'll receive an email to schedule your session."}</li>
              <li>${isEs ? "Tu comprobante/CFDI 4.0 será emitido en breve." : "Your CFDI 4.0 invoice will be issued shortly."}</li>
            </ol>
            <div style="margin-top: 32px; padding: 16px; background-color: #f7f5f0; font-size: 11px; color: #777; text-align: center;">
              ID de Transacción KEYCOP: <strong>${transactionId}</strong>
            </div>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: process.env.SENDER_EMAIL || "resuelve@lawyerconsultant.com.mx",
        to: [customer.email],
        subject,
        html: emailHtml,
      });
    }

    return NextResponse.json({ ok: true, transactionId, orderNumber });
    
  } catch (error: unknown) { // Corrección del catch(any)
    console.error("Error in checkout:", error);
    return NextResponse.json(
      { 
        ok: false, 
        message: error instanceof Error ? error.message : "Error interno del servidor." 
      },
      { status: 500 }
    );
  }
}