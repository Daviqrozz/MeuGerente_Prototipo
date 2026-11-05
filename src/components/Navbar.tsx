"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  UtensilsCrossed,
  TrendingUp,
  Calculator,
  CheckSquare,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Resumo do Dia", icon: LayoutDashboard },
  { href: "/insumos", label: "Insumos", icon: Package },
  { href: "/fichas", label: "Fichas Técnicas", icon: UtensilsCrossed },
  { href: "/margem", label: "Margem por Canal", icon: TrendingUp },
  { href: "/calculadora", label: "Calculadora", icon: Calculator },
  { href: "/tarefas", label: "Tarefas & Alertas", icon: CheckSquare },
  { href: "/whatsapp", label: "WhatsApp Simulado", icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50 shadow-xs">
      {/* Barra superior de aviso de Demonstração */}
      <div className="bg-amber-500 text-amber-950 px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>
            <strong>Ambiente de Demonstração:</strong> Dados e números simulados da hamburgueria &quot;Burger Craft Demo&quot;.
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider bg-amber-600/30 px-2 py-0.5 rounded">
          Protótipo Funcional
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 tracking-tight">
              <span className="text-2xl">🍔</span>
              <span>Meu Gerente <span className="text-emerald-600 font-extrabold">Food</span></span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-zinc-500"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Navegação móvel horizontal */}
      <div className="md:hidden border-t border-zinc-100 overflow-x-auto py-2 px-3 flex gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white font-medium"
                  : "bg-zinc-100 text-zinc-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
