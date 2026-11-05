import { INSUMOS_EXEMPLO } from "@/lib/dados";
import { calcularPrecoUnitarioBase } from "@/lib/calculos";
import { Package, ShieldCheck } from "lucide-react";

export default function InsumosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2">
            Gestão de Compras e Estoque
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Insumos e Ingredientes
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Preços de compra, embalagens, fornecedores e custo unitário base para receitas.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg text-xs text-amber-800">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{INSUMOS_EXEMPLO.length} itens cadastrados (Dados Demo)</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-sm text-zinc-700">
            <Package className="w-4 h-4 text-zinc-500" />
            <span>Lista de Insumos Base da Hamburgueria</span>
          </div>
          <span className="text-xs text-zinc-500">
            (Placeholder inicial — tela completa no Prompt 2)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-100/60 text-xs uppercase font-semibold text-zinc-700 border-b border-zinc-200">
              <tr>
                <th className="py-3 px-4">Insumo</th>
                <th className="py-3 px-4">Embalagem</th>
                <th className="py-3 px-4">Preço Pago</th>
                <th className="py-3 px-4">Custo Base p/ Receita</th>
                <th className="py-3 px-4">Fornecedor</th>
                <th className="py-3 px-4">Confirmado Por</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {INSUMOS_EXEMPLO.slice(0, 8).map((insumo) => {
                const custoBase = calcularPrecoUnitarioBase(insumo);
                const unidadeTexto =
                  insumo.unidadeCompra === "kg" || insumo.unidadeCompra === "g"
                    ? "g"
                    : insumo.unidadeCompra === "L" || insumo.unidadeCompra === "ml"
                    ? "ml"
                    : "un";

                return (
                  <tr key={insumo.id} className="hover:bg-zinc-50/70">
                    <td className="py-3 px-4 font-medium text-zinc-900">
                      {insumo.nome}
                    </td>
                    <td className="py-3 px-4">
                      {insumo.tamanhoEmbalagem} {insumo.unidadeCompra}
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-900">
                      R$ {insumo.precoCompra.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-emerald-700 font-medium">
                      R$ {custoBase.toFixed(4)} /{unidadeTexto}
                    </td>
                    <td className="py-3 px-4">{insumo.fornecedor}</td>
                    <td className="py-3 px-4 text-xs text-zinc-500">
                      {insumo.confirmadoPor} ({insumo.dataAtualizacao})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-zinc-50 text-center text-xs text-zinc-500 border-t border-zinc-100">
          Mostrando 8 de {INSUMOS_EXEMPLO.length} insumos de demonstração cadastrados no arquivo <code className="font-mono bg-zinc-200 px-1 rounded">dados.ts</code>.
        </div>
      </div>
    </div>
  );
}
