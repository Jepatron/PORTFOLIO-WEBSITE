import { Playfair_Display, Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

// This stays the outermost layout (Next.js requires exactly one <html>),
// but everything locale-specific — Nav, Footer, metadata, structured data —
// lives one level down in app/[locale]/layout.tsx, since this file sits
// above the [locale] route segment and can't read that param directly.
// getLocale() reads the locale the middleware already resolved instead.

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream font-body text-charcoal antialiased">{children}</body>
    </html>
  );
}
