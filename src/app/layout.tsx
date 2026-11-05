import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Meu Gerente Food",
  description: "Gerente financeiro e operacional para hamburguerias independentes",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${jakartaSans.variable} h-full`}>
      <body className="min-h-screen bg-[#faf9f5] text-[#1b1c1a] antialiased" style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 pl-64 flex flex-col min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
