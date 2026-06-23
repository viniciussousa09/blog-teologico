import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // Importando o nosso componente!

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Doutrina & Vida",
  description: "Um espaço dedicado ao ensino das doutrinas da graça e cosmovisão reformada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#FFFFFF] text-[#111111] antialiased`}
        suppressHydrationWarning
      >
        <Header />

        {/* Aqui entra o conteúdo dinâmico das páginas */}
        {children}

      </body>
    </html>
  );
}