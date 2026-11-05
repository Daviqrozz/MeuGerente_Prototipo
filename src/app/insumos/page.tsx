import { INSUMOS_EXEMPLO } from "@/lib/dados";
import { calcularPrecoUnitarioBase } from "@/lib/calculos";
import { Search, Plus, TrendingUp, TrendingDown } from "lucide-react";

const CATEGORIAS_COLOR: Record<string, string> = {
  proteina: "#9f3c16",
  panificacao: "#855000",
  queijo: "#1b6b42",
  hortifruti: "#1b6b42",
  molho: "#855000",
  embalagem: "#57423b",
  outros: "#57423b",
};

const CATEGORIAS_LABEL: Record<string, string> = {
  proteina: "Proteína",
  panificacao: "Pão",
  queijo: "Queijo",
  hortifruti: "Hortifruti",
  molho: "Molho",
  embalagem: "Embalagem",
  outros: "Outros",
};

export default function InsumosPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] px-8 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Cabeçalho */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#1b1c1a] tracking-tight">
              Insumos e Estoque
            </h1>
            <p className="text-sm text-[#57423b] mt-1">
              Preços atualizados com fornecedores — base dos cálculos de custo
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9f3c16] text-white text-sm font-semibold hover:bg-[#b44f2a] transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Novo insumo
          </button>
        </section>

        {/* Resumo em cards pequenos */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total cadastrado", value: `${INSUMOS_EXEMPLO.length} itens`, color: "#1b6b42" },
            { label: "Proteínas", value: `${INSUMOS_EXEMPLO.filter((i) => i.categoria === "proteina").length} itens`, color: "#9f3c16" },
            { label: "Hortifruti", value: `${INSUMOS_EXEMPLO.filter((i) => i.categoria === "hortifruti").length} itens`, color: "#1b6b42" },
            { label: "Embalagens", value: `${INSUMOS_EXEMPLO.filter((i) => i.categoria === "embalagem").length} itens`, color: "#855000" },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-[20px] bg-white border border-[#e3e2df]/50 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#57423b]">{s.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </section>

        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a726a]" />
          <input
            type="text"
            placeholder="Buscar insumo ou fornecedor..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#e3e2df]/60 text-sm text-[#1b1c1a] placeholder-[#8a726a] focus:outline-none focus:border-[#9f3c16]/50 transition-colors shadow-sm"
            readOnly
          />
        </div>

        {/* Tabela de Insumos */}
        <div className="bg-white rounded-[24px] border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f5f4f0] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1b1c1a]">Lista de Insumos</h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#efeeea] text-[#57423b] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
              Dados Demo
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#faf9f5] text-xs font-semibold uppercase tracking-wider text-[#57423b] border-b border-[#f5f4f0]">
                  <th className="px-6 py-3">Insumo</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Embalagem</th>
                  <th className="px-4 py-3">Preço Pago</th>
                  <th className="px-4 py-3">Custo Unitário</th>
                  <th className="px-4 py-3">Fornecedor</th>
                  <th className="px-4 py-3">Atualizado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f4f0]">
                {INSUMOS_EXEMPLO.map((insumo) => {
                  const custoBase = calcularPrecoUnitarioBase(insumo);
                  const unidade =
                    insumo.unidadeCompra === "kg" || insumo.unidadeCompra === "g"
                      ? "g"
                      : insumo.unidadeCompra === "L" || insumo.unidadeCompra === "ml"
                      ? "ml"
                      : "un";
                  const catColor = CATEGORIAS_COLOR[insumo.categoria ?? "outros"];
                  const catLabel = CATEGORIAS_LABEL[insumo.categoria ?? "outros"];
                  return (
                    <tr key={insumo.id} className="hover:bg-[#faf9f5]/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-1 h-8 rounded-full shrink-0"
                            style={{ backgroundColor: catColor + "60" }}
                          />
                          <span className="font-semibold text-[#1b1c1a]">{insumo.nome}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{
                            backgroundColor: catColor + "15",
                            color: catColor,
                          }}
                        >
                          {catLabel}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#57423b]">
                        {insumo.tamanhoEmbalagem} {insumo.unidadeCompra}
                      </td>
                      <td className="px-4 py-4 font-bold text-[#1b1c1a]">
                        R$ {insumo.precoCompra.toFixed(2)}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-[#1b6b42]">
                          R$ {custoBase.toFixed(4)} /{unidade}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#57423b] text-xs">{insumo.fornecedor}</td>
                      <td className="px-4 py-4 text-[#57423b] text-xs">
                        <div>{insumo.dataAtualizacao}</div>
                        <div className="text-[11px] text-[#8a726a]">{insumo.confirmadoPor}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
