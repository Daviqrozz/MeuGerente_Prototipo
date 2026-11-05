"use client";

import { useState } from "react";
import { INSUMOS_EXEMPLO, Insumo } from "@/lib/dados";
import { calcularPrecoUnitarioBase } from "@/lib/calculos";
import {
  Utensils,
  Plus,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Package,
  Search,
  X,
  Minus,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

// Itens com fotos e destaques de estoque prioritário
const INSUMOS_PRIORITARIOS = [
  {
    id: "ins-01",
    nome: "Pão Brioche Tradicional",
    embalagem: "Pacote com 12 unidades fatiadas",
    estoqueAtual: 14,
    estoqueMinimo: 30,
    unidade: "un",
    statusBadge: "Restam 14 unidades",
    tagAlerta: "Pedir com urgência",
    nivelCor: "critico", // vermelho
    porcentagemBarra: 18,
    precoTexto: "R$ 24,00",
    sufixoPreco: "/pct (12 un)",
    imgSrc: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ins-14",
    nome: "Batata Palito Congelada 9mm",
    embalagem: "Saco industrial de 2,5 kg",
    estoqueAtual: 5,
    estoqueMinimo: 12,
    unidade: "kg",
    statusBadge: "Dura até amanhã",
    tagAlerta: "Reabastecer logo",
    nivelCor: "moderado", // âmbar
    porcentagemBarra: 38,
    precoTexto: "R$ 28,00",
    sufixoPreco: "/saco 2,5kg",
    imgSrc: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ins-03",
    nome: "Blend da Casa (Peito e Fraldinha)",
    embalagem: "Discos moldados de 160g resfriados",
    estoqueAtual: 18.5,
    estoqueMinimo: 15,
    unidade: "kg",
    statusBadge: "Estoque para 3 dias",
    tagAlerta: "Quantidade boa",
    nivelCor: "saudavel", // verde
    porcentagemBarra: 78,
    precoTexto: "R$ 38,00",
    sufixoPreco: "/kg",
    imgSrc: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ins-06",
    nome: "Queijo Cheddar Fatiado Especial",
    embalagem: "Fatias individuais (bloco de 1 kg)",
    estoqueAtual: 8,
    estoqueMinimo: 4,
    unidade: "kg",
    statusBadge: "Estoque tranquilo",
    tagAlerta: "Quantidade boa",
    nivelCor: "saudavel", // verde
    porcentagemBarra: 90,
    precoTexto: "R$ 48,00",
    sufixoPreco: "/kg",
    imgSrc: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&auto=format&fit=crop&q=80",
  },
];

export default function InsumosPage() {
  const [listaInsumos, setListaInsumos] = useState<Insumo[]>(INSUMOS_EXEMPLO);
  const [verTodos, setVerTodos] = useState(false);
  const [busca, setBusca] = useState("");

  // Estado do Modal de Ajuste de Estoque
  const [modalAjusteAberto, setModalAjusteAberto] = useState(false);
  const [itemAjustando, setItemAjustando] = useState<{
    nome: string;
    quantidade: number;
    unidade: string;
  } | null>(null);

  // Estado do Modal de Novo Ingrediente
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novaUnidade, setNovaUnidade] = useState<"kg" | "un" | "L">("kg");
  const [novoPreco, setNovoPreco] = useState("");
  const [novoEstoque, setNovoEstoque] = useState("");

  const insumosFiltrados = listaInsumos.filter(
    (i) =>
      i.nome.toLowerCase().includes(busca.toLowerCase()) ||
      i.fornecedor.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirModalAjuste(nome: string, quantidade: number, unidade: string) {
    setItemAjustando({ nome, quantidade, unidade });
    setModalAjusteAberto(true);
  }

  function alterarContador(delta: number) {
    if (!itemAjustando) return;
    const novoValor = Math.max(0, itemAjustando.quantidade + delta);
    setItemAjustando({ ...itemAjustando, quantidade: novoValor });
  }

  function salvarNovoIngrediente(e: React.FormEvent) {
    e.preventDefault();
    if (!novoNome.trim() || !novoPreco) return;

    const novoItem: Insumo = {
      id: `ins-${Date.now()}`,
      nome: novoNome.trim(),
      unidadeCompra: novaUnidade,
      precoCompra: parseFloat(novoPreco.replace(",", ".")) || 0,
      tamanhoEmbalagem: novaUnidade === "un" ? 1 : 1,
      fornecedor: "Fornecedor Cadastrado",
      dataAtualizacao: "2026-11-05",
      confirmadoPor: "Roberto (Dono)",
      categoria: "outros",
    };

    setListaInsumos([novoItem, ...listaInsumos]);
    setNovoNome("");
    setNovoPreco("");
    setNovoEstoque("");
    setModalNovoAberto(false);
  }

  return (
    <main className="w-full bg-[#faf9f5] px-6 sm:px-8 py-8 min-h-screen text-[#1b1c1a]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-16">
        {/* Top Header / Action Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdbcf] text-[#9f3c16]">
              <Utensils className="w-3.5 h-3.5 text-[#9f3c16]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Despensa Fácil
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b1c1a]">
              Insumos &amp; Ingredientes
            </h1>
            <p className="text-base text-[#57423b]">
              Veja o que tem na despensa e o que precisa comprar logo, sem complicação.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalNovoAberto(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#9f3c16] text-white text-sm font-semibold shadow-md hover:bg-[#bf542c] active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Adicionar ingrediente</span>
            </button>
          </div>
        </div>

        {/* Big Friendly Status Banners (Top Summary Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1: Tudo Certo */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#a5f4bf]/30 pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#a5f4bf]/40 text-[#1b6b42] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#1b6b42]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a5f4bf]/40 text-[#1b6b42] font-semibold text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#1b6b42]" />
                  Normal
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#1b1c1a] mb-1">
                Tudo certo na despensa
              </h2>
              <p className="text-sm text-[#57423b] leading-relaxed">
                {listaInsumos.length - 2} ingredientes essenciais estão com quantidade saudável para trabalhar hoje à noite.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f5f4f0] flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#1b6b42]">
                <CheckCircle2 className="w-4 h-4" /> Nenhum risco para os lanches mais vendidos
              </span>
              <span className="text-3xl font-extrabold text-[#1b1c1a]">
                {listaInsumos.length - 2}
              </span>
            </div>
          </div>

          {/* Card 2: Atenção / Pedir pelo WhatsApp */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#ffdbcf]/50 pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ffdbcf]/60 text-[#9f3c16] flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#9f3c16]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#9f3c16] font-semibold text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#9f3c16] animate-pulse" />
                  Acabando hoje!
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#1b1c1a] mb-1">
                Atenção: 2 itens no limite
              </h2>
              <p className="text-sm text-[#57423b] leading-relaxed">
                Pão Brioche e Batata Congelada podem faltar antes do fim do expediente de hoje.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f5f4f0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#f5f4f0] flex items-center justify-center text-xs font-bold text-[#9f3c16]">
                  🍔
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f5f4f0] flex items-center justify-center text-xs font-bold text-[#855000]">
                  🍟
                </div>
                <span className="text-xs font-medium text-[#1b1c1a]">
                  Padaria Bella Vista &amp; Distribuidora
                </span>
              </div>
              <a
                href="https://wa.me/?text=Ol%C3%A1%2C%20preciso%20fazer%20um%20pedido%20urgente%20de%20P%C3%A3o%20Brioche%20e%20Batata%21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b6b42] text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir pelo WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Priority Items Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-[#1b1c1a]">
              Ingredientes Prioritários
            </h3>
            <span className="px-3 py-1 rounded-full bg-[#efeeea] text-[#57423b] font-semibold text-xs">
              4 selecionados hoje
            </span>
          </div>
          <span className="text-xs text-[#57423b] hidden sm:inline">
            Exibindo os itens de maior giro na chapa
          </span>
        </div>

        {/* 4 Big Friendly Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {INSUMOS_PRIORITARIOS.map((item) => {
            const STATUS_CORES = {
              critico: {
                pillBg: "bg-[#ffdbcf]",
                pillText: "text-[#9f3c16]",
                dot: "bg-[#9f3c16]",
                bar: "bg-[#9f3c16]",
              },
              moderado: {
                pillBg: "bg-[#ffdcbb]",
                pillText: "text-[#855000]",
                dot: "bg-[#855000]",
                bar: "bg-[#855000]",
              },
              saudavel: {
                pillBg: "bg-[#a5f4bf]/50",
                pillText: "text-[#1b6b42]",
                dot: "bg-[#1b6b42]",
                bar: "bg-[#1b6b42]",
              },
            } as const;

            const cores = STATUS_CORES[item.nivelCor as keyof typeof STATUS_CORES] ?? STATUS_CORES.moderado;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-[#e3e2df]/60 shadow-sm flex flex-col justify-between transition-all hover:shadow-md group"
              >
                <div>
                  {/* Top status */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cores.pillBg} ${cores.pillText}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cores.dot}`} />
                      {item.statusBadge}
                    </span>
                  </div>

                  {/* Foto */}
                  <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 relative bg-[#f5f4f0]">
                    <img
                      src={item.imgSrc}
                      alt={item.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-[#1b1c1a] text-xs font-semibold flex items-center gap-1 shadow-xs">
                      {item.tagAlerta}
                    </div>
                  </div>

                  {/* Informações */}
                  <h4 className="font-bold text-base text-[#1b1c1a] mb-1">
                    {item.nome}
                  </h4>
                  <p className="text-xs text-[#57423b] mb-4">
                    {item.embalagem}
                  </p>

                  {/* Visual Stock Bar */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#57423b]">Estoque físico</span>
                      <span className="font-bold text-[#1b1c1a]">
                        {item.estoqueAtual} {item.unidade}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[#f5f4f0] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cores.bar} rounded-full transition-all duration-500`}
                        style={{ width: `${item.porcentagemBarra}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Preço e Botão de Ação */}
                <div className="pt-3.5 bg-[#faf9f5] rounded-2xl p-3.5 flex items-center justify-between border border-[#e3e2df]/40">
                  <div>
                    <span className="block text-[11px] text-[#57423b] font-medium">
                      Custo pago
                    </span>
                    <span className="font-bold text-sm text-[#1b1c1a]">
                      {item.precoTexto}{" "}
                      <span className="text-xs font-normal text-[#57423b]">
                        {item.sufixoPreco}
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      abrirModalAjuste(item.nome, item.estoqueAtual, item.unidade)
                    }
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold shadow-xs transition-all active:scale-95 ${
                      item.nivelCor === "critico"
                        ? "bg-[#9f3c16] text-white hover:bg-[#bf542c]"
                        : "bg-white text-[#1b1c1a] border border-[#e3e2df] hover:bg-[#f5f4f0]"
                    }`}
                  >
                    {item.nivelCor === "critico" ? "Pedir agora" : "Ajustar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Friendly Helpful Box (Zero Jargon) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2df]/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#ffdcbb]/50 text-[#855000] flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-[#855000]" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#1b1c1a] mb-1">
                Dica de ouro do Gerente
              </h4>
              <p className="text-sm text-[#57423b] max-w-2xl leading-relaxed">
                Toda vez que você ajusta o estoque ou lança a nota aqui, o custo dos seus hambúrgueres é recalculado automaticamente. Você não precisa fazer conta nenhuma na mão!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setVerTodos(!verTodos)}
              className="px-5 py-3 rounded-full bg-[#f5f4f0] text-[#1b1c1a] text-xs font-semibold hover:bg-[#efeeea] border border-[#e3e2df] transition-colors cursor-pointer"
            >
              {verTodos ? "Ocultar tabela completa" : `Ver todos os ${listaInsumos.length} itens`}
            </button>
          </div>
        </div>

        {/* Tabela Completa Expansível */}
        {verTodos && (
          <div className="bg-white rounded-3xl border border-[#e3e2df]/60 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="p-5 border-b border-[#f5f4f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-[#1b1c1a]">
                  Todos os Insumos Cadastrados
                </h3>
                <p className="text-xs text-[#57423b]">
                  Base completa de custos e fornecedores
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a726a]" />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar insumo ou fornecedor..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-full bg-[#f5f4f0] border border-[#e3e2df] text-xs text-[#1b1c1a] placeholder-[#8a726a] focus:outline-none focus:border-[#9f3c16]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#faf9f5] font-semibold text-[#57423b] uppercase tracking-wider border-b border-[#f5f4f0]">
                    <th className="px-6 py-3.5">Insumo</th>
                    <th className="px-4 py-3.5">Embalagem</th>
                    <th className="px-4 py-3.5">Preço Pago</th>
                    <th className="px-4 py-3.5">Custo p/ Receita</th>
                    <th className="px-4 py-3.5">Fornecedor</th>
                    <th className="px-4 py-3.5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f4f0]">
                  {insumosFiltrados.map((insumo) => {
                    const custoUnitario = calcularPrecoUnitarioBase(insumo);
                    const unidadeReceita =
                      insumo.unidadeCompra === "kg" || insumo.unidadeCompra === "g"
                        ? "g"
                        : insumo.unidadeCompra === "L" || insumo.unidadeCompra === "ml"
                        ? "ml"
                        : "un";

                    return (
                      <tr
                        key={insumo.id}
                        className="hover:bg-[#faf9f5]/70 transition-colors"
                      >
                        <td className="px-6 py-3.5 font-bold text-[#1b1c1a]">
                          {insumo.nome}
                        </td>
                        <td className="px-4 py-3.5 text-[#57423b]">
                          {insumo.tamanhoEmbalagem} {insumo.unidadeCompra}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-[#1b1c1a]">
                          R$ {insumo.precoCompra.toFixed(2)}
                        </td>
                        <td className="px-4 py-3.5 text-[#1b6b42] font-semibold">
                          R$ {custoUnitario.toFixed(4)} /{unidadeReceita}
                        </td>
                        <td className="px-4 py-3.5 text-[#57423b]">
                          {insumo.fornecedor}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() =>
                              abrirModalAjuste(
                                insumo.nome,
                                insumo.tamanhoEmbalagem * 2,
                                insumo.unidadeCompra
                              )
                            }
                            className="px-3 py-1 rounded-full bg-[#f5f4f0] hover:bg-[#efeeea] font-semibold text-[11px] text-[#1b1c1a] border border-[#e3e2df]"
                          >
                            Ajustar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal de Ajuste de Estoque */}
        {modalAjusteAberto && itemAjustando && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1b1c1a]">
                      {itemAjustando.nome}
                    </h3>
                    <p className="text-xs text-[#57423b]">Ajuste rápido de estoque</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalAjusteAberto(false)}
                  className="w-8 h-8 rounded-full bg-[#f5f4f0] text-[#57423b] flex items-center justify-center hover:text-[#1b1c1a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Touch Stepper */}
              <div className="bg-[#f5f4f0] rounded-2xl p-6 text-center space-y-3">
                <span className="text-xs font-semibold text-[#57423b] uppercase tracking-wider block">
                  Quantos tem fisicamente na loja agora?
                </span>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => alterarContador(-1)}
                    className="w-12 h-12 rounded-full bg-white text-[#1b1c1a] font-bold shadow-xs active:scale-90 flex items-center justify-center text-lg hover:bg-zinc-100 transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-4xl font-extrabold text-[#1b1c1a] min-w-[80px]">
                    {itemAjustando.quantidade}
                  </span>
                  <button
                    onClick={() => alterarContador(1)}
                    className="w-12 h-12 rounded-full bg-white text-[#1b1c1a] font-bold shadow-xs active:scale-90 flex items-center justify-center text-lg hover:bg-zinc-100 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-xs text-[#57423b] block">
                  {itemAjustando.unidade}(s) no total da despensa
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModalAjusteAberto(false)}
                  className="flex-1 py-3 rounded-full bg-[#f5f4f0] text-[#1b1c1a] font-semibold text-xs hover:bg-[#efeeea]"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setModalAjusteAberto(false)}
                  className="flex-1 py-3 rounded-full bg-[#9f3c16] text-white font-semibold text-xs shadow-sm active:scale-95 hover:bg-[#bf542c]"
                >
                  Salvar estoque
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Adicionar Ingrediente */}
        {modalNovoAberto && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#a5f4bf]/50 text-[#1b6b42] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1b1c1a]">
                      Novo Ingrediente
                    </h3>
                    <p className="text-xs text-[#57423b]">
                      Adicione o que você usa nos lanches
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalNovoAberto(false)}
                  className="w-8 h-8 rounded-full bg-[#f5f4f0] text-[#57423b] flex items-center justify-center hover:text-[#1b1c1a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={salvarNovoIngrediente} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1a] mb-1.5">
                    Nome do ingrediente
                  </label>
                  <input
                    type="text"
                    required
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    placeholder="Ex: Bacon em Fatias, Maionese..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#f5f4f0] text-[#1b1c1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#9f3c16]/20 border border-[#e3e2df]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1b1c1a] mb-1.5">
                      Como você compra?
                    </label>
                    <select
                      value={novaUnidade}
                      onChange={(e) =>
                        setNovaUnidade(e.target.value as "kg" | "un" | "L")
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-[#f5f4f0] text-[#1b1c1a] text-sm focus:outline-none border border-[#e3e2df]"
                    >
                      <option value="kg">Por Quilo (kg)</option>
                      <option value="un">Por Unidade (un)</option>
                      <option value="L">Por Litro (L)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1b1c1a] mb-1.5">
                      Quanto pagou?
                    </label>
                    <input
                      type="text"
                      required
                      value={novoPreco}
                      onChange={(e) => setNovoPreco(e.target.value)}
                      placeholder="R$ 0,00"
                      className="w-full px-4 py-3 rounded-2xl bg-[#f5f4f0] text-[#1b1c1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#9f3c16]/20 border border-[#e3e2df]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1a] mb-1.5">
                    Quantos tem na despensa agora?
                  </label>
                  <input
                    type="number"
                    value={novoEstoque}
                    onChange={(e) => setNovoEstoque(e.target.value)}
                    placeholder="Quantidade inicial"
                    className="w-full px-4 py-3 rounded-2xl bg-[#f5f4f0] text-[#1b1c1a] text-sm focus:outline-none border border-[#e3e2df]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalNovoAberto(false)}
                    className="flex-1 py-3 rounded-full bg-[#f5f4f0] text-[#1b1c1a] font-semibold text-xs hover:bg-[#efeeea]"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-[#9f3c16] text-white font-semibold text-xs shadow-sm hover:bg-[#bf542c]"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
