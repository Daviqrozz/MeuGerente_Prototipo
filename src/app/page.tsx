"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  ArrowUpRight,
  UtensilsCrossed,
  Calendar,
  Info,
  CalendarRange,
  X,
  Check,
  Building2,
  Wallet,
} from "lucide-react";

export type PeriodoTipo =
  | "semana"
  | "mes"
  | "15dias"
  | "30dias"
  | "ano"
  | "personalizado";

interface DadosPeriodo {
  id: PeriodoTipo;
  labelPill: string;
  faturamentoLabel: string;
  faturamentoValor: string;
  lanchesTotal: number;
  ticketMedio: string;
  metaTitulo: string;
  metaValor: string;
  metaAtingida: number;
  sobraValor: string;
  margemPct: number;
  gastoIngredientesValor: string;
  gastoIngredientesPct: number;
  contasFixasValor: string;
  contasFixasDesc: string;
  fluxoTotal: string;
  fluxoSalao: string;
  pctSalao: number;
  pctDelivery: number;
  pctIfood: number;
  vendasCenario: number;
  movimentoSubtitulo: string;
  legendaMovimentoTipo: string;
  histograma: {
    label: string;
    valor: string;
    h1: number;
    h2: number;
    destaque?: boolean;
  }[];
}

const DADOS_PERIODOS: Record<PeriodoTipo, DadosPeriodo> = {
  semana: {
    id: "semana",
    labelPill: "Semana atual",
    faturamentoLabel: "FATURAMENTO SEMANAL",
    faturamentoValor: "R$ 11.200,00",
    lanchesTotal: 310,
    ticketMedio: "R$ 36,12",
    metaTitulo: "Meta da semana",
    metaValor: "R$ 14.000,00",
    metaAtingida: 80,
    sobraValor: "R$ 6.840,00",
    margemPct: 61,
    gastoIngredientesValor: "R$ 2.800,00",
    gastoIngredientesPct: 25,
    contasFixasValor: "R$ 1.560,00",
    contasFixasDesc: "",
    fluxoTotal: "R$ 11.200,00",
    fluxoSalao: "R$ 5.376,00",
    pctSalao: 48,
    pctDelivery: 30,
    pctIfood: 22,
    vendasCenario: 310,
    movimentoSubtitulo: "310 vendas acumuladas na semana",
    legendaMovimentoTipo: "vendas no dia",
    histograma: [
      { label: "Seg", valor: "R$ 1.200,00", h1: 42, h2: 48 },
      { label: "Ter", valor: "R$ 1.350,00", h1: 50, h2: 56 },
      { label: "Qua", valor: "R$ 1.840,00", h1: 66, h2: 72 },
      { label: "Qui", valor: "R$ 1.950,00", h1: 72, h2: 78 },
      { label: "Sex", valor: "R$ 2.800,00", h1: 90, h2: 100, destaque: true },
      { label: "Sáb", valor: "R$ 2.060,00", h1: 76, h2: 82 },
    ],
  },
  mes: {
    id: "mes",
    labelPill: "Mês Atual",
    faturamentoLabel: "FATURAMENTO MENSAL",
    faturamentoValor: "R$ 48.200,00",
    lanchesTotal: 1360,
    ticketMedio: "R$ 35,44",
    metaTitulo: "Meta do mês",
    metaValor: "R$ 55.000,00",
    metaAtingida: 87,
    sobraValor: "R$ 29.400,00",
    margemPct: 61,
    gastoIngredientesValor: "R$ 12.050,00",
    gastoIngredientesPct: 25,
    contasFixasValor: "R$ 6.750,00",
    contasFixasDesc: "",
    fluxoTotal: "R$ 48.200,00",
    fluxoSalao: "R$ 24.582,00",
    pctSalao: 51,
    pctDelivery: 29,
    pctIfood: 20,
    vendasCenario: 1360,
    movimentoSubtitulo: "1.360 vendas acumuladas no mês",
    legendaMovimentoTipo: "vendas na semana",
    histograma: [
      { label: "Sem 1", valor: "R$ 11.200,00", h1: 60, h2: 66 },
      { label: "Sem 2", valor: "R$ 12.800,00", h1: 72, h2: 78 },
      { label: "Sem 3", valor: "R$ 14.600,00", h1: 90, h2: 100, destaque: true },
      { label: "Sem 4", valor: "R$ 9.600,00", h1: 52, h2: 58 },
      { label: "Média", valor: "R$ 12.050,00", h1: 68, h2: 72 },
      { label: "Proj.", valor: "R$ 15.000,00", h1: 82, h2: 88 },
    ],
  },
  "15dias": {
    id: "15dias",
    labelPill: "Últimos 15 dias",
    faturamentoLabel: "FATURAMENTO 15 DIAS",
    faturamentoValor: "R$ 26.500,00",
    lanchesTotal: 740,
    ticketMedio: "R$ 35,81",
    metaTitulo: "Meta 15 dias",
    metaValor: "R$ 30.000,00",
    metaAtingida: 88,
    sobraValor: "R$ 16.165,00",
    margemPct: 61,
    gastoIngredientesValor: "R$ 6.625,00",
    gastoIngredientesPct: 25,
    contasFixasValor: "R$ 3.710,00",
    contasFixasDesc: "",
    fluxoTotal: "R$ 26.500,00",
    fluxoSalao: "R$ 13.780,00",
    pctSalao: 52,
    pctDelivery: 28,
    pctIfood: 20,
    vendasCenario: 740,
    movimentoSubtitulo: "740 vendas nos últimos 15 dias",
    legendaMovimentoTipo: "vendas no bloco",
    histograma: [
      { label: "D 1-3", valor: "R$ 4.800,00", h1: 54, h2: 60 },
      { label: "D 4-6", valor: "R$ 5.200,00", h1: 64, h2: 70 },
      { label: "D 7-9", valor: "R$ 6.900,00", h1: 88, h2: 96, destaque: true },
      { label: "D 10-12", valor: "R$ 4.500,00", h1: 50, h2: 55 },
      { label: "D 13-15", valor: "R$ 5.100,00", h1: 62, h2: 68 },
      { label: "Média", valor: "R$ 5.300,00", h1: 66, h2: 70 },
    ],
  },
  "30dias": {
    id: "30dias",
    labelPill: "Últimos 30 dias",
    faturamentoLabel: "FATURAMENTO 30 DIAS",
    faturamentoValor: "R$ 52.800,00",
    lanchesTotal: 1490,
    ticketMedio: "R$ 35,43",
    metaTitulo: "Meta 30 dias",
    metaValor: "R$ 60.000,00",
    metaAtingida: 88,
    sobraValor: "R$ 32.200,00",
    margemPct: 61,
    gastoIngredientesValor: "R$ 13.200,00",
    gastoIngredientesPct: 25,
    contasFixasValor: "R$ 7.400,00",
    contasFixasDesc: "",
    fluxoTotal: "R$ 52.800,00",
    fluxoSalao: "R$ 26.400,00",
    pctSalao: 50,
    pctDelivery: 28,
    pctIfood: 22,
    vendasCenario: 1490,
    movimentoSubtitulo: "1.490 vendas nos últimos 30 dias",
    legendaMovimentoTipo: "vendas na semana",
    histograma: [
      { label: "Sem 1", valor: "R$ 12.400,00", h1: 65, h2: 70 },
      { label: "Sem 2", valor: "R$ 13.800,00", h1: 76, h2: 82 },
      { label: "Sem 3", valor: "R$ 15.200,00", h1: 90, h2: 100, destaque: true },
      { label: "Sem 4", valor: "R$ 11.400,00", h1: 58, h2: 62 },
      { label: "Média", valor: "R$ 13.200,00", h1: 72, h2: 75 },
      { label: "Pico", valor: "R$ 16.500,00", h1: 94, h2: 98 },
    ],
  },
  ano: {
    id: "ano",
    labelPill: "Ano Atual",
    faturamentoLabel: "FATURAMENTO ANUAL",
    faturamentoValor: "R$ 1.000.000,00",
    lanchesTotal: 11850,
    ticketMedio: "R$ 35,48",
    metaTitulo: "Meta do ano",
    metaValor: "R$ 480.000,00",
    metaAtingida: 87,
    sobraValor: "R$ 256.500,00",
    margemPct: 61,
    gastoIngredientesValor: "R$ 105.100,00",
    gastoIngredientesPct: 25,
    contasFixasValor: "R$ 58.900,00",
    contasFixasDesc: "",
    fluxoTotal: "R$ 420.500,00",
    fluxoSalao: "R$ 222.865,00",
    pctSalao: 53,
    pctDelivery: 27,
    pctIfood: 20,
    vendasCenario: 11850,
    movimentoSubtitulo: "11.850 vendas acumuladas no ano",
    legendaMovimentoTipo: "vendas no bimestre",
    histograma: [
      { label: "Jan-Fev", valor: "R$ 62.000,00", h1: 54, h2: 60 },
      { label: "Mar-Abr", valor: "R$ 71.000,00", h1: 66, h2: 72 },
      { label: "Mai-Jun", valor: "R$ 84.000,00", h1: 80, h2: 86 },
      { label: "Jul-Ago", valor: "R$ 96.000,00", h1: 92, h2: 100, destaque: true },
      { label: "Set-Out", valor: "R$ 78.000,00", h1: 74, h2: 78 },
      { label: "Nov-Dez", valor: "R$ 29.500,00", h1: 36, h2: 42 },
    ],
  },
  personalizado: {
    id: "personalizado",
    labelPill: "Personalizado",
    faturamentoLabel: "FATURAMENTO PERSONALIZADO",
    faturamentoValor: "R$ 35.800,00",
    lanchesTotal: 1010,
    ticketMedio: "R$ 35,44",
    metaTitulo: "Meta personalizada",
    metaValor: "R$ 40.000,00",
    metaAtingida: 89,
    sobraValor: "R$ 21.800,00",
    margemPct: 61,
    gastoIngredientesValor: "R$ 8.950,00",
    gastoIngredientesPct: 25,
    contasFixasValor: "R$ 5.050,00",
    contasFixasDesc: "",
    fluxoTotal: "R$ 35.800,00",
    fluxoSalao: "R$ 18.258,00",
    pctSalao: 51,
    pctDelivery: 29,
    pctIfood: 20,
    vendasCenario: 1010,
    movimentoSubtitulo: "1.010 vendas no período selecionado",
    legendaMovimentoTipo: "vendas no ciclo",
    histograma: [
      { label: "P 1", valor: "R$ 5.400,00", h1: 52, h2: 58 },
      { label: "P 2", valor: "R$ 6.800,00", h1: 68, h2: 74 },
      { label: "P 3", valor: "R$ 8.900,00", h1: 90, h2: 100, destaque: true },
      { label: "P 4", valor: "R$ 5.900,00", h1: 56, h2: 62 },
      { label: "P 5", valor: "R$ 4.800,00", h1: 46, h2: 52 },
      { label: "P 6", valor: "R$ 4.000,00", h1: 38, h2: 44 },
    ],
  },
};

export default function HomePage() {
  const [periodoAtivo, setPeriodoAtivo] = useState<PeriodoTipo>("ano");
  const [modalPersonalizadoAberto, setModalPersonalizadoAberto] = useState(false);
  const [dataInicio, setDataInicio] = useState("2026-10-01");
  const [dataFim, setDataFim] = useState("2026-11-05");

  const dados = DADOS_PERIODOS[periodoAtivo];

  const [itemSelecionado, setItemSelecionado] = useState<{
    label: string;
    valor: string;
  }>({
    label: dados.histograma.find((h) => h.destaque)?.label ?? dados.histograma[0].label,
    valor: dados.histograma.find((h) => h.destaque)?.valor ?? dados.histograma[0].valor,
  });

  const handleMudarPeriodo = (tipo: PeriodoTipo) => {
    setPeriodoAtivo(tipo);
    const novoDados = DADOS_PERIODOS[tipo];
    const destaque = novoDados.histograma.find((h) => h.destaque) ?? novoDados.histograma[0];
    setItemSelecionado({
      label: destaque.label,
      valor: destaque.valor,
    });

    if (tipo === "personalizado") {
      setModalPersonalizadoAberto(true);
    }
  };

  // Cálculo SVG Donut baseado na proporção do período selecionado
  const circunferencia = 515.22;
  const dashSalao = (dados.pctSalao / 100) * circunferencia;
  const dashDelivery = (dados.pctDelivery / 100) * circunferencia;
  const offsetDelivery = -dashSalao;
  const dashIfood = (dados.pctIfood / 100) * circunferencia;
  const offsetIfood = -(dashSalao + dashDelivery);

  return (
    <main className="w-full bg-[#faf9f5] px-5 sm:px-7 py-6 min-h-screen text-[#1b1c1a]">
      <div className="max-w-6xl mx-auto flex flex-col gap-3.5 pb-12">

        {/* Cabeçalho de Boas-Vindas */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#1b1c1a] tracking-tight flex items-center gap-2">
              Boa noite , Roberto <span className="text-2xl">👋</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-[#8a726a]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e2f7e0] text-[#1b6b42] font-semibold text-xs">
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0eee9] text-[#57423b] text-xs font-semibold border border-[#e3e2df]/60 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
              Demonstração
            </span>
          </div>
        </header>

        {/* CARD: Seletor de Período (Padding Otimizado e Compacto) */}
        <section className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#e3e2df]/60 shadow-xs">
          {/* Linha Superior: Ícone Calendário + Filtros em Pílulas */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-0.5 scrollbar-none">
            <div className="w-7 h-7 rounded-lg bg-[#f5f4f0] text-[#57423b] flex items-center justify-center shrink-0 border border-[#e3e2df]/50">
              <Calendar className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {(
                [
                  { id: "semana", label: "Semana atual" },
                  { id: "mes", label: "Mês Atual" },
                  { id: "15dias", label: "Últimos 15 dias" },
                  { id: "30dias", label: "Últimos 30 dias" },
                  { id: "ano", label: "Ano Atual" },
                  { id: "personalizado", label: "Personalizado" },
                ] as const
              ).map((p) => {
                const isActive = periodoAtivo === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleMudarPeriodo(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${isActive
                        ? "bg-[#1e3a63] text-white shadow-xs font-bold"
                        : "bg-[#f5f4f0] text-[#57423b] hover:bg-[#eae8e3] hover:text-[#1b1c1a]"
                      }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Linha Inferior: Aviso Amigável */}
          <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-[#f0f9ff] border border-[#bae6fd] text-[11px] text-[#0369a1] font-medium flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
            <span>
              Atenção: Os dados exibidos abaixo são condicionados ao filtro de período escolhido acima
            </span>
          </div>
        </section>

        {/* 3 Cards de Métricas Principais */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch">

          {/* Card 1: FATURAMENTO */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            {/* Teto do Card: Título + Badge */}
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8a726a]">
                {dados.faturamentoLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e2f7e0] text-[#1b6b42] text-[10px] sm:text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b6b42]" />
                Estimativa
              </span>
            </div>

            {/* Número e Legenda centralizados no meio (tanto altura quanto largura) */}
            <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-3">
              <div className="text-[26px] sm:text-[28px] md:text-[30px] lg:text-[37.5px] font-black text-[#1b1c1a] tracking-tight leading-tight">
                {dados.faturamentoValor}
              </div>
              <p className="text-[13px] sm:text-sm text-[#57423b] mt-2 font-medium text-center">
                {dados.lanchesTotal} lanches • ticket médio <strong className="font-black text-[#1b1c1a]">{dados.ticketMedio}</strong>
              </p>
            </div>
          </div>

          {/* Card 2: SOBRA ESTIMADA */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            {/* Teto do Card: Título + Badge */}
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8a726a]">
                SOBRA ESTIMADA
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdcbb]/70 text-[#855000] text-[10px] sm:text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
                Estimativa
              </span>
            </div>

            {/* Número e Legenda centralizados no meio (tanto altura quanto largura) */}
            <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-3">
              <div className="text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-black text-[#1b1c1a] tracking-tight leading-tight">
                {dados.sobraValor}
              </div>
              <p className="text-[13px] sm:text-sm text-[#57423b] mt-2 font-medium text-center">
                Já descontados insumos e taxas de canal
              </p>
            </div>
          </div>

          {/* Card 3: Fluxo de Caixa */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            {/* Teto do Card: Título + Link */}
            <div className="flex items-center justify-between w-full">
              <span className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                Fluxo de Caixa
              </span>
              <Link
                href="/margem"
                className="w-6 h-6 rounded-full bg-[#f5f4f0] hover:bg-[#e4e2dd] flex items-center justify-center text-[#8a726a] hover:text-[#1b1c1a] transition-colors"
                title="Ver detalhes de margem"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Gráfico centralizado tanto em altura quanto em largura */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
              <div className="relative flex items-center justify-center my-1">
                <svg className="w-40 h-40 sm:w-44 sm:h-44 md:w-[180px] md:h-[180px] transform -rotate-90" viewBox="0 0 200 200">
                  {/* Background Track */}
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="transparent"
                    stroke="#f5f4f0"
                    strokeWidth="13"
                  />
                  {/* Segment 1: Salão (dourado #d99b00) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="transparent"
                    stroke="#d99b00"
                    strokeWidth="13"
                    strokeDasharray={`${dashSalao} ${circunferencia}`}
                    strokeDashoffset="0"
                    className="transition-all duration-500 ease-in-out"
                  />
                  {/* Segment 2: Delivery Próprio (#e4e2dd) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="transparent"
                    stroke="#e4e2dd"
                    strokeWidth="13"
                    strokeDasharray={`${dashDelivery} ${circunferencia}`}
                    strokeDashoffset={offsetDelivery}
                    className="transition-all duration-500 ease-in-out"
                  />
                  {/* Segment 3: iFood (#dc2626) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="transparent"
                    stroke="#dc2626"
                    strokeWidth="13"
                    strokeDasharray={`${dashIfood} ${circunferencia}`}
                    strokeDashoffset={offsetIfood}
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>

                {/* Donut Center Hole Content ajustado e contido sem corte de texto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
                  <span className="text-xs sm:text-[13px] font-semibold text-[#8a726a] leading-none mb-1">
                    Salão
                  </span>
                  <span className="text-[15px] sm:text-[16px] md:text-[17px] font-black text-[#1b1c1a] tracking-tight leading-none whitespace-nowrap">
                    {dados.fluxoSalao}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#8a726a] leading-none mt-1">
                    {dados.pctSalao}% das vendas
                  </span>
                </div>
              </div>

              {/* Legenda centralizada abaixo do gráfico e proporcionalmente ampliada */}
              <div className="flex items-center justify-center gap-3 text-xs sm:text-[13px] mt-2.5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d99b00]" />
                  <span className="text-[#57423b] font-medium">Salão ({dados.pctSalao}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#e4e2dd] border border-[#d3d1cb]" />
                  <span className="text-[#57423b] font-medium">Delivery ({dados.pctDelivery}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
                  <span className="text-[#57423b] font-medium">iFood ({dados.pctIfood}%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CARD HORIZONTAL DE SAÚDE FINANCEIRA: Gastos vs Sobra Real */}
        <section className="bg-white rounded-2xl p-4 sm:py-4.5 sm:px-6 border border-[#e3e2df]/60 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e4e2dd] text-xs sm:text-sm">
          {/* Bloco 1: Gasto com Ingredientes */}
          <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#faf9f5] border border-[#e3e2df]/80 flex items-center justify-center text-[#9f3c16] shrink-0 shadow-2xs">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a726a] block leading-tight">
                Gasto com ingredientes
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <strong className="font-black text-[#1b1c1a] text-sm sm:text-base">
                  {dados.gastoIngredientesValor}
                </strong>
              </div>
            </div>
          </div>

          {/* Bloco 2: Contas Fixas do Negócio */}
          <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#faf9f5] border border-[#e3e2df]/80 flex items-center justify-center text-[#855000] shrink-0 shadow-2xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a726a] block leading-tight">
                Contas fixas do negócio
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <strong className="font-black text-[#1b1c1a] text-sm sm:text-base">
                  {dados.contasFixasValor}
                </strong>
                {dados.contasFixasDesc ? (
                  <span className="text-[11px] font-medium text-[#8a726a]">
                    {dados.contasFixasDesc}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Bloco 3: Dinheiro que Sobrou */}
          <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#e2f7e0] border border-[#b2e5ba]/60 flex items-center justify-center text-[#1b6b42] shrink-0 shadow-2xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b6b42] block leading-tight">
                Dinheiro que sobrou
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <strong className="font-black text-[#1b1c1a] text-sm sm:text-base">
                  {dados.sobraValor}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* Linha Inferior: O que fazer agora + Movimento do Período (Padding Ajustado) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Coluna Esquerda: O que fazer agora (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header do Card */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#1b1c1a]">
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
              <p className="text-xs text-[#8a726a] mb-3">
                Uma coisa de cada vez. Você tem o controle.
              </p>

              {/* Lista de Tarefas */}
              <div className="space-y-2.5">

                {/* Tarefa 1 */}
                <div className="rounded-xl p-3 bg-[#faf9f5] border border-[#e3e2df]/50 transition-all hover:border-[#dec0b7]">
                  <div className="flex items-start justify-between gap-2.5 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#e3e2df]/60 flex items-center justify-center text-[#9f3c16] shadow-2xs">
                        <Package className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                        Comprar frango antes do jantar
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                      Prioridade alta
                    </span>
                  </div>

                  <p className="text-xs text-[#57423b] ml-9 mb-0.5">
                    Restam 2 kg; o mínimo definido é 5 kg.
                  </p>
                  <p className="text-[10px] text-[#8a726a] ml-9 mb-2">
                    Estoque de demonstração • Peito de frango • 05 nov. 2026 • Confiança: Ilustrativa
                  </p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-[#e3e2df]/40 ml-9">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#e4e2dd] text-[#1b1c1a] flex items-center justify-center text-[9px] font-bold">
                        A
                      </div>
                      <span className="text-xs text-[#57423b] font-medium">Ana</span>
                    </div>
                    <Link
                      href="/insumos"
                      className="px-3 py-1 rounded-full bg-white hover:bg-[#f5f4f0] text-xs font-semibold text-[#1b1c1a] border border-[#e3e2df] shadow-2xs flex items-center gap-1 transition-colors"
                    >
                      <span>Resolver</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Tarefa 2 */}
                <div className="rounded-xl p-3 bg-[#faf9f5] border border-[#e3e2df]/50 transition-all hover:border-[#dec0b7]">
                  <div className="flex items-start justify-between gap-2.5 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#e3e2df]/60 flex items-center justify-center text-[#855000] shadow-2xs">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                        Revisar preço do frango no iFood
                      </h3>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#e4e2dd] text-[#57423b] text-[10px] font-semibold shrink-0">
                      Revisar hoje
                    </span>
                  </div>

                  <p className="text-xs text-[#57423b] ml-9 mb-0.5">
                    O preço de compra passou de <strong className="font-black text-[#1b1c1a]">R$ 19,90</strong> para <strong className="font-black text-[#9f3c16]">R$ 21,90</strong>/kg.
                  </p>
                  <p className="text-[10px] text-[#8a726a] ml-9 mb-2">
                    Preços de demonstração • Ficha técnica • 05 nov. 2026 • Confiança: Ilustrativa
                  </p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-[#e3e2df]/40 ml-9">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#e4e2dd] text-[#1b1c1a] flex items-center justify-center text-[9px] font-bold">
                        J
                      </div>
                      <span className="text-xs text-[#57423b] font-medium">João</span>
                    </div>
                    <Link
                      href="/calculadora"
                      className="px-3 py-1 rounded-full bg-white hover:bg-[#f5f4f0] text-xs font-semibold text-[#1b1c1a] border border-[#e3e2df] shadow-2xs flex items-center gap-1 transition-colors"
                    >
                      <span>Resolver</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Tarefa 3 */}
                <div className="rounded-xl p-2.5 bg-[#faf9f5] border border-[#e3e2df]/50 flex items-center justify-between hover:border-[#dec0b7] transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#e3e2df]/60 flex items-center justify-center text-[#1b6b42] shadow-2xs">
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                      Confirmar rendimento da carne
                    </h3>
                  </div>
                  <Link
                    href="/fichas"
                    className="px-3 py-1 rounded-full bg-white hover:bg-[#f5f4f0] text-xs font-semibold text-[#57423b] hover:text-[#1b1c1a] border border-[#e3e2df] shadow-2xs transition-colors"
                  >
                    Conferir ficha
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* Coluna Direita: Movimento do Período (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-[#e3e2df]/60 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-1.5">
                <h2 className="text-base font-bold text-[#1b1c1a]">
                  Movimento do período
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f0eee9] text-[#57423b] text-xs font-semibold">
                  {dados.labelPill}
                </span>
              </div>

              {/* Big Stats */}
              <div className="text-[24px] sm:text-[26px] md:text-[28px] font-black text-[#1b1c1a] tracking-tight mt-0.5 truncate">
                {dados.fluxoTotal}
              </div>
              <p className="text-xs text-[#8a726a] mt-0.5 mb-3 truncate">
                {dados.movimentoSubtitulo}
              </p>

              {/* Vertical Histogram Bars */}
              <div className="pt-1 pb-2">
                <div className="h-36 flex items-end justify-between gap-1.5 px-1 border-b border-[#f5f4f0] pb-1.5">
                  {dados.histograma.map((d) => {
                    const isSelected = itemSelecionado.label === d.label;
                    return (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => setItemSelecionado({ label: d.label, valor: d.valor })}
                        className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
                        title={`${d.label}: ${d.valor}`}
                      >
                        <div className="flex items-end gap-1 w-full justify-center h-28">
                          {/* Barra 1 */}
                          <div
                            style={{ height: `${d.h1}%` }}
                            className={`w-2 sm:w-2.5 rounded-full transition-all duration-300 ${d.destaque || isSelected
                                ? "bg-[#d99b00] group-hover:bg-[#b88200]"
                                : "bg-[#e4e2dd] group-hover:bg-[#d0cec8]"
                              }`}
                          />
                          {/* Barra 2 */}
                          <div
                            style={{ height: `${d.h2}%` }}
                            className={`w-2 sm:w-2.5 rounded-full transition-all duration-300 ${d.destaque || isSelected
                                ? "bg-[#d99b00] group-hover:bg-[#b88200]"
                                : "bg-[#e4e2dd] group-hover:bg-[#d0cec8]"
                              }`}
                          />
                        </div>
                        <span
                          className={`text-[11px] sm:text-xs mt-1.5 transition-colors ${d.destaque || isSelected
                              ? "font-bold text-[#1b1c1a]"
                              : "text-[#8a726a]"
                            }`}
                        >
                          {d.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Subtitle / Selected Bar Indicator */}
                <div className="flex items-center gap-2 mt-2.5 text-xs font-semibold text-[#1b1c1a]">
                  <span className="w-2 h-2 rounded-full bg-[#d99b00]" />
                  <span className="truncate">
                    {itemSelecionado.label} • <strong className="font-black text-[#1b1c1a]">{itemSelecionado.valor}</strong> em {dados.legendaMovimentoTipo}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>

      {/* Modal para Período Personalizado */}
      {modalPersonalizadoAberto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-[#e3e2df] relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setModalPersonalizadoAberto(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#f0eee9] hover:bg-[#e4e2dd] flex items-center justify-center text-[#57423b] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0eee9] text-[#1b1c1a] flex items-center justify-center">
                <CalendarRange className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1b1c1a]">
                  Definir Período Personalizado
                </h3>
                <span className="text-[11px] text-[#8a726a]">
                  Escolha o intervalo de datas para calcular a dashboard
                </span>
              </div>
            </div>

            <div className="space-y-3 my-4 text-xs text-[#57423b]">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#1b1c1a]">Data Inicial</label>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="p-2.5 rounded-lg bg-[#f5f4f0] border border-[#e3e2df] text-xs font-semibold text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#1b1c1a]">Data Final</label>
                <input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="p-2.5 rounded-lg bg-[#f5f4f0] border border-[#e3e2df] text-xs font-semibold text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setModalPersonalizadoAberto(false)}
                className="px-4 py-2 rounded-full bg-[#f0eee9] text-[#57423b] text-xs font-semibold hover:bg-[#eae8e3] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setModalPersonalizadoAberto(false)}
                className="px-5 py-2 rounded-full bg-[#1e3a63] text-white text-xs font-bold hover:bg-[#152947] transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Aplicar Período</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
