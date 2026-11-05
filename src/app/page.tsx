import {
  TAREFAS_EXEMPLO,
  FICHAS_EXEMPLO,
  INSUMOS_EXEMPLO,
  CANAIS_EXEMPLO,
} from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularMargemContribuicao,
  calcularMargemPercentual,
} from "@/lib/calculos";
import { TrendingUp, AlertTriangle, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

// Cálculos reais dos dados demo
const fichasBurger = FICHAS_EXEMPLO.slice(0, 3).map((ficha) => {
  const custo = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
  return { ficha, custo };
});

const canalIfood = CANAIS_EXEMPLO.find((c) => c.id === "canal-ifood")!;
const canalSalao = CANAIS_EXEMPLO.find((c) => c.id === "canal-salao")!;

// Simula preços de venda para demonstração
const PRECO_DEMO = 34.0;
const VENDAS_DEMO = 42;
const TICKET_MEDIO = PRECO_DEMO;
const FATURAMENTO_DEMO = VENDAS_DEMO * TICKET_MEDIO;

// Margem média estimada (mistura de canais: 60% salão, 40% ifood)
const custoMedioPrato = fichasBurger.reduce((s, { custo }) => s + custo, 0) / fichasBurger.length;
const margemSalao = calcularMargemContribuicao(PRECO_DEMO, custoMedioPrato, canalSalao);
const margemIfood = calcularMargemContribuicao(PRECO_DEMO, custoMedioPrato, canalIfood);
const margemEstimada = margemSalao * 0.6 + margemIfood * 0.4;
const margemEstimadaTotal = margemEstimada * VENDAS_DEMO;
const margemPctMedia = calcularMargemPercentual(margemEstimada, PRECO_DEMO);

const tarefasPendentes = TAREFAS_EXEMPLO.filter((t) => t.status !== "concluida");
const maiorProblema = tarefasPendentes[0];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] px-8 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* Cabeçalho de boas-vindas */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#1b1c1a] tracking-tight leading-tight">
              Boa noite, Roberto 👋
            </h1>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-[#57423b]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8ad7a5]/40 text-[#1b6b42] font-semibold text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b6b42]" />
                Loja aberta
              </span>
              <span className="text-[#57423b]/40">•</span>
              <span>Dados de demonstração — Burger Craft Demo</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#efeeea] text-[#57423b] text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
              Demonstração
            </span>
          </div>
        </section>

        {/* 3 Cards de métricas principais */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card Faturamento */}
          <div className="p-7 rounded-[28px] bg-white border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#57423b]">
                  Faturamento hoje
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8ad7a5]/30 text-[#1b6b42] font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b6b42]" />
                  Estimativa
                </span>
              </div>
              <div className="text-[34px] font-bold text-[#1b1c1a] tracking-tight">
                R$ {(FATURAMENTO_DEMO / 1000).toFixed(1).replace(".", ".")}k
              </div>
              <p className="text-xs text-[#57423b] mt-1 leading-relaxed">
                {VENDAS_DEMO} lanches • ticket médio R$ {TICKET_MEDIO.toFixed(0)}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs">
              <span className="text-[#57423b]">Meta do dia: R$ 2.000</span>
              <span className="font-bold text-[#1b6b42] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                72% atingido
              </span>
            </div>
          </div>

          {/* Card Margem Estimada */}
          <div className="p-7 rounded-[28px] bg-white border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#57423b]">
                  Sobra estimada
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdcbb]/60 text-[#855000] font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
                  Estimativa
                </span>
              </div>
              <div className="text-[34px] font-bold text-[#1b1c1a] tracking-tight">
                R$ {margemEstimadaTotal.toFixed(0).replace(/(\d)(?=(\d{3})+$)/, "$1.")}
              </div>
              <p className="text-xs text-[#57423b] mt-1 leading-relaxed">
                Já descontados insumos e taxas de canal
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs">
              <span className="text-[#57423b]">Margem de contribuição</span>
              <span className="font-bold text-[#1b1c1a]">~{margemPctMedia.toFixed(0)}% da venda</span>
            </div>
          </div>

          {/* Card Maior Problema */}
          <div className="p-7 rounded-[28px] bg-white border border-[#9f3c16]/20 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#57423b]">
                  Atenção agora
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                  Alta
                </span>
              </div>
              <div className="text-base font-bold text-[#1b1c1a] leading-snug">
                {maiorProblema?.titulo.split(" ").slice(0, 7).join(" ")}…
              </div>
              <p className="text-xs text-[#57423b] mt-2 leading-relaxed">
                Origem: {maiorProblema?.alertaOrigem.slice(0, 50)}…
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs">
              <span className="text-[#57423b]">Responsável: {maiorProblema?.responsavel.split(" ")[0]}</span>
              <Link href="/tarefas" className="font-bold text-[#9f3c16] flex items-center gap-1 hover:underline">
                Ver tarefa <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Grid inferior: Tarefas + Canais */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* O que fazer agora */}
          <div className="p-7 rounded-[28px] bg-white border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#1b1c1a] flex items-center gap-2">
                <CheckSquareIcon />
                O que fazer agora
              </h2>
              <span className="text-xs text-[#57423b]">{tarefasPendentes.length} pendentes</span>
            </div>
            <div className="space-y-3">
              {tarefasPendentes.slice(0, 2).map((tarefa) => {
                const dotColor =
                  tarefa.prioridade === "alta"
                    ? "#9f3c16"
                    : tarefa.prioridade === "media"
                    ? "#855000"
                    : "#1b6b42";
                return (
                  <div
                    key={tarefa.id}
                    className="p-4 rounded-2xl bg-[#f5f4f0]/70 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: dotColor }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1b1c1a] leading-tight line-clamp-2">
                          {tarefa.titulo.split(" ").slice(0, 8).join(" ")}…
                        </p>
                        <p className="text-xs text-[#57423b] mt-0.5">
                          Prazo: {tarefa.prazo} • {tarefa.responsavel.split(" ")[0]}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/tarefas"
                      className="px-3.5 py-1.5 rounded-full bg-white text-[#1b1c1a] hover:bg-[#f5f4f0] font-semibold text-xs border border-[#e3e2df] shadow-sm shrink-0 transition-colors"
                    >
                      Ver
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-3 flex items-center justify-end">
              <Link
                href="/tarefas"
                className="text-xs font-semibold text-[#9f3c16] hover:underline flex items-center gap-1"
              >
                Ver todas as tarefas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Comparativo de Canais */}
          <div className="p-7 rounded-[28px] bg-white border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#1b1c1a] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#1b6b42]" strokeWidth={1.8} />
                Sobra por canal
              </h2>
              <span className="text-xs text-[#57423b]">Cheeseburger Clássico</span>
            </div>

            <div className="space-y-3">
              {CANAIS_EXEMPLO.map((canal) => {
                const custo = fichasBurger[0].custo;
                const margemRs = calcularMargemContribuicao(PRECO_DEMO, custo, canal);
                const margemPct = calcularMargemPercentual(margemRs, PRECO_DEMO);
                const barWidth = Math.max(10, Math.min(100, margemPct));
                return (
                  <div key={canal.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1b1c1a]">{canal.nome.split(" ")[0]}</span>
                      <span className="font-bold text-[#1b6b42]">
                        R$ {margemRs.toFixed(2)} <span className="text-[#57423b] font-normal">({margemPct.toFixed(0)}%)</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#f5f4f0] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor:
                            margemPct >= 50 ? "#1b6b42" : margemPct >= 30 ? "#855000" : "#9f3c16",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-3 flex items-center justify-between text-xs text-[#57423b]">
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[#855000]" />
                <span>Margem ≠ lucro líquido</span>
              </div>
              <Link
                href="/margem"
                className="font-semibold text-[#9f3c16] hover:underline flex items-center gap-1"
              >
                Detalhar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Acesso Rápido */}
        <section>
          <h2 className="text-sm font-bold text-[#57423b] uppercase tracking-wider mb-4">
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/insumos", emoji: "📦", label: "Insumos", sub: `${INSUMOS_EXEMPLO.length} cadastrados` },
              { href: "/fichas", emoji: "🍔", label: "Fichas", sub: `${FICHAS_EXEMPLO.length} pratos` },
              { href: "/calculadora", emoji: "🧮", label: "Calculadora", sub: "Preço sugerido" },
              { href: "/whatsapp", emoji: "💬", label: "Assistente", sub: "Perguntas rápidas" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-5 rounded-[20px] bg-white border border-[#e3e2df]/50 hover:border-[#9f3c16]/30 hover:shadow-md transition-all group"
              >
                <span className="text-2xl block mb-2">{item.emoji}</span>
                <p className="text-sm font-bold text-[#1b1c1a] group-hover:text-[#9f3c16] transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-[#57423b] mt-0.5">{item.sub}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function CheckSquareIcon() {
  return (
    <svg className="w-5 h-5 text-[#9f3c16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}


