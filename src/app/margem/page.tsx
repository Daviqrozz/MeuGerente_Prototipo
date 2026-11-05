"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CANAIS_EXEMPLO,
  FICHAS_EXEMPLO,
  INSUMOS_EXEMPLO,
} from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularMargemContribuicao,
  calcularMargemPercentual,
} from "@/lib/calculos";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Store,
  Bike,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Sliders,
  X,
} from "lucide-react";

export default function MargemPage() {
  const [modalDetalhesPrato, setModalDetalhesPrato] = useState<string | null>(null);

  // Canal configurations
  const canalSalao = CANAIS_EXEMPLO.find((c) => c.id === "canal-salao")!;
  const canalDelivery = CANAIS_EXEMPLO.find((c) => c.id === "canal-delivery-proprio")!;
  const canalIfood = CANAIS_EXEMPLO.find((c) => c.id === "canal-ifood")!;

  // 3 pratos comparados
  const pratos = [
    {
      ficha: FICHAS_EXEMPLO[3], // Bacon Smash Duplo
      nomeExibicao: "Smash Bacon Duplo",
      statusBadge: "Saudável",
      statusTipo: "saudavel",
      precoVenda: 32.0,
      descricao:
        "Carro-chefe da casa. Cobre bem custos em todos os canais, com pico de retenção no balcão físico.",
    },
    {
      ficha: FICHAS_EXEMPLO[1], // Burger Salada Especial
      nomeExibicao: "Burger Salada Especial",
      statusBadge: "Atenção Crítica",
      statusTipo: "critico",
      precoVenda: 28.0, // Preço igual ao do salão gerando margem muito comprimida no iFood
      descricao:
        "No iFood sobra quase zero pelo alto custo do hortifruti e taxas. Sugestão imediata: reajustar no app.",
    },
    {
      ficha: FICHAS_EXEMPLO[2], // Chicken Crispy Burger
      nomeExibicao: "Chicken Crispy Burger",
      statusBadge: "Margem Baixa no App",
      statusTipo: "moderado",
      precoVenda: 30.0,
      descricao:
        "O frango encolhe na cocção e tem custo mais elevado. No marketplace a sobra atual é insuficiente.",
    },
  ];

  return (
    <main className="w-full bg-[#faf9f5] px-6 sm:px-8 py-8 min-h-screen text-[#1b1c1a]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-16">
        {/* Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b1c1a]">
              Margem por canal de venda
            </h1>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-[#57423b]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#a5f4bf]/50 text-[#1b6b42] font-semibold text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b6b42]" />
                Onde você ganha de verdade
              </span>
              <span>•</span>
              <span>Entenda quanto sobra líquido após taxas</span>
            </div>
          </div>

          <div>
            <Link
              href="/calculadora"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9f3c16] text-white text-xs font-semibold hover:bg-[#bf542c] transition-all shadow-sm"
            >
              <Sliders className="w-4 h-4" />
              <span>Ajustar preços</span>
            </Link>
          </div>
        </section>

        {/* Friendly Rule Banner */}
        <div className="p-6 rounded-3xl bg-white border border-[#e3e2df]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#9f3c16]" />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base text-[#1b1c1a]">
                Lembre-se: o que sobra de cada venda paga seu aluguel, equipe e energia.
              </p>
              <p className="text-xs text-[#57423b] mt-0.5">
                Margem de contribuição não é sobra livre no bolso: quanto maior a retenção em cada prato, mais tranquilo é o fim do mês.
              </p>
            </div>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#a5f4bf]/50 text-[#1b6b42] font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" /> Meta ideal: &gt; 50%
          </span>
        </div>

        {/* 3 Big Cards: Salão & Balcão, Delivery Próprio, iFood & Apps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Salão & Balcão */}
          <div className="p-7 rounded-3xl bg-white border border-[#e3e2df]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#57423b]">
                  Salão &amp; Balcão
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#a5f4bf]/50 text-[#1b6b42] font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b6b42]" />
                  Mais rentável
                </span>
              </div>
              <div className="text-3xl sm:text-[34px] font-bold text-[#1b1c1a] tracking-tight mt-1 mb-2">
                Sobra 63%
                <span className="text-sm font-normal text-[#57423b] block mt-0.5">
                  do preço de venda
                </span>
              </div>
              <p className="text-xs text-[#57423b] leading-relaxed">
                Apenas taxa média de cartão (débito/crédito) em ~2,5%. Em média R$ 20 a 22 limpos por lanche.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-[#1b6b42] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#1b6b42]" /> Canal mais saudável
              </span>
              <span className="text-[#57423b]">Maior margem</span>
            </div>
          </div>

          {/* Card 2: Delivery Próprio */}
          <div className="p-7 rounded-3xl bg-white border border-[#e3e2df]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#57423b]">
                  Delivery Próprio
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdcbb]/60 text-[#855000] font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
                  Sob controle
                </span>
              </div>
              <div className="text-3xl sm:text-[34px] font-bold text-[#1b1c1a] tracking-tight mt-1 mb-2">
                Sobra 58%
                <span className="text-sm font-normal text-[#57423b] block mt-0.5">
                  do preço de venda
                </span>
              </div>
              <p className="text-xs text-[#57423b] leading-relaxed">
                Taxa de gateway online em 3,5%. O cliente é seu e você não depende de intermediários.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs">
              <span className="text-[#57423b]">Fideliza clientes</span>
              <span className="font-bold text-[#1b1c1a]">Sem intermediários</span>
            </div>
          </div>

          {/* Card 3: iFood & Apps */}
          <div className="p-7 rounded-3xl bg-white border border-[#ffdad6] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#ba1a1a]">
                  iFood &amp; Apps
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                  Alerta
                </span>
              </div>
              <div className="text-3xl sm:text-[34px] font-bold text-[#ba1a1a] tracking-tight mt-1 mb-2">
                Sobra 28%
                <span className="text-sm font-semibold text-[#ba1a1a]/80 block mt-0.5">
                  apenas
                </span>
              </div>
              <p className="text-xs text-[#57423b] leading-relaxed">
                Comissões e taxas somam 23% a 27% + taxas fixas. Se o preço for igual ao do salão, o lucro evapora.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ffdad6]/60 flex items-center justify-between text-xs">
              <span className="font-bold text-[#ba1a1a]">Exige reajuste de preço</span>
              <Link
                href="/calculadora"
                className="font-semibold text-[#9f3c16] hover:underline"
              >
                Ver soluções →
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Dishes Section (Rounded Clean Cards) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1b1c1a]">
              Comparativo dos 3 pratos principais
            </h2>
            <span className="text-xs text-[#57423b]">
              Sobra líquida em cada canal
            </span>
          </div>

          {pratos.map((item, idx) => {
            const custo = calcularCustoPrato(item.ficha, INSUMOS_EXEMPLO);
            const margemSalao = calcularMargemContribuicao(
              item.precoVenda,
              custo,
              canalSalao
            );
            const pctSalao = calcularMargemPercentual(margemSalao, item.precoVenda);

            const margemIfood = calcularMargemContribuicao(
              item.precoVenda,
              custo,
              canalIfood
            );
            const pctIfood = calcularMargemPercentual(margemIfood, item.precoVenda);
            const diferenca = margemSalao - margemIfood;

            const STATUS_CORES = {
              saudavel: {
                badge: "bg-[#a5f4bf]/50 text-[#1b6b42]",
                border: "border-[#e3e2df]/60",
                ifoodBox: "bg-[#f5f4f0]/70",
                ifoodText: "text-[#1b1c1a]",
              },
              critico: {
                badge: "bg-[#ffdad6] text-[#ba1a1a]",
                border: "border-[#ffdad6]",
                ifoodBox: "bg-[#ffdad6]/40 border border-[#ffdad6]",
                ifoodText: "text-[#ba1a1a]",
              },
              moderado: {
                badge: "bg-[#ffdcbb]/60 text-[#855000]",
                border: "border-[#e3e2df]/60",
                ifoodBox: "bg-[#f5f4f0]/70",
                ifoodText: "text-[#855000]",
              },
            } as const;

            const cores = STATUS_CORES[item.statusTipo as keyof typeof STATUS_CORES] ?? STATUS_CORES.moderado;

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-white border ${cores.border} shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f4f0] flex items-center justify-center font-bold text-base text-[#9f3c16] shrink-0 text-2xl">
                    🍔
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-[#1b1c1a]">
                        {item.nomeExibicao}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cores.badge}`}
                      >
                        {item.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-[#57423b] max-w-xl">
                      {item.descricao}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {/* Bloco Salão */}
                  <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 min-w-[150px]">
                    <p className="text-[11px] font-medium text-[#57423b] flex items-center gap-1">
                      <Store className="w-3.5 h-3.5 text-[#1b6b42]" />
                      No Salão sobra
                    </p>
                    <p className="text-lg font-bold text-[#1b6b42] mt-0.5">
                      R$ {margemSalao.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-[#57423b]">
                      {pctSalao.toFixed(1)}% do preço
                    </p>
                  </div>

                  {/* Bloco iFood */}
                  <div className={`p-3.5 rounded-2xl min-w-[150px] ${cores.ifoodBox}`}>
                    <p className="text-[11px] font-medium text-[#57423b] flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#855000]" />
                      No iFood sobra
                    </p>
                    <p className={`text-lg font-bold mt-0.5 ${cores.ifoodText}`}>
                      R$ {margemIfood.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-[#57423b]">
                      - R$ {diferenca.toFixed(2)} por item
                    </p>
                  </div>

                  {item.statusTipo === "critico" ? (
                    <Link
                      href="/calculadora"
                      className="px-4 py-2.5 rounded-full bg-[#9f3c16] text-white hover:bg-[#bf542c] text-xs font-semibold shadow-xs transition-colors"
                    >
                      Ajustar no App
                    </Link>
                  ) : (
                    <button
                      onClick={() => setModalDetalhesPrato(item.ficha.nomePrato)}
                      className="px-4 py-2.5 rounded-full bg-white text-[#1b1c1a] border border-[#e3e2df] hover:bg-[#f5f4f0] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Detalhes
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* Modal de Detalhes do Prato */}
        {modalDetalhesPrato && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-[#f5f4f0] pb-3">
                <h3 className="font-bold text-base text-[#1b1c1a]">
                  {modalDetalhesPrato}
                </h3>
                <button
                  onClick={() => setModalDetalhesPrato(null)}
                  className="w-8 h-8 rounded-full bg-[#f5f4f0] text-[#57423b] flex items-center justify-center hover:text-[#1b1c1a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#57423b] leading-relaxed">
                Os custos dos ingredientes são atualizados automaticamente com os preços cadastrados em Insumos. A diferença de sobra entre os canais se deve às comissões cobradas pelos marketplaces.
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setModalDetalhesPrato(null)}
                  className="px-5 py-2.5 rounded-full bg-[#9f3c16] text-white text-xs font-semibold hover:bg-[#bf542c]"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
