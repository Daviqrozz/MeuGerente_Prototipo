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
  MessageCircle,
  Settings,
} from "lucide-react";
import { TAREFAS_EXEMPLO } from "@/lib/dados";

const NAV_MAIN = [
  { href: "/", label: "Resumo do dia", icon: LayoutDashboard },
  { href: "/insumos", label: "Insumos e Estoque", icon: Package },
  { href: "/fichas", label: "Cardápio e Pratos", icon: UtensilsCrossed },
  { href: "/margem", label: "Preços e Margem", icon: TrendingUp },
  { href: "/calculadora", label: "Calculadora", icon: Calculator },
];

const NAV_APOIO = [
  { href: "/tarefas", label: "Tarefas", icon: CheckSquare },
  { href: "/whatsapp", label: "WhatsApp Assistente", icon: MessageCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const pendentes = TAREFAS_EXEMPLO.filter((t) => t.status !== "concluida").length;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#f5f4f0] z-50 flex flex-col justify-between border-r border-[#e3e2df]/60 overflow-y-auto">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="px-5 pt-6 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#9f3c16]/10 flex items-center justify-center text-xl">
              🍔
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-[#1b1c1a] leading-tight">Meu Gerente</span>
              <span className="text-[11px] text-[#9f3c16] font-semibold tracking-wide">Food Desk</span>
            </div>
          </div>
        </div>

        {/* Loja ativa */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white border border-[#e3e2df]/60 shadow-xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-[#1b6b42] shrink-0" />
              <div className="truncate">
                <p className="text-xs font-semibold text-[#1b1c1a] truncate">Burger Craft Demo</p>
                <p className="text-[11px] text-[#57423b] truncate">Loja 1 • Demo ativo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nav principal */}
        <nav className="px-4 pt-3 flex flex-col gap-1">
          {NAV_MAIN.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all text-[13px] font-semibold ${
                  isActive
                    ? "bg-[#822801] text-white shadow-sm"
                    : "text-[#57423b] hover:bg-[#efeeea] hover:text-[#1b1c1a]"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Divisor Apoio */}
          <div className="pt-4 pb-1 px-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#57423b]/70">APOIO</span>
          </div>

          {NAV_APOIO.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const badge = item.href === "/tarefas" ? 3 : null;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all text-[13px] font-semibold ${
                  isActive
                    ? "bg-[#822801] text-white shadow-sm"
                    : "text-[#57423b] hover:bg-[#efeeea] hover:text-[#1b1c1a]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={1.8} />
                  <span>{item.label}</span>
                </div>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdcbb] text-[#855000] font-bold text-[11px]">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Usuário no rodapé */}
      <div className="p-4">
        <div className="p-3.5 rounded-2xl bg-white border border-[#e3e2df]/60 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1b1c19] text-white flex items-center justify-center font-bold text-xs">
              N
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1b1c1a]">Roberto</p>
              <p className="text-[11px] text-[#57423b]">Dono da Loja</p>
            </div>
          </div>
          <button type="button" className="text-[#57423b]/70 hover:text-[#1b1c1a] transition-colors" title="Configurações">
            <Settings className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </aside>
  );
}
