import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Domaine de Saman — Private estate in the Pyrenees",
  description:
    "A private 5-hectare estate at the foot of the Pyrenees, sleeping 15 — for families & groups, weddings, and yoga retreats.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream font-body text-charcoal antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
