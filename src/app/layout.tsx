import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Meu Gerente Food | Gestão Financeira e Operacional",
  description:
    "Gerente financeiro e operacional que mostra onde o lucro escapa e sugere ações para hamburguerias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-zinc-50 text-zinc-900 antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              <strong>Meu Gerente Food</strong> — Protótipo de Demonstração Comercial
            </span>
            <span>
              Cálculos em funções puras • Sem IA calculadora • Dados simulados
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
