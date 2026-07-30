import type { Metadata } from "next";
import { Instrument_Serif, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jurispro  — Soluciones legales para empresas",
    template: "%s — Jurispro ",
  },
  description:
    "Despacho legal corporativo en Ciudad de México. Asesoría societaria, cumplimiento normativo y planes de acompañamiento jurídico con precios claros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <LanguageProvider>  {/* <-- Envolvemos con el Provider */}
            <CartProvider>
              <SiteHeader />
              <main className="min-h-screen">{children}</main>
              <SiteFooter />
              <CartDrawer />
              <Toaster />
            </CartProvider>
          </LanguageProvider>
        </ClientBody>
      </body>
    </html>
  );
}
