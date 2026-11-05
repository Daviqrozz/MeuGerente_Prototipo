import Link from "next/link";
import {
  TrendingUp,
  Package,
  UtensilsCrossed,
  Calculator,
  CheckSquare,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { INSUMOS_EXEMPLO, FICHAS_EXEMPLO, CANAIS_EXEMPLO, TAREFAS_EXEMPLO } from "@/lib/dados";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
          Visão Geral Operacional
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">
          Resumo do Dia
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Acompanhe onde o dinheiro está indo, quais pratos dão mais margem e as tarefas mais urgentes.
        </p>
      </div>

      {/* Cards de Resumo Rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Insumos Cadastrados
          </div>
          <div className="text-2xl font-bold text-zinc-900 mt-2">
            {INSUMOS_EXEMPLO.length} itens
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Preços atualizados com fornecedores
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Fichas Técnicas
          </div>
          <div className="text-2xl font-bold text-zinc-900 mt-2">
            {FICHAS_EXEMPLO.length} pratos
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Com perdas de limpeza (FC) e cocção (IC)
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Canais de Venda
          </div>
          <div className="text-2xl font-bold text-zinc-900 mt-2">
            {CANAIS_EXEMPLO.length} canais
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Salão, Delivery Próprio e iFood
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Alertas & Tarefas
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">
            {TAREFAS_EXEMPLO.filter((t) => t.status !== "concluida").length} pendentes
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Ações com responsáveis e prazos
          </p>
        </div>
      </div>

      {/* Navegação Rápida para os Módulos */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900">
          Módulos do Sistema (Estrutura Base Pronta)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/insumos"
            className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Package className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-zinc-900 mt-3 group-hover:text-emerald-700">
              1. Insumos
            </h3>
            <p className="text-xs text-zinc-600 mt-1">
              Cadastro de preços de compra, embalagens, fornecedores e histórico de confirmação.
            </p>
          </Link>

          <Link
            href="/fichas"
            className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-zinc-900 mt-3 group-hover:text-emerald-700">
              2. Fichas Técnicas
            </h3>
            <p className="text-xs text-zinc-600 mt-1">
              Quanto custa fazer cada lanche, com cálculo rigoroso de perda de limpeza (FC) e cozimento (IC).
            </p>
          </Link>

          <Link
            href="/margem"
            className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-zinc-900 mt-3 group-hover:text-emerald-700">
              3. Margem por Canal
            </h3>
            <p className="text-xs text-zinc-600 mt-1">
              Compare a sobra em R$ no Salão vs Delivery Próprio vs iFood com as taxas reais.
            </p>
          </Link>

          <Link
            href="/calculadora"
            className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Calculator className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-zinc-900 mt-3 group-hover:text-emerald-700">
              4. Calculadora de Preço
            </h3>
            <p className="text-xs text-zinc-600 mt-1">
              Descubra por quanto vender para bater a margem alvo, com proteção contra taxas abusivas.
            </p>
          </Link>

          <Link
            href="/tarefas"
            className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                <CheckSquare className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-zinc-900 mt-3 group-hover:text-emerald-700">
              5. Tarefas & Alertas
            </h3>
            <p className="text-xs text-zinc-600 mt-1">
              Todo problema vira tarefa com responsável e prazo definido para não deixar o lucro escapar.
            </p>
          </Link>

          <Link
            href="/whatsapp"
            className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                <MessageSquare className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-zinc-900 mt-3 group-hover:text-emerald-700">
              6. WhatsApp Simulado
            </h3>
            <p className="text-xs text-zinc-600 mt-1">
              Simulação de assistente respondendo perguntas operacionais com dados reais da loja.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
