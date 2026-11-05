"use client";

import { useState } from "react";
import { FICHAS_EXEMPLO, INSUMOS_EXEMPLO } from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularCustoIngrediente,
  calcularMargemContribuicao,
  calcularMargemPercentual,
} from "@/lib/calculos";
import {
  UtensilsCrossed,
  Plus,
  Edit3,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Minus,
  Flame,
  Store,
  Package,
} from "lucide-react";

const INSUMOS_MAP = Object.fromEntries(INSUMOS_EXEMPLO.map((i) => [i.id, i]));

// Configuração visual de cada lanche para a demonstração minimalista
const BURGER_VISUAL_CONFIG: Record<
  string,
  {
    precoBalcao: number;
    pedidosOntem: number;
    tempoChapa: string;
    pesoFinal: string;
    tagDestaque?: string;
    imgSrc: string;
    dicaEconomia: string;
    economiaMensal: number;
  }
> = {
  "ficha-04": {
    precoBalcao: 25.0,
    pedidosOntem: 48,
    tempoChapa: "3 min 40s",
    pesoFinal: "~ 285g",
    tagDestaque: "Mais vendido",
    imgSrc:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    dicaEconomia:
      "Se você negociar R$ 0,20 a menos no pão brioche com a padaria, você economiza R$ 400 no final do mês (baseado em 2.000 lanches).",
    economiaMensal: 400,
  },
  "ficha-01": {
    precoBalcao: 22.0,
    pedidosOntem: 36,
    tempoChapa: "4 min 10s",
    pesoFinal: "~ 260g",
    tagDestaque: "Clássico da casa",
    imgSrc:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    dicaEconomia:
      "Padronizar o corte do cheddar para exatamente 2 fatias de 20g evita o desperdício de R$ 280 por mês na chapa.",
    economiaMensal: 280,
  },
  "ficha-02": {
    precoBalcao: 26.0,
    pedidosOntem: 29,
    tempoChapa: "4 min 30s",
    pesoFinal: "~ 310g",
    tagDestaque: "Salada fresca",
    imgSrc:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    dicaEconomia:
      "Ajustar a higienização da alface americana para reduzir a perda (FC de 1,25 para 1,15) economiza R$ 190 mensais.",
    economiaMensal: 190,
  },
  "ficha-03": {
    precoBalcao: 24.0,
    pedidosOntem: 22,
    tempoChapa: "6 min (fritadeira)",
    pesoFinal: "~ 275g",
    tagDestaque: "Frango crocante",
    imgSrc:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
    dicaEconomia:
      "O frango encolhe 25% na fritura (IC 0,75). Comprar em lote semanal direto da avícola barateia em R$ 320 mensais.",
    economiaMensal: 320,
  },
};

export default function FichasPage() {
  const [fichaSelecionadaId, setFichaSelecionadaId] = useState<string>("ficha-04");
  const [simulandoEconomia, setSimulandoEconomia] = useState(false);

  const ficha =
    FICHAS_EXEMPLO.find((f) => f.id === fichaSelecionadaId) ?? FICHAS_EXEMPLO[0];
  const config = BURGER_VISUAL_CONFIG[ficha.id] ?? BURGER_VISUAL_CONFIG["ficha-04"];

  const custoPrato = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
  const precoBalcao = config.precoBalcao;
  const sobraBalcao = Math.max(0, precoBalcao - custoPrato);
  const margemPct = calcularMargemPercentual(sobraBalcao, precoBalcao);
  const custoPct = Math.min(100, (custoPrato / precoBalcao) * 100);

  return (
    <main className="w-full bg-[#faf9f5] px-6 sm:px-8 py-8 min-h-screen text-[#1b1c1a]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-16">
        {/* Top Greeting & Contextual Header */}
        <section className="pt-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdbcf] text-[#9f3c16] text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9f3c16] animate-pulse" />
                <span>Fichas Técnicas Descomplicadas</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b1c1a]">
                Quanto custa fazer cada lanche
              </h1>
              <p className="text-base text-[#57423b] mt-2">
                Saiba exatamente quanto sai cada ingrediente no prato sem contas difíceis nem tabelas chatas.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <button
                onClick={() => alert("Criador de ficha em modo demonstração")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#1b1c1a] border border-[#e3e2df] shadow-xs hover:bg-[#f5f4f0] transition-all text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#9f3c16]" />
                <span>Novo prato</span>
              </button>
              <button
                onClick={() => alert("Edição de receita em modo demonstração")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9f3c16] text-white shadow-sm hover:bg-[#bf542c] transition-all text-xs font-semibold cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar receita do lanche</span>
              </button>
            </div>
          </div>

          {/* Friendly Pill Tab Selector */}
          <div className="flex items-center gap-2.5 overflow-x-auto pt-6 pb-2 no-scrollbar">
            {FICHAS_EXEMPLO.map((item) => {
              const isAtivo = item.id === ficha.id;
              const custoItem = calcularCustoPrato(item, INSUMOS_EXEMPLO);
              const cfg = BURGER_VISUAL_CONFIG[item.id];

              return (
                <button
                  key={item.id}
                  onClick={() => setFichaSelecionadaId(item.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all text-left shrink-0 cursor-pointer ${
                    isAtivo
                      ? "bg-[#9f3c16] text-white shadow-sm"
                      : "bg-white text-[#1b1c1a] border border-[#e3e2df]/60 hover:bg-[#f5f4f0]"
                  }`}
                >
                  <span className="text-sm">{item.nomePrato}</span>
                  {cfg?.tagDestaque ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isAtivo
                          ? "bg-white/20 text-white"
                          : "bg-[#ffdbcf] text-[#9f3c16]"
                      }`}
                    >
                      {cfg.tagDestaque}
                    </span>
                  ) : (
                    <span
                      className={`text-[11px] ${
                        isAtivo ? "text-white/80" : "text-[#57423b]"
                      }`}
                    >
                      R$ {custoItem.toFixed(2)} custo
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Highlight Card & Visual Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Big Highlight Card (Left: 8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#e3e2df]/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1b6b42]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b6b42]">
                    Margem Saudável • {margemPct.toFixed(0)}%
                  </span>
                </div>
                <span className="text-xs text-[#57423b]">
                  Calculado com custos de hoje
                </span>
              </div>

              <p className="text-sm text-[#57423b] font-normal">
                Custo total de preparo
              </p>
              <div className="flex flex-wrap items-baseline gap-3 mt-1">
                <span className="text-4xl lg:text-[46px] font-extrabold text-[#1b1c1a] tracking-tight">
                  R$ {custoPrato.toFixed(2)}
                </span>
                <span className="text-lg text-[#57423b] font-normal">
                  para montar este lanche
                </span>
              </div>
            </div>

            {/* Pocket Visual Comparison Grid */}
            <div className="relative z-10 mt-8 pt-6 bg-[#f5f4f0]/70 rounded-2xl p-6 border border-[#e3e2df]/40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-[#57423b] mb-1">
                    Preço no balcão
                  </span>
                  <span className="text-2xl font-bold text-[#1b1c1a]">
                    R$ {precoBalcao.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#57423b] mt-0.5">
                    Preço que o cliente paga
                  </span>
                </div>

                <div className="flex items-center justify-start">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#57423b] shadow-xs">
                    <Minus className="w-4 h-4" />
                  </div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-xs text-[#57423b]">
                      Ingredientes gastos
                    </span>
                    <span className="text-lg font-bold text-[#9f3c16]">
                      R$ {custoPrato.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col p-4 rounded-xl bg-[#a5f4bf]/30 border border-[#a5f4bf]/60">
                  <span className="text-xs text-[#1b6b42] font-bold uppercase tracking-wider">
                    Sobra limpa no bolso
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-extrabold text-[#1b6b42]">
                      R$ {sobraBalcao.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-[#1b6b42]">
                      ({margemPct.toFixed(0)}%)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#1b6b42]/90 mt-0.5">
                    Margem bruta por cada unidade
                  </span>
                </div>
              </div>

              {/* Visual Proportion Bar */}
              <div className="mt-6">
                <div className="w-full h-3 rounded-full bg-[#efeeea] overflow-hidden flex">
                  <div
                    className="bg-[#9f3c16] h-full rounded-l-full transition-all duration-500"
                    style={{ width: `${custoPct}%` }}
                  />
                  <div
                    className="bg-[#1b6b42] h-full rounded-r-full transition-all duration-500"
                    style={{ width: `${100 - custoPct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-xs font-medium text-[#57423b]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#9f3c16] inline-block" />
                    {custoPct.toFixed(1)}% Custo dos insumos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1b6b42] inline-block" />
                    {(100 - custoPct).toFixed(1)}% Margem do seu negócio
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Burger Spotlight Image & Quick Facts (Right: 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#e3e2df]/60 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-44 h-44 rounded-full overflow-hidden mb-4 shadow-inner bg-[#f5f4f0] border-4 border-[#faf9f5]">
                <img
                  src={config.imgSrc}
                  alt={ficha.nomePrato}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffdcbb]/60 text-[#855000] text-xs font-semibold mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>{config.pedidosOntem} pedidos ontem</span>
              </span>

              <h3 className="text-xl font-bold text-[#1b1c1a] mt-1">
                {ficha.nomePrato}
              </h3>
              <p className="text-xs text-[#57423b] mt-1 max-w-xs leading-relaxed">
                {ficha.modoPreparo.slice(0, 85)}…
              </p>

              <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-5 bg-[#f5f4f0] rounded-2xl p-4 border border-[#e3e2df]/40">
                <div className="flex flex-col text-left">
                  <span className="text-[11px] text-[#57423b]">
                    Tempo na chapa
                  </span>
                  <span className="text-sm font-bold text-[#1b1c1a] mt-0.5">
                    {config.tempoChapa}
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] text-[#57423b]">
                    Peso porção final
                  </span>
                  <span className="text-sm font-bold text-[#1b1c1a] mt-0.5">
                    {config.pesoFinal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Breakdown Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1b1c1a]">
                O que entra neste lanche
              </h2>
              <p className="text-xs text-[#57423b] mt-0.5">
                Cada ingrediente individual separado de forma clara
              </p>
            </div>
            <span className="text-xs font-semibold text-[#57423b] bg-white px-3.5 py-1.5 rounded-full border border-[#e3e2df] shadow-xs">
              {ficha.ingredientes.length} itens na composição
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ficha.ingredientes.map((ing, idx) => {
              const insumo = INSUMOS_MAP[ing.insumoId];
              if (!insumo) return null;

              const custo = calcularCustoIngrediente(
                insumo,
                ing.quantidade,
                ing.estadoMedida,
                ing.fc ?? 1,
                ing.ic ?? 1
              );

              // Rótulos explicativos sem jargão
              let tagExplicativa = "";
              if (ing.estadoMedida === "pronto" && ing.ic && ing.ic < 1) {
                tagExplicativa = `Já calculado o encolhimento na cocção (IC ${ing.ic})`;
              } else if (ing.estadoMedida === "limpo" && ing.fc && ing.fc > 1) {
                tagExplicativa = `Já considerada a perda de limpeza (FC ${ing.fc})`;
              } else if (insumo.categoria === "embalagem") {
                tagExplicativa = "Mantém quentinho e crocante no delivery";
              } else if (insumo.categoria === "queijo") {
                tagExplicativa = `Fatias derretidas no vapor`;
              } else if (insumo.categoria === "panificacao") {
                tagExplicativa = `Selado na chapa com manteiga`;
              } else {
                tagExplicativa = `Porção padrão da receita`;
              }

              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e3e2df]/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  <div className="w-13 h-13 rounded-2xl bg-[#ffdbcf]/60 text-[#9f3c16] flex items-center justify-center shrink-0 text-xl">
                    {insumo.categoria === "proteina" ? "🥩" : insumo.categoria === "panificacao" ? "🍞" : insumo.categoria === "queijo" ? "🧀" : insumo.categoria === "hortifruti" ? "🥬" : insumo.categoria === "embalagem" ? "📦" : "🥣"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-[#1b1c1a] truncate">
                        {insumo.nome}
                      </h4>
                      <span className="text-base font-extrabold text-[#1b1c1a] shrink-0">
                        R$ {custo.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[#57423b] mt-0.5">
                      {ing.quantidade}
                      {insumo.unidadeCompra === "un" && ing.estadoMedida === "bruto"
                        ? " unidade"
                        : insumo.unidadeCompra === "L" || insumo.unidadeCompra === "ml"
                        ? "ml"
                        : "g"}{" "}
                      • Fornecedor: {insumo.fornecedor}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f4f0] text-[#57423b] text-[11px] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1b6b42]" />
                      <span>{tagExplicativa}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Golden Manager Tip Box */}
        <section className="bg-[#ffdcbb]/40 rounded-3xl p-6 sm:p-8 border border-[#ffdcbb] relative overflow-hidden shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#855000] flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-7 h-7 text-[#855000]" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-bold text-[#855000]">
                  Dica de ouro do Gerente
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#855000]/15 text-[#855000] text-[10px] font-bold">
                  Impacto real no bolso
                </span>
              </div>
              <p className="text-base font-bold text-[#1b1c1a] leading-snug">
                {config.dicaEconomia}
              </p>
              <p className="text-xs text-[#57423b] mt-1">
                Baseado na sua média mensal de 2.000 lanches vendidos. Pequenos centavos viram aluguel pago no fim do mês.
              </p>
            </div>

            <div className="shrink-0 pt-2 md:pt-0">
              <button
                onClick={() => setSimulandoEconomia(!simulandoEconomia)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#1b1c1a] hover:bg-[#faf9f5] transition-all shadow-xs text-xs font-semibold border border-[#e3e2df] cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-[#855000]" />
                <span>
                  {simulandoEconomia ? "Ocultar simulação" : "Simular economia"}
                </span>
              </button>
            </div>
          </div>

          {/* Card da Simulação expandida */}
          {simulandoEconomia && (
            <div className="mt-6 pt-5 border-t border-[#ffdcbb]/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-300">
              <div className="bg-white/80 p-4 rounded-2xl">
                <span className="text-[#57423b] block">Economia por lanche</span>
                <span className="text-lg font-bold text-[#1b6b42] mt-0.5 block">
                  R$ 0,20 / lanche
                </span>
                <span className="text-[11px] text-[#57423b]">
                  Sem alterar a qualidade final
                </span>
              </div>
              <div className="bg-white/80 p-4 rounded-2xl">
                <span className="text-[#57423b] block">Economia no mês</span>
                <span className="text-lg font-bold text-[#1b6b42] mt-0.5 block">
                  + R$ {config.economiaMensal.toFixed(2)}
                </span>
                <span className="text-[11px] text-[#57423b]">
                  Com 2.000 pedidos mensais
                </span>
              </div>
              <div className="bg-white/80 p-4 rounded-2xl">
                <span className="text-[#57423b] block">No ano (12 meses)</span>
                <span className="text-lg font-bold text-[#1b6b42] mt-0.5 block">
                  + R$ {(config.economiaMensal * 12).toFixed(2)}
                </span>
                <span className="text-[11px] text-[#57423b]">
                  Equivale a mais de 1 aluguel pago
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
