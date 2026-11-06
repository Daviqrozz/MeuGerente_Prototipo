"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import {
  LayoutDashboard,
  Package,
  UtensilsCrossed,
  TrendingUp,
  Calculator,
  CheckSquare,
  MessageCircle,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
  Zap,
  Store,
  Plus,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  subItems?: SubItem[];
  badge?: number;
}

const NAV_MAIN: NavItem[] = [
  {
    id: "resumo",
    label: "Resumo do dia",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    id: "insumos",
    label: "Insumos e Estoque",
    href: "/insumos",
    icon: Package,
    subItems: [
      { label: "Visão Geral do Estoque", href: "/insumos" },
      { label: "Alertas de Reposição", href: "/insumos" },
    ],
  },
  {
    id: "fichas",
    label: "Cardápio e Pratos",
    href: "/fichas",
    icon: UtensilsCrossed,
    subItems: [
      { label: "Fichas Técnicas", href: "/fichas" },
      { label: "Simulador de Economia", href: "/fichas" },
    ],
  },
  {
    id: "margem",
    label: "Preços e Margem",
    href: "/margem",
    icon: TrendingUp,
    subItems: [
      { label: "Margem por Canal", href: "/margem" },
      { label: "Calculadora de Preço", href: "/calculadora" },
    ],
  },
  {
    id: "calculadora",
    label: "Calculadora",
    href: "/calculadora",
    icon: Calculator,
  },
];

const NAV_APOIO: NavItem[] = [
  {
    id: "tarefas",
    label: "Tarefas",
    href: "/tarefas",
    icon: CheckSquare,
    badge: 3,
  },
  {
    id: "whatsapp",
    label: "Meu gerente",
    href: "/whatsapp",
    icon: MessageCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    insumos: false,
    fichas: false,
    margem: false,
  });

  const [isAcessoRapidoOpen, setIsAcessoRapidoOpen] = useState(false);
  const [isLojaSelectorOpen, setIsLojaSelectorOpen] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);

  // Auto-expande o submenu da rota atual se aplicável
  useEffect(() => {
    if (pathname.startsWith("/insumos")) {
      setOpenSubmenus((prev) => ({ ...prev, insumos: true }));
    } else if (pathname.startsWith("/fichas")) {
      setOpenSubmenus((prev) => ({ ...prev, fichas: true }));
    } else if (pathname.startsWith("/margem") || pathname.startsWith("/calculadora")) {
      setOpenSubmenus((prev) => ({ ...prev, margem: true }));
    }
  }, [pathname]);

  const toggleSubmenu = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#f5f4f0] z-50 flex flex-col justify-between border-r border-[#e3e2df]/60 transition-all duration-300 ease-in-out select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
        
        {/* Top Header: Logo + Toggle Hamburger Button */}
        <div className="p-4 pb-2">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-3 pt-2">
              <button
                type="button"
                onClick={toggleSidebar}
                className="w-11 h-11 rounded-2xl bg-white hover:bg-[#eae8e3] border border-[#e3e2df]/60 flex items-center justify-center text-[#1b1c1a] shadow-2xs hover:scale-105 transition-all"
                title="Expandir menu"
              >
                <Menu className="w-5 h-5 text-[#1b1c1a]" />
              </button>
              <div
                className="w-10 h-10 rounded-2xl bg-[#9f3c16]/10 flex items-center justify-center text-xl cursor-pointer"
                onClick={toggleSidebar}
                title="Meu Gerente Food Desk"
              >
                🍔
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2 px-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#9f3c16]/10 flex items-center justify-center text-xl shrink-0">
                  🍔
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#1b1c1a] leading-tight">
                    Meu Gerente
                  </span>
                  <span className="text-[11px] text-[#9f3c16] font-semibold tracking-wide">
                    Food Desk
                  </span>
                </div>
              </div>

              {/* Botão de recolher/expandir (estilo do vídeo) */}
              <button
                type="button"
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-xl bg-white/60 hover:bg-white text-[#57423b] hover:text-[#1b1c1a] flex items-center justify-center border border-[#e3e2df]/60 transition-colors shadow-2xs"
                title="Recolher menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Botão Acesso Rápido ⚡ (Exatamente como visto no vídeo) */}
        <div className="px-3 pt-2 relative">
          {isCollapsed ? (
            <div className="flex justify-center relative">
              <button
                type="button"
                onClick={() => setIsAcessoRapidoOpen(!isAcessoRapidoOpen)}
                className="w-12 h-11 rounded-2xl bg-[#9f3c16] text-white hover:bg-[#822801] shadow-xs flex items-center justify-center hover:scale-105 transition-all"
                title="Acesso Rápido"
              >
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              </button>

              {/* Flyout Acesso Rápido quando colapsado */}
              {isAcessoRapidoOpen && (
                <div className="absolute left-full ml-3 top-0 w-64 bg-white rounded-2xl p-2 shadow-2xl border border-[#e3e2df] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[#f5f4f0] text-xs font-bold text-[#1b1c1a] flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#9f3c16]" />
                    <span>Ações Rápidas</span>
                  </div>
                  <div className="flex flex-col gap-1 pt-1 text-xs">
                    <Link
                      href="/calculadora"
                      onClick={() => setIsAcessoRapidoOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                    >
                      <span>🧮</span>
                      <span>Calcular Preço de Lanche</span>
                    </Link>
                    <Link
                      href="/insumos"
                      onClick={() => setIsAcessoRapidoOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                    >
                      <span>📦</span>
                      <span>Cadastrar Novo Insumo</span>
                    </Link>
                    <Link
                      href="/fichas"
                      onClick={() => setIsAcessoRapidoOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                    >
                      <span>🍔</span>
                      <span>Ver Ficha Técnica</span>
                    </Link>
                    <Link
                      href="/tarefas"
                      onClick={() => setIsAcessoRapidoOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                    >
                      <span>✅</span>
                      <span>Nova Tarefa Operacional</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAcessoRapidoOpen(!isAcessoRapidoOpen)}
                className="w-full bg-[#9f3c16] hover:bg-[#822801] text-white rounded-2xl py-2.5 px-3.5 flex items-center justify-between text-xs font-bold shadow-xs transition-all"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Acesso Rápido</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isAcessoRapidoOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Menu Acesso Rápido Dropdown quando expandido */}
              {isAcessoRapidoOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl p-2 shadow-xl border border-[#e3e2df] z-50 flex flex-col gap-1 text-xs">
                  <Link
                    href="/calculadora"
                    onClick={() => setIsAcessoRapidoOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                  >
                    <span>🧮</span>
                    <span>Calcular Preço de Lanche</span>
                  </Link>
                  <Link
                    href="/insumos"
                    onClick={() => setIsAcessoRapidoOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                  >
                    <span>📦</span>
                    <span>Cadastrar Novo Insumo</span>
                  </Link>
                  <Link
                    href="/fichas"
                    onClick={() => setIsAcessoRapidoOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                  >
                    <span>🍔</span>
                    <span>Ver Ficha Técnica</span>
                  </Link>
                  <Link
                    href="/tarefas"
                    onClick={() => setIsAcessoRapidoOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-[#faf9f5] text-[#1b1c1a] flex items-center gap-2.5 font-medium transition-colors"
                  >
                    <span>✅</span>
                    <span>Nova Tarefa Operacional</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Seletor de Loja / Unidades */}
        <div className="px-3 pt-2 relative">
          {isCollapsed ? (
            <div className="flex justify-center group relative">
              <button
                type="button"
                onClick={() => setIsLojaSelectorOpen(!isLojaSelectorOpen)}
                className="w-12 h-11 rounded-2xl bg-white border border-[#e3e2df]/60 shadow-2xs flex items-center justify-center hover:bg-[#eae8e3] transition-colors relative"
                title="Burger Craft Demo (Loja 1 • Ativa)"
              >
                <Store className="w-5 h-5 text-[#1b1c1a]" />
                <span className="w-2 h-2 rounded-full bg-[#1b6b42] absolute top-2 right-2 border-2 border-white" />
              </button>

              {/* Tooltip quando colapsado */}
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1b1c19] text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg z-50">
                Burger Craft Demo (Loja 1)
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLojaSelectorOpen(!isLojaSelectorOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-white border border-[#e3e2df]/60 shadow-2xs hover:bg-[#fbf9f4] transition-colors text-left"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="w-2 h-2 rounded-full bg-[#1b6b42] shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-[#1b1c1a] truncate">
                      Burger Craft Demo
                    </p>
                    <p className="text-[11px] text-[#57423b] truncate">
                      Loja 1 • Demo ativo
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#8a726a] shrink-0 transition-transform ${
                    isLojaSelectorOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown de Unidades */}
              {isLojaSelectorOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl p-2 shadow-xl border border-[#e3e2df] z-50 text-xs flex flex-col gap-1">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#8a726a]">
                    Suas Unidades
                  </div>
                  <div className="p-2 rounded-xl bg-[#faf9f5] flex items-center justify-between font-bold text-[#1b1c1a]">
                    <span>Loja 1 • Principal</span>
                    <Check className="w-3.5 h-3.5 text-[#1b6b42]" />
                  </div>
                  <div className="p-2 rounded-xl hover:bg-[#f5f4f0] text-[#57423b] flex items-center justify-between cursor-pointer">
                    <span>Loja 2 • Delivery Bairro</span>
                    <span className="text-[10px] text-[#8a726a]">Em breve</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navegação Principal */}
        <nav className="px-3 pt-3 flex flex-col gap-1">
          {NAV_MAIN.map((item) => {
            const Icon = item.icon;
            const isRouteActive = pathname === item.href;
            const hasSubmenu = Boolean(item.subItems && item.subItems.length > 0);
            const isSubmenuOpen = Boolean(openSubmenus[item.id]);

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredNavId(item.id)}
                onMouseLeave={() => setHoveredNavId(null)}
              >
                {isCollapsed ? (
                  /* Modo Colapsado: Ícone centralizado com Flyout / Tooltip */
                  <div className="flex justify-center relative">
                    <Link
                      href={item.href}
                      className={`w-12 h-11 rounded-2xl flex items-center justify-center transition-all ${
                        isRouteActive
                          ? "bg-[#822801] text-white shadow-xs"
                          : "text-[#57423b] hover:bg-[#eae8e3] hover:text-[#1b1c1a]"
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </Link>

                    {/* Flyout Hover Menu no Modo Colapsado */}
                    {hoveredNavId === item.id && (
                      <div className="absolute left-full ml-3 top-0 bg-[#1b1c19] text-white rounded-2xl p-3 shadow-2xl min-w-[200px] z-50 animate-in fade-in duration-100 border border-white/10">
                        <div className="font-bold text-xs pb-1 mb-1 border-b border-white/10 flex items-center justify-between">
                          <span>{item.label}</span>
                        </div>
                        {hasSubmenu && item.subItems ? (
                          <div className="flex flex-col gap-1 pt-1">
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className="text-xs text-white/80 hover:text-white py-1 px-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb59c]" />
                                <span>{sub.label}</span>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-white/60">
                            Acessar página principal
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Modo Expandido: Item Completo com Dropdown Accordion */
                  <div>
                    <div
                      className={`flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all text-[13px] font-semibold cursor-pointer ${
                        isRouteActive
                          ? "bg-[#822801] text-white shadow-xs"
                          : "text-[#57423b] hover:bg-[#eae8e3] hover:text-[#1b1c1a]"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        <Icon className="w-5 h-5 shrink-0" strokeWidth={1.8} />
                        <span className="truncate">{item.label}</span>
                      </Link>

                      {hasSubmenu && (
                        <button
                          type="button"
                          onClick={(e) => toggleSubmenu(item.id, e)}
                          className={`p-1 rounded-lg transition-colors ${
                            isRouteActive
                              ? "hover:bg-white/20 text-white"
                              : "hover:bg-black/5 text-[#8a726a]"
                          }`}
                          title="Alternar submenu"
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isSubmenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu Accordion Expandido */}
                    {hasSubmenu && isSubmenuOpen && item.subItems && (
                      <div className="pl-9 pr-2 py-1.5 flex flex-col gap-1 border-l-2 border-[#e3e2df] ml-5 my-1 animate-in fade-in duration-200">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className={`text-xs py-1.5 px-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
                                isSubActive
                                  ? "text-[#9f3c16] font-bold bg-[#ffdbcf]/60"
                                  : "text-[#57423b] hover:text-[#1b1c1a] hover:bg-[#f0eee9]"
                              }`}
                            >
                              <span className="truncate">{sub.label}</span>
                              <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Divisor Apoio */}
          <div className="pt-3 pb-1 px-2">
            {isCollapsed ? (
              <div className="w-full h-px bg-[#e3e2df]" />
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#57423b]/70">
                APOIO
              </span>
            )}
          </div>

          {/* Itens de Apoio */}
          {NAV_APOIO.map((item) => {
            const Icon = item.icon;
            const isRouteActive = pathname === item.href;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredNavId(item.id)}
                onMouseLeave={() => setHoveredNavId(null)}
              >
                {isCollapsed ? (
                  <div className="flex justify-center relative">
                    <Link
                      href={item.href}
                      className={`w-12 h-11 rounded-2xl flex items-center justify-center transition-all relative ${
                        isRouteActive
                          ? "bg-[#822801] text-white shadow-xs"
                          : "text-[#57423b] hover:bg-[#eae8e3] hover:text-[#1b1c1a]"
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                      {item.badge && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#855000] absolute top-2 right-2 border-2 border-white" />
                      )}
                    </Link>

                    {/* Tooltip no Hover */}
                    {hoveredNavId === item.id && (
                      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#1b1c19] text-white text-xs font-semibold rounded-xl px-3 py-1.5 whitespace-nowrap shadow-xl z-50 flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#ffdcbb] text-[#855000] text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all text-[13px] font-semibold ${
                      isRouteActive
                        ? "bg-[#822801] text-white shadow-xs"
                        : "text-[#57423b] hover:bg-[#eae8e3] hover:text-[#1b1c1a]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 shrink-0" strokeWidth={1.8} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ffdcbb] text-[#855000] font-bold text-[11px]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Perfil do Usuário no Rodapé */}
      <div className="p-3 border-t border-[#e3e2df]/50 bg-[#f0eee9]/40">
        {isCollapsed ? (
          <div className="flex justify-center group relative">
            <div
              className="w-10 h-10 rounded-full bg-[#1b1c19] text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer hover:scale-105 transition-transform"
              title="Roberto (Dono da Loja)"
            >
              N
            </div>

            {/* Tooltip do Usuário */}
            <div className="absolute left-full ml-3 bottom-1 bg-[#1b1c19] text-white rounded-xl p-2.5 whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 text-xs">
              <p className="font-bold">Roberto</p>
              <p className="text-[11px] text-white/70">Dono da Loja</p>
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-2xl bg-white border border-[#e3e2df]/60 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#1b1c19] text-white flex items-center justify-center font-bold text-xs shrink-0">
                N
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-[#1b1c1a] truncate">
                  Roberto
                </p>
                <p className="text-[11px] text-[#57423b] truncate">
                  Dono da Loja
                </p>
              </div>
            </div>
            <button
              type="button"
              className="w-7 h-7 rounded-xl hover:bg-[#f5f4f0] flex items-center justify-center text-[#57423b] hover:text-[#1b1c1a] transition-colors"
              title="Configurações"
            >
              <Settings className="w-4 h-4" strokeWidth={1.8} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
