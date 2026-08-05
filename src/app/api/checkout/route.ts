import { NextResponse } from "next/server";
import { Resend } from "resend";

const KEYCOP_BASE_URL = "https://pagos.keycop.com.mx/api/v1";

// Interfaces estrictas 
interface CartLineItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
}

interface CheckoutRequestPayload {
  orderNumber: string;
  customer: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    calle: string;
    colonia: string;
    ciudad: string;
    estado: string;
    cp: string;
    pais: string;
  };
  lines: CartLineItem[];
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
  lang: "es" | "en";
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body: CheckoutRequestPayload = await req.json();
    const { orderNumber, customer, lines, subtotal, discount, iva, total, cardData, lang } = body;

    if (!customer || !lines || lines.length === 0) {
      return NextResponse.json(
        { ok: false, message: lang === "en" ? "Invalid order data" : "Datos de orden inválidos" },
        { status: 400 }
      );
    }

    const keycopEmail = process.env.KEYCOP_EMAIL;
    const keycopPassword = process.env.KEYCOP_PASSWORD;

    if (!keycopEmail || !keycopPassword) {
      console.error("Faltan variables de entorno KEYCOP_EMAIL / KEYCOP_PASSWORD.");
      return NextResponse.json({ ok: false, message: "Error de configuración de la pasarela." }, { status: 500 });
    }

    // ==========================================
    // 1. INICIAR SESIÓN (SIGNIN)
    // ==========================================
    const signinRes = await fetch(`${KEYCOP_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        email: keycopEmail,
        password: keycopPassword,
      }),
    });

    const signinData = await signinRes.json();
    if (!signinData.authToken) {
      console.error("[Keycop Auth Error]", signinData);
      return NextResponse.json(
        { ok: false, message: lang === "en" ? "Payment gateway authentication failed." : "Error de autenticación con la pasarela." },
        { status: 502 }
      );
    }

    const authToken = signinData.authToken;
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    // ==========================================
    // 2. FORMATO Y TOKENIZACIÓN DE TARJETA
    // ==========================================
    const cleanExp = cardData.expiry.replace(/\D/g, "");
    const expirationMonth = cleanExp.slice(0, 2);
    const expirationYear = "20" + cleanExp.slice(2, 4);

    const tokenRes = await fetch(`${KEYCOP_BASE_URL}/card/tokenizer`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        cardData: {
          cardNumber: cardData.number.replace(/\s/g, ""),
          cardholderName: cardData.holder,
          expirationMonth,
          expirationYear,
        },
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.cardNumberToken) {
      console.error("[Keycop Tokenizer Error]", tokenData);
      return NextResponse.json(
        { ok: false, message: lang === "en" ? "Card encryption failed. Check card details." : "Error al encriptar la tarjeta. Verifica los datos." },
        { status: 400 }
      );
    }

    // ==========================================
    // 3. PROCESAR COBRO (SALE)
    // ==========================================
    const formattedItems = lines.map((line: CartLineItem) => ({
      title: line.name,
      amount: Number(line.price),
      quantity: Number(line.qty),
      id: String(line.id),
    }));

    const address1 = customer.colonia ? `${customer.calle}, ${customer.colonia}` : customer.calle;

    // CRÍTICO: Keycop colapsa (502 HTML) si la IP viene en formato IPv6 (ej. ::1 de localhost). Forzamos IPv4.
    let rawIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    if (rawIp.includes(":")) {
        rawIp = "127.0.0.1";
    }

    const salePayload = {
      amount: Number(total.toFixed(2)),
      currency: 484, // ISO MXN
      reference: orderNumber,
      customerInformation: {
        firstName: customer.nombre.split(" ")[0] || customer.nombre,
        lastName: customer.apellidos || customer.nombre.split(" ").slice(1).join(" ") || "Cliente",
        email: customer.email,
        phone1: customer.telefono || "0000000000",
        city: customer.ciudad,
        address1: address1,
        postalCode: customer.cp,
        state: customer.estado,
        country: customer.pais || "MX",
        ip: rawIp,
      },
      cardData: {
        cardNumberToken: tokenData.cardNumberToken,
        cvv: cardData.cvv,
      },
      items: formattedItems,
      redirectUrl: req.headers.get("origin") || "https://jurispro.com.mx",
    };

    const saleRes = await fetch(`${KEYCOP_BASE_URL}/sale`, {
      method: "POST",
      headers,
      body: JSON.stringify(salePayload),
    });

    // Validación anti-caídas. Leemos como texto primero.
    const saleText = await saleRes.text();
    let saleData;
    try {
      saleData = JSON.parse(saleText);
    } catch (e) {
      console.error("[Keycop HTML Error] Sale devolvió HTML en vez de JSON:", saleText.substring(0, 200));
      return NextResponse.json(
        { ok: false, message: "El servidor del banco experimentó un error interno (502 Bad Gateway)." },
        { status: 502 }
      );
    }

    if (saleData.status !== "APPROVED") {
      console.error("[Keycop Sale Declined/Error]", saleData);
      return NextResponse.json(
        { 
          ok: false,
          message: saleData.message || saleData.error || (lang === "en" ? "Payment declined by issuing bank." : "El pago fue declinado por el banco emisor."),
          status: saleData.status 
        },
        { status: 402 }
      );
    }

    // ==========================================
    // 4. ENVIAR CORREOS DE CONFIRMACIÓN
    // ==========================================
    if (process.env.RESEND_API_KEY) {
      const emailHtml = buildEmailTemplate({ orderId: orderNumber, form: customer, items: lines, subtotal, discount, iva, total, lang, transactionId: saleData.transactionId || saleData.authorizationNumber });     
      const adminEmail = "JurisPro <resuelve@jurispro.com.mx>";

      // Envío al Cliente
      try {
        await resend.emails.send({
          from: adminEmail,
          to: [customer.email],
          subject: lang === "en" ? `Case File Confirmation ${orderNumber} — JurisPro` : `Confirmación de Expediente ${orderNumber} — JurisPro`,
          html: emailHtml.customer,
        });
      } catch (err) {
        console.error("[Resend Customer Exception]", err);
      }

      // Envío al Administrador
      try {
        await resend.emails.send({
          from: adminEmail,
          to: ["resuelve@jurispro.com.mx"],
          subject: `[Nueva Orden Pagada] ${orderNumber} — $${total.toLocaleString("en-US")} MXN`,
          html: emailHtml.admin,
        });
      } catch (err) {
        console.error("[Resend Admin Exception]", err);
      }
    }

    return NextResponse.json({ 
      ok: true, 
      orderNumber, 
      transactionId: saleData.transactionId || saleData.authorizationNumber || orderNumber,
      status: saleData.status 
    });

  } catch (error: unknown) {
    console.error("[Checkout Route Exception]", error);
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------
// Generador de Plantillas de Correo (HTML)
// ---------------------------------------------------------
function buildEmailTemplate({ 
  orderId, form, items, subtotal, discount, iva, total, lang, transactionId 
}: { 
  orderId: string, form: any, items: CartLineItem[], subtotal: number, discount: number, iva: number, total: number, lang: string, transactionId: string 
}) {
  const isEn = lang === "en";
  const itemsListHtml = items.map((line: CartLineItem) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-family: sans-serif; font-size: 14px;">
          <strong>${line.name}</strong> x${line.qty}
          ${line.note ? `<br/><small style="color: #666;">${line.note}</small>` : ""}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right; font-family: monospace; font-size: 14px;">
          $${(line.price * line.qty).toLocaleString("en-US", {minimumFractionDigits: 2})} MXN
        </td>
      </tr>`).join("");

  const baseHtml = (title: string, intro: string, isClient: boolean = true) => `
    <div style="background-color: #f7f5f0; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 32px; border: 1px solid #e0dcd5;">
        <h1 style="font-family: serif; font-size: 28px; margin-bottom: 8px; color: #5a1224;">JurisPro</h1>
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-top: 0;">${title}</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
        <p style="font-size: 16px; line-height: 1.5;">${intro}</p>
        <div style="background: #fcfcfc; padding: 15px 20px; margin: 20px 0; border-left: 4px solid #5a1224;">
          <p style="margin: 0; font-size: 14px;"><strong>${isEn ? "File Folio" : "Folio de Expediente"}:</strong> ${orderId}</p>
          <p style="margin: 5px 0 0; font-size: 14px;"><strong>${isEn ? "Client" : "Cliente"}:</strong> ${form.nombre} ${form.apellidos} (${form.email})</p>
          <p style="margin: 5px 0 0; font-size: 14px;"><strong>${isEn ? "Phone" : "Teléfono"}:</strong> ${form.telefono || "N/A"}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
          <thead>
            <tr style="text-align: left; font-size: 11px; text-transform: uppercase; color: #888; border-bottom: 2px solid #1a1a1a;">
              <th style="padding-bottom: 8px;">${isEn ? "Service" : "Servicio"}</th>
              <th style="padding-bottom: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>${itemsListHtml}</tbody>
        </table>
        <div style="margin-top: 20px; text-align: right; font-family: monospace; font-size: 13px;">
          <p style="margin: 4px 0; color: #666;">Subtotal: $${subtotal.toLocaleString("en-US", {minimumFractionDigits: 2})} MXN</p>
          ${discount > 0 ? `<p style="margin: 4px 0; color: #5a1224;">${isEn ? "Discount" : "Descuento"}: −$${discount.toLocaleString("en-US", {minimumFractionDigits: 2})} MXN</p>` : ""}
          <p style="margin: 4px 0; color: #666;">IVA (16%): $${iva.toLocaleString("en-US", {minimumFractionDigits: 2})} MXN</p>
          <h2 style="font-size: 22px; color: #1a1a1a; margin: 12px 0 0 0; font-family: sans-serif;">Total: $${total.toLocaleString("en-US", {minimumFractionDigits: 2})} MXN</h2>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 20px 0;" />
        ${isClient ? `
          <h3 style="font-size: 15px; margin-bottom: 8px;">${isEn ? "Next Steps" : "¿Qué sigue?"}</h3>
          <ol style="font-size: 13px; color: #555; padding-left: 20px; line-height: 1.6;">
            <li>${isEn ? "A JurisPro lawyer will review your details." : "Un abogado de JurisPro revisará tus datos."}</li>
            <li>${isEn ? "You'll receive an email to schedule your session." : "Recibirás un correo para agendar tu sesión."}</li>
            <li>${isEn ? "Your CFDI 4.0 invoice will be issued shortly." : "Tu comprobante/CFDI 4.0 será emitido en breve."}</li>
          </ol>
        ` : ''}
        <div style="margin-top: 32px; padding: 16px; background-color: #f7f5f0; font-size: 11px; color: #777; text-align: center;">
          ID de Transacción KEYCOP: <strong>${transactionId || "N/A"}</strong>
        </div>
      </div>
    </div>
  `;

  return {
    customer: baseHtml(
      isEn ? "Payment Confirmation" : "Confirmación de Pago",
      isEn ? `Dear <strong>${form.nombre}</strong>,<br/><br/>We have successfully received your payment via <strong>credit/debit card</strong>. Your case file has been opened under reference <strong>${orderId}</strong>.` : `Estimado(a) <strong>${form.nombre}</strong>,<br/><br/>Hemos recibido tu pago correctamente mediante <strong>tarjeta bancaria</strong>. Tu expediente ha sido abierto bajo el folio <strong>${orderId}</strong>.`,
      true
    ),
    admin: baseHtml(
      "Nueva Orden Pagada Registrada",
      `Se ha aprobado un nuevo pago por $${total.toLocaleString("en-US", {minimumFractionDigits: 2})} MXN vía Keycop para el cliente ${form.nombre} ${form.apellidos}.`,
      false
    ),
  };
}