"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  ArrowUpRight,
  UtensilsCrossed,
} from "lucide-react";

export default function HomePage() {
  const [horaSelecionada, setHoraSelecionada] = useState<{
    hora: string;
    valor: string;
  }>({
    hora: "13h",
    valor: "R$ 318,00",
  });

  const [tarefaConcluidaId, setTarefaConcluidaId] = useState<string | null>(null);

  const dadosHorarios = [
    { hora: "11h", valor: "R$ 142,00", h1: 42, h2: 50 },
    { hora: "12h", valor: "R$ 265,00", h1: 64, h2: 74 },
    { hora: "13h", valor: "R$ 318,00", h1: 88, h2: 100, destaque: true },
    { hora: "14h", valor: "R$ 115,00", h1: 36, h2: 30 },
    { hora: "18h", valor: "R$ 210,00", h1: 56, h2: 66 },
    { hora: "19h", valor: "R$ 280,00", h1: 72, h2: 80 },
  ];

  return (
    <main className="w-full bg-[#faf9f5] px-6 sm:px-8 py-8 min-h-screen text-[#1b1c1a]">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-16">
        
        {/* Cabeçalho de Boas-Vindas */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-3xl sm:text-[32px] font-bold text-[#1b1c1a] tracking-tight flex items-center gap-2">
              Boa noite , Roberto <span className="text-2xl">👋</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs text-[#8a726a]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2f7e0] text-[#1b6b42] font-semibold text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b6b42]" />
                Loja aberta
              </span>
              <span>•</span>
              <span className="font-medium">
                Burger Craft Demo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0eee9] text-[#57423b] text-xs font-semibold border border-[#e3e2df]/60 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
              Demonstração
            </span>
          </div>
        </header>

        {/* 3 Cards de Métricas Principais (Topo) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Card 1: FATURAMENTO HOJE */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a726a]">
                  FATURAMENTO HOJE
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e2f7e0] text-[#1b6b42] text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b6b42]" />
                  Estimativa
                </span>
              </div>
              <div className="text-[36px] font-black text-[#1b1c1a] tracking-tight">
                R$ 1.4k
              </div>
              <p className="text-xs text-[#57423b] mt-1">
                42 lanches • ticket médio <strong className="font-black text-[#1b1c1a]">R$ 34</strong>
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs">
              <span className="text-[#57423b] font-medium">
                Meta do dia: <strong className="font-black text-[#1b1c1a]">R$ 2.000</strong>
              </span>
              <span className="font-bold text-[#1b6b42] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                72% atingido
              </span>
            </div>
          </div>

          {/* Card 2: SOBRA ESTIMADA */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a726a]">
                  SOBRA ESTIMADA
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdcbb]/70 text-[#855000] text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
                  Estimativa
                </span>
              </div>
              <div className="text-[36px] font-black text-[#1b1c1a] tracking-tight">
                R$ 854
              </div>
              <p className="text-xs text-[#57423b] mt-1">
                Já descontados insumos e taxas de canal
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs">
              <span className="text-[#57423b] font-medium">Margem de contribuição</span>
              <span className="font-bold text-[#1b1c1a]">~60% da venda</span>
            </div>
          </div>

          {/* Card 3: Fluxo de Caixa (Donut Chart com tamanho ampliado e legenda justa) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-bold text-[#1b1c1a]">
                  Fluxo de Caixa
                </span>
                <Link
                  href="/margem"
                  className="w-7 h-7 rounded-full bg-[#f5f4f0] hover:bg-[#e4e2dd] flex items-center justify-center text-[#8a726a] hover:text-[#1b1c1a] transition-colors"
                  title="Ver detalhes de margem"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Donut Chart SVG - Proporção aumentada para acomodar o número perfeitamente */}
              <div className="relative flex items-center justify-center my-1.5">
                <svg className="w-44 h-44 sm:w-48 sm:h-48 transform -rotate-90" viewBox="0 0 200 200">
                  {/* Background Track */}
                  <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="transparent"
                    stroke="#f5f4f0"
                    strokeWidth="18"
                  />
                  {/* Segment 1: Salão (50% = golden yellow #d99b00) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="transparent"
                    stroke="#d99b00"
                    strokeWidth="18"
                    strokeDasharray="245.04 490.09"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Delivery Próprio (~28% = light cream #e4e2dd) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="transparent"
                    stroke="#e4e2dd"
                    strokeWidth="18"
                    strokeDasharray="137.22 490.09"
                    strokeDashoffset="-245.04"
                  />
                  {/* Segment 3: iFood (~22% = dark charcoal #30312e) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="transparent"
                    stroke="#30312e"
                    strokeWidth="18"
                    strokeDasharray="107.82 490.09"
                    strokeDashoffset="-382.26"
                  />
                </svg>

                {/* Donut Center Hole Content com largura e respiro adequados */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
                  <span className="text-xs font-semibold text-[#8a726a] leading-none mb-1">
                    Salão
                  </span>
                  <span className="text-[18px] sm:text-[19px] font-black text-[#1b1c1a] tracking-tight leading-tight">
                    R$ 1.423,25
                  </span>
                  <span className="text-[11px] font-semibold text-[#8a726a] leading-none mt-1">
                    50% das vendas
                  </span>
                </div>
              </div>

              {/* Chart Legend - Espaçamento otimizado e compacto */}
              <div className="flex items-center justify-center gap-3 text-xs mt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d99b00]" />
                  <span className="text-[11px] font-medium text-[#57423b]">Salão</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#e4e2dd]" />
                  <span className="text-[11px] font-medium text-[#57423b]">Delivery próprio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#30312e]" />
                  <span className="text-[11px] font-medium text-[#57423b]">iFood</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#f5f4f0] text-center">
              <span className="text-[10px] text-[#8a726a] leading-tight block">
                Origem: distribuição simulada de <strong className="font-black text-[#1b1c1a]">R$ 2.846,50</strong> • Confiança: Ilustrativa
              </span>
            </div>
          </div>
        </section>

        {/* Linha Inferior: O que fazer agora + Movimento do dia */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Coluna Esquerda: O que fazer agora (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header do Card */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#1b1c1a]">
                    O que fazer agora
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#f0eee9] text-[#57423b] text-xs font-bold">
                    3
                  </span>
                </div>
                <Link
                  href="/tarefas"
                  className="text-xs font-semibold text-[#57423b] hover:text-[#1b1c1a] flex items-center gap-1 transition-colors"
                >
                  <span>Todas as tarefas</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-xs text-[#8a726a] mb-5">
                Uma coisa de cada vez. Você tem o controle.
              </p>

              {/* Lista de Tarefas */}
              <div className="space-y-3.5">
                
                {/* Tarefa 1 */}
                <div
                  className={`rounded-2xl p-4 bg-[#faf9f5] border border-[#e3e2df]/50 transition-all ${
                    tarefaConcluidaId === "t1" ? "opacity-60 bg-[#e2f7e0]/30" : "hover:border-[#dec0b7]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#e3e2df]/60 flex items-center justify-center text-[#9f3c16] shadow-2xs">
                        <Package className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1b1c1a]">
                        Comprar frango antes do jantar
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                      Prioridade alta
                    </span>
                  </div>

                  <p className="text-xs text-[#57423b] ml-10 mb-1">
                    Restam 2 kg; o mínimo definido é 5 kg.
                  </p>
                  <p className="text-[10px] text-[#8a726a] ml-10 mb-3">
                    Estoque de demonstração • Peito de frango • 05 nov. 2026 • Confiança: Ilustrativa
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e3e2df]/40 ml-10">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#e4e2dd] text-[#1b1c1a] flex items-center justify-center text-[10px] font-bold">
                        A
                      </div>
                      <span className="text-xs text-[#57423b] font-medium">Ana</span>
                    </div>
                    <Link
                      href="/insumos"
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f5f4f0] text-xs font-semibold text-[#1b1c1a] border border-[#e3e2df] shadow-2xs flex items-center gap-1 transition-colors"
                    >
                      <span>Resolver</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Tarefa 2 */}
                <div
                  className={`rounded-2xl p-4 bg-[#faf9f5] border border-[#e3e2df]/50 transition-all ${
                    tarefaConcluidaId === "t2" ? "opacity-60 bg-[#e2f7e0]/30" : "hover:border-[#dec0b7]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#e3e2df]/60 flex items-center justify-center text-[#855000] shadow-2xs">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1b1c1a]">
                        Revisar preço do frango no iFood
                      </h3>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e4e2dd] text-[#57423b] text-[11px] font-semibold shrink-0">
                      Revisar hoje
                    </span>
                  </div>

                  <p className="text-xs text-[#57423b] ml-10 mb-1">
                    O preço de compra passou de <strong className="font-black text-[#1b1c1a]">R$ 19,90</strong> para <strong className="font-black text-[#9f3c16]">R$ 21,90</strong>/kg.
                  </p>
                  <p className="text-[10px] text-[#8a726a] ml-10 mb-3">
                    Preços de demonstração • Ficha técnica • 05 nov. 2026 • Confiança: Ilustrativa
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e3e2df]/40 ml-10">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#e4e2dd] text-[#1b1c1a] flex items-center justify-center text-[10px] font-bold">
                        J
                      </div>
                      <span className="text-xs text-[#57423b] font-medium">João</span>
                    </div>
                    <Link
                      href="/calculadora"
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f5f4f0] text-xs font-semibold text-[#1b1c1a] border border-[#e3e2df] shadow-2xs flex items-center gap-1 transition-colors"
                    >
                      <span>Resolver</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Tarefa 3 */}
                <div className="rounded-2xl p-3.5 bg-[#faf9f5] border border-[#e3e2df]/50 flex items-center justify-between hover:border-[#dec0b7] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#e3e2df]/60 flex items-center justify-center text-[#1b6b42] shadow-2xs">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1b1c1a]">
                      Confirmar rendimento da carne
                    </h3>
                  </div>
                  <Link
                    href="/fichas"
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f5f4f0] text-xs font-semibold text-[#57423b] hover:text-[#1b1c1a] border border-[#e3e2df] shadow-2xs transition-colors"
                  >
                    Conferir ficha
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* Coluna Direita: Movimento do dia (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-[#1b1c1a]">
                  Movimento do dia
                </h2>
                <span className="px-3 py-1 rounded-full bg-[#f0eee9] text-[#57423b] text-xs font-semibold">
                  Vendas por horário
                </span>
              </div>

              {/* Big Stats */}
              <div className="text-[34px] font-black text-[#1b1c1a] tracking-tight mt-1">
                R$ 2.846,50
              </div>
              <p className="text-xs text-[#8a726a] mt-0.5 mb-6">
                47 vendas no cenário de demonstração
              </p>

              {/* Vertical Histogram Bars */}
              <div className="pt-2 pb-4">
                <div className="h-44 flex items-end justify-between gap-2 px-2 border-b border-[#f5f4f0] pb-2">
                  {dadosHorarios.map((d) => {
                    const isSelected = horaSelecionada.hora === d.hora;
                    return (
                      <button
                        key={d.hora}
                        type="button"
                        onClick={() => setHoraSelecionada({ hora: d.hora, valor: d.valor })}
                        className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
                        title={`${d.hora}: ${d.valor}`}
                      >
                        <div className="flex items-end gap-1 w-full justify-center h-36">
                          {/* Barra 1 */}
                          <div
                            style={{ height: `${d.h1}%` }}
                            className={`w-2.5 rounded-full transition-all duration-300 ${
                              d.destaque || isSelected
                                ? "bg-[#d99b00] group-hover:bg-[#b88200]"
                                : "bg-[#e4e2dd] group-hover:bg-[#d0cec8]"
                            }`}
                          />
                          {/* Barra 2 */}
                          <div
                            style={{ height: `${d.h2}%` }}
                            className={`w-2.5 rounded-full transition-all duration-300 ${
                              d.destaque || isSelected
                                ? "bg-[#d99b00] group-hover:bg-[#b88200]"
                                : "bg-[#e4e2dd] group-hover:bg-[#d0cec8]"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-xs mt-2 transition-colors ${
                            d.destaque || isSelected
                              ? "font-bold text-[#1b1c1a]"
                              : "text-[#8a726a]"
                          }`}
                        >
                          {d.hora}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Subtitle / Selected Hour Indicator */}
                <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#1b1c1a]">
                  <span className="w-2 h-2 rounded-full bg-[#d99b00]" />
                  <span>
                    {horaSelecionada.hora} • <strong className="font-black text-[#1b1c1a]">{horaSelecionada.valor}</strong> em vendas simuladas
                  </span>
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}
