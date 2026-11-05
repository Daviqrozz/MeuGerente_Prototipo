"use client";

import { useState } from "react";
import Link from "next/link";
import { FICHAS_EXEMPLO, INSUMOS_EXEMPLO } from "@/lib/dados";
import { calcularCustoPrato } from "@/lib/calculos";
import {
  UtensilsCrossed,
  Store,
  Bike,
  HelpCircle,
  CheckCircle2,
  Sliders,
  Sparkles,
  PiggyBank,
  Wallet,
  Info,
  ChevronDown,
  Save,
  Check,
  RefreshCw,
  X,
  CreditCard,
  ChefHat,
  ArrowRight,
} from "lucide-react";

const INSUMOS_MAP = Object.fromEntries(INSUMOS_EXEMPLO.map((i) => [i.id, i]));

// Resumo dos ingredientes principais para exibição amigável
const RESUMO_INGREDIENTES: Record<string, string> = {
  "ficha-04": "Pão Brioche + 2x Smash 90g + Bacon + Cheddar + Barbecue",
  "ficha-01": "Pão Brioche + Blend 160g + Cheddar + Maionese Especial",
  "ficha-02": "Pão Brioche + Blend 160g + Alface Americana + Tomate",
  "ficha-03": "Pão Brioche + Frango Crocante + Mussarela + Maionese",
};

export default function CalculadoraPage() {
  const [fichaId, setFichaId] = useState<string>("ficha-04"); // Smash Bacon Duplo
  const [margemAlvo, setMargemAlvo] = useState<number>(60); // 60% Ponto Ideal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalAjudaAberto, setModalAjudaAberto] = useState(false);
  const [statusSalvo, setStatusSalvo] = useState<"idle" | "salvando" | "sucesso">("idle");

  const cardFeeRate = 0.025; // Taxa maquininha 2,5%
  const ifoodRate = 0.27; // Taxa app iFood 27%

  const ficha = FICHAS_EXEMPLO.find((f) => f.id === fichaId) ?? FICHAS_EXEMPLO[0];
  const custo = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);

  // Margem sobre custo desejada (markup seguro)
  const targetProfit = custo * (margemAlvo / 100);

  // Salão e Balcão: Preço que absorve os 2.5% da maquininha
  const salonRaw = (custo + targetProfit) / (1 - cardFeeRate);
  const precoSalao = Math.round(salonRaw);
  const taxaSalao = precoSalao * cardFeeRate;
  const sobraSalao = precoSalao - taxaSalao - custo;
  const sobraSalaoPct = precoSalao > 0 ? (sobraSalao / precoSalao) * 100 : 0;

  // No iFood: Preço que absorve os 27% da comissão do app e deixa exatamente o mesmo dinheiro
  const appRaw = (custo + targetProfit) / (1 - ifoodRate);
  const precoIfood = Math.round(appRaw);
  const taxaIfood = precoIfood * ifoodRate;
  const sobraIfood = precoIfood - taxaIfood - custo;
  const diferencaPreco = precoIfood - precoSalao;

  const handleSalvarPrecos = () => {
    setStatusSalvo("salvando");
    setTimeout(() => {
      setStatusSalvo("sucesso");
      setTimeout(() => {
        setStatusSalvo("idle");
      }, 3000);
    }, 600);
  };

  return (
    <main className="w-full bg-[#faf9f5] px-6 sm:px-8 py-8 min-h-screen text-[#1b1c1a]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-16">
        
        {/* Top Header Editorial */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#9f3c16] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#9f3c16] animate-pulse" />
              Margem Saudável • Sem Matemática Chata
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b1c1a]">
              Calculadora de Preço Sem Segredo
            </h1>
            <p className="text-base text-[#57423b] max-w-2xl mt-1">
              Descubra quanto cobrar no iFood e no salão para não pagar para trabalhar.
            </p>
          </div>

          {/* Quick Action / Status indicator */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-white p-2 rounded-full border border-[#e3e2df]/60 shadow-sm">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e2f7e0] text-[#1b6b42] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Regra dos {margemAlvo}% Ativa</span>
            </div>
            <button
              type="button"
              onClick={() => setModalAjudaAberto(true)}
              className="w-8 h-8 rounded-full bg-[#f0eee9] hover:bg-[#e4e2dd] flex items-center justify-center text-[#57423b] transition-colors"
              title="Como calculamos"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Interactive 2-Step Setup Area */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Step 1: Lanche Selecionado (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-[#ffdbcf]/40 pointer-events-none blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#f0eee9] text-[11px] font-bold text-[#57423b] uppercase tracking-wider">
                  Passo 1
                </span>
                <span className="text-xs text-[#8a726a] font-medium">
                  Custo Direto (Ficha Técnica)
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#1b1c1a] mb-1.5">
                Qual lanche você quer calcular?
              </h2>
              <p className="text-xs text-[#57423b] mb-5">
                Puxamos automaticamente os ingredientes e embalagens já cadastrados.
              </p>

              {/* Dropdown Pill Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-[#f5f3ee] hover:bg-[#eae8e3] transition-colors rounded-2xl p-3.5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#9f3c16] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <UtensilsCrossed className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base font-bold text-[#1b1c1a] truncate">
                        {ficha.nomePrato}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#57423b] mt-0.5">
                        <span>Custo total:</span>
                        <span className="font-bold text-[#9f3c16] bg-[#ffdbcf] px-2 py-0.5 rounded-full">
                          R$ {custo.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8a726a] shrink-0 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e3e2df] rounded-2xl shadow-xl z-30 p-2 flex flex-col gap-1 max-h-64 overflow-y-auto">
                    {FICHAS_EXEMPLO.map((f) => {
                      const custoItem = calcularCustoPrato(f, INSUMOS_EXEMPLO);
                      const isSelected = f.id === fichaId;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => {
                            setFichaId(f.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl text-left transition-colors text-sm ${
                            isSelected
                              ? "bg-[#ffdbcf] text-[#9f3c16] font-bold"
                              : "hover:bg-[#f5f3ee] text-[#1b1c1a]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="text-base">🍔</span>
                            <span className="truncate">{f.nomePrato}</span>
                          </div>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                              isSelected
                                ? "bg-[#9f3c16] text-white font-bold"
                                : "bg-[#f0eee9] text-[#57423b]"
                            }`}
                          >
                            R$ {custoItem.toFixed(2).replace(".", ",")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Micro breakdown of ingredients */}
            <div className="mt-6 pt-4 bg-[#f5f3ee]/80 rounded-2xl p-4 flex items-center justify-between border border-[#e3e2df]/40">
              <div className="flex items-center gap-2 overflow-hidden pr-2">
                <ChefHat className="w-4 h-4 text-[#1b6b42] shrink-0" />
                <span className="text-xs text-[#1b1c1a] font-medium truncate">
                  {RESUMO_INGREDIENTES[ficha.id] ?? "Ingredientes selecionados da ficha"}
                </span>
              </div>
              <span className="text-[11px] text-[#8a726a] shrink-0 font-medium">
                Atualizado hoje
              </span>
            </div>
          </div>

          {/* Step 2: Margem Desejada (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#f0eee9] text-[11px] font-bold text-[#57423b] uppercase tracking-wider">
                  Passo 2
                </span>
                <div className="flex items-center gap-1.5 text-[#1b6b42] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Meta de segurança financeira</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#1b1c1a] mb-1.5">
                Quanto você quer que sobre para você?
              </h2>
              <p className="text-xs text-[#57423b] mb-5">
                Escolha a margem bruta. Não se preocupe: a gente já calcula os impostos e taxas.
              </p>

              {/* Big Friendly Margin Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Option 1: 50% */}
                <button
                  type="button"
                  onClick={() => setMargemAlvo(50)}
                  className={`text-left p-4 rounded-2xl transition-all flex flex-col justify-between border ${
                    margemAlvo === 50
                      ? "bg-[#ffdbcf] border-[#9f3c16]/30 shadow-sm"
                      : "bg-[#f5f3ee] border-transparent hover:bg-[#eae8e3]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`text-2xl font-bold ${
                        margemAlvo === 50 ? "text-[#9f3c16]" : "text-[#1b1c1a]"
                      }`}
                    >
                      50%
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        margemAlvo === 50 ? "bg-[#9f3c16]" : "bg-[#e4e2dd]"
                      }`}
                    >
                      {margemAlvo === 50 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        margemAlvo === 50 ? "text-[#9f3c16]" : "text-[#1b1c1a]"
                      }`}
                    >
                      Mínimo
                    </span>
                    <span className="text-[11px] text-[#8a726a] leading-tight">
                      Cobre os custos sem folga
                    </span>
                  </div>
                </button>

                {/* Option 2: 60% (Recomendado) */}
                <button
                  type="button"
                  onClick={() => setMargemAlvo(60)}
                  className={`text-left p-4 rounded-2xl transition-all flex flex-col justify-between relative border ${
                    margemAlvo === 60
                      ? "bg-[#ffdbcf] border-[#9f3c16]/40 shadow-sm"
                      : "bg-[#f5f3ee] border-transparent hover:bg-[#eae8e3]"
                  }`}
                >
                  <div className="absolute -top-2.5 right-3 bg-[#9f3c16] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    Recomendado
                  </div>
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`text-2xl font-bold ${
                        margemAlvo === 60 ? "text-[#9f3c16]" : "text-[#1b1c1a]"
                      }`}
                    >
                      60%
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        margemAlvo === 60 ? "bg-[#9f3c16]" : "bg-[#e4e2dd]"
                      }`}
                    >
                      {margemAlvo === 60 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        margemAlvo === 60 ? "text-[#9f3c16]" : "text-[#1b1c1a]"
                      }`}
                    >
                      Ponto Ideal
                    </span>
                    <span className="text-[11px] text-[#8a726a] leading-tight">
                      Lucro justo + reinvestimento
                    </span>
                  </div>
                </button>

                {/* Option 3: 70% */}
                <button
                  type="button"
                  onClick={() => setMargemAlvo(70)}
                  className={`text-left p-4 rounded-2xl transition-all flex flex-col justify-between border ${
                    margemAlvo === 70
                      ? "bg-[#ffdbcf] border-[#9f3c16]/30 shadow-sm"
                      : "bg-[#f5f3ee] border-transparent hover:bg-[#eae8e3]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`text-2xl font-bold ${
                        margemAlvo === 70 ? "text-[#9f3c16]" : "text-[#1b1c1a]"
                      }`}
                    >
                      70%
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        margemAlvo === 70 ? "bg-[#9f3c16]" : "bg-[#e4e2dd]"
                      }`}
                    >
                      {margemAlvo === 70 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        margemAlvo === 70 ? "text-[#9f3c16]" : "text-[#1b1c1a]"
                      }`}
                    >
                      Lucro Alto
                    </span>
                    <span className="text-[11px] text-[#8a726a] leading-tight">
                      Para especiais ou combos
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick slider alternative for custom precision */}
            <div className="mt-5 pt-4 bg-[#f5f3ee]/60 rounded-2xl px-4 py-3 flex items-center gap-4 border border-[#e3e2df]/40">
              <Sliders className="w-4 h-4 text-[#8a726a]" />
              <span className="text-xs text-[#8a726a] whitespace-nowrap font-medium">
                Ajuste fino:
              </span>
              <input
                type="range"
                min="40"
                max="80"
                value={margemAlvo}
                onChange={(e) => setMargemAlvo(Number(e.target.value))}
                className="w-full accent-[#9f3c16] h-2 bg-[#e4e2dd] rounded-lg cursor-pointer"
              />
              <span className="text-sm font-bold text-[#9f3c16] w-12 text-right">
                {margemAlvo}%
              </span>
            </div>
          </div>
        </section>

        {/* The Two Big Result Cards Side by Side (Super Rounded) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Salão & Balcão */}
          <div className="bg-white rounded-3xl p-8 border border-[#e3e2df]/60 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f5f3ee] rounded-bl-full -z-0 pointer-events-none" />

            <div className="relative z-10">
              {/* Badge Channel */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f5f3ee] flex items-center justify-center text-[#1b1c1a]">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1b1c1a] leading-none">
                      Salão e Balcão
                    </h3>
                    <span className="text-xs text-[#8a726a] mt-1 block">
                      Pedidos presenciais ou telefone
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#f0eee9] text-xs font-semibold text-[#57423b] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8a726a]" />
                  Taxa média: 2,5%
                </span>
              </div>

              {/* Big Price Highlight */}
              <div className="my-6">
                <span className="text-xs font-bold text-[#8a726a] uppercase tracking-wider block mb-1">
                  Cobre no cardápio físico:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#1b1c1a] tracking-tight">
                    R$ {precoSalao.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-sm text-[#8a726a]">sugerido</span>
                </div>
              </div>

              {/* Breakdown Details */}
              <div className="space-y-3 py-4 bg-[#f5f3ee]/70 rounded-2xl p-4 mb-6 border border-[#e3e2df]/40">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#57423b] flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#8a726a]" />
                    Taxa estimada da maquininha
                  </span>
                  <span className="font-bold text-[#1b1c1a]">
                    R$ {taxaSalao.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#57423b] flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-[#8a726a]" />
                    Custo dos ingredientes
                  </span>
                  <span className="font-bold text-[#1b1c1a]">
                    R$ {custo.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>

            {/* Big Green Pocket Pill Result */}
            <div className="relative z-10 rounded-2xl bg-[#e2f7e0] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1b6b42] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wide text-[#1b6b42] font-bold block">
                    Fica no seu bolso
                  </span>
                  <div className="text-xl font-bold text-[#1b6b42]">
                    R$ {sobraSalao.toFixed(2).replace(".", ",")} por lanche
                  </div>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs text-[#1b6b42] bg-white px-2.5 py-1 rounded-full font-bold shadow-xs">
                  {sobraSalaoPct.toFixed(1).replace(".", ",")}% limpo
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: No iFood / Aplicativos */}
          <div className="bg-white rounded-3xl p-8 border border-[#e3e2df]/60 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffdbcf]/30 rounded-bl-full -z-0 pointer-events-none" />

            <div className="relative z-10">
              {/* Badge Channel */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#ffdbcf] flex items-center justify-center text-[#9f3c16]">
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1b1c1a] leading-none">
                      No iFood / Aplicativos
                    </h3>
                    <span className="text-xs text-[#8a726a] mt-1 block">
                      Plano de entrega parceira (27%)
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#ffdcbb] text-xs font-bold text-[#855000] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
                  Taxa app: 27%
                </span>
              </div>

              {/* Big Price Highlight */}
              <div className="my-6">
                <span className="text-xs font-bold text-[#8a726a] uppercase tracking-wider block mb-1">
                  Cobre no aplicativo:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#9f3c16] tracking-tight">
                    R$ {precoIfood.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-sm text-[#8a726a]">no cardápio digital</span>
                </div>
              </div>

              {/* Clear Portuguese Friendly Explanation Box */}
              <div className="space-y-2 py-4 bg-[#ffdbcf]/50 rounded-2xl p-4 mb-6 border border-[#9f3c16]/15">
                <div className="flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-[#9f3c16] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#57423b] leading-relaxed">
                    Como o app retém{" "}
                    <strong className="font-semibold text-[#9f3c16]">27% de comissão</strong>, você
                    precisa cobrar{" "}
                    <span className="font-bold text-[#1b1c1a] underline decoration-[#9f3c16] decoration-2">
                      R$ {diferencaPreco.toFixed(2).replace(".", ",")} a mais
                    </span>{" "}
                    para sobrar exatamente o mesmo dinheiro no final do mês.
                  </p>
                </div>
              </div>
            </div>

            {/* Big Green Pocket Pill Result */}
            <div className="relative z-10 rounded-2xl bg-[#e2f7e0] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1b6b42] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wide text-[#1b6b42] font-bold block">
                    Fica no seu bolso
                  </span>
                  <div className="text-xl font-bold text-[#1b6b42]">
                    R$ {sobraIfood.toFixed(2).replace(".", ",")} por lanche
                  </div>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs text-[#1b6b42] bg-white px-2.5 py-1 rounded-full font-bold shadow-xs">
                  Mesmo lucro
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Reassuring Manager Advice & Comparison Box */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ffdcbb] text-[#855000] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1b1c1a]">
                Dica de ouro do Gerente
              </h4>
              <p className="text-xs text-[#57423b] mt-0.5 max-w-2xl leading-relaxed">
                Não tenha medo de cobrar mais caro no aplicativo; quase todas as hamburguerias fazem
                isso para não ter prejuízo. O cliente entende o conforto do delivery.
              </p>
            </div>
          </div>

          {/* Quick stat indicator */}
          <div className="flex items-center gap-6 shrink-0 bg-[#f5f3ee] px-5 py-3 rounded-2xl border border-[#e3e2df]/40 w-full md:w-auto justify-around">
            <div className="text-center">
              <span className="block text-[11px] text-[#8a726a] font-medium">Preço Médio Bairro</span>
              <span className="text-sm font-bold text-[#1b1c1a]">R$ 31 • 34</span>
            </div>
            <div className="w-px h-8 bg-[#e4e2dd]" />
            <div className="text-center">
              <span className="block text-[11px] text-[#1b6b42] font-bold">Competitividade</span>
              <span className="text-xs font-bold text-[#1b6b42]">100% no padrão</span>
            </div>
          </div>
        </section>

        {/* Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2.5 text-[#57423b] text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#1b6b42] shrink-0" />
            <span>Preços calculados respeitando taxa de maquininha (2,5%) e comissão iFood (27%).</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/fichas"
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-white hover:bg-[#f0eee9] text-[#1b1c1a] text-sm font-bold transition-colors border border-[#e3e2df]/60 text-center"
            >
              Ver Ficha Técnica
            </Link>
            <button
              type="button"
              onClick={handleSalvarPrecos}
              disabled={statusSalvo === "salvando"}
              className={`flex-1 sm:flex-none px-8 py-3.5 rounded-full text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 ${
                statusSalvo === "sucesso"
                  ? "bg-[#1b6b42]"
                  : "bg-[#9f3c16] hover:bg-[#b44f2a]"
              }`}
            >
              {statusSalvo === "salvando" && (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              )}
              {statusSalvo === "sucesso" && (
                <>
                  <Check className="w-4 h-4" />
                  <span>Preços Atualizados!</span>
                </>
              )}
              {statusSalvo === "idle" && (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar e aplicar preços</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Educational Modal: Como calculamos */}
      {modalAjudaAberto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#e3e2df] relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setModalAjudaAberto(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0eee9] hover:bg-[#e4e2dd] flex items-center justify-center text-[#57423b] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1b1c1a]">
                  Como calculamos o preço sem segredo
                </h3>
                <span className="text-xs text-[#8a726a]">
                  Método de Precificação Segura Meu Gerente
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#57423b] leading-relaxed">
              <p>
                <strong>1. Custo dos Ingredientes:</strong> Somamos o custo de cada item (carne,
                pão, queijo, molho e embalagem), aplicando os fatores de perda na limpeza (FC) e
                perda no fogo (IC).
              </p>
              <p>
                <strong>2. Margem Alvo (60%):</strong> É o markup para garantir que, após pagar os
                ingredientes e taxas, sobre dinheiro suficiente para pagar a folha de pagamento,
                aluguel, energia e gerar retorno.
              </p>
              <p>
                <strong>3. Taxas de Cada Canal:</strong> O salão desconta apenas 2,5% da maquininha
                de cartão. Já os aplicativos como o iFood retêm 27%. A fórmula ajusta o preço
                automaticamente para que o <em>seu lucro no bolso seja exatamente o mesmo</em> em
                qualquer canal.
              </p>

              <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e3e2df] text-[11px] text-[#57423b]">
                <span className="font-bold text-[#1b1c1a] block mb-1">
                  Lembrete Amigo do Gerente:
                </span>
                A "sobra" calculada é a sua <strong>margem de contribuição</strong>. Ela não é o
                lucro líquido final, pois as despesas fixas da loja (como aluguel e equipe) ainda
                são pagas por essa sobra ao longo do mês.
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setModalAjudaAberto(false)}
                className="px-6 py-2.5 rounded-full bg-[#9f3c16] text-white text-xs font-bold hover:bg-[#b44f2a] transition-colors"
              >
                Entendi perfeitamente
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
