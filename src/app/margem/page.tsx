import { CANAIS_EXEMPLO, FICHAS_EXEMPLO, INSUMOS_EXEMPLO } from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularMargemContribuicao,
  calcularMargemPercentual,
} from "@/lib/calculos";
import { TrendingUp, AlertTriangle } from "lucide-react";

export default function MargemPage() {
  const fichaPrincipal = FICHAS_EXEMPLO[0]; // Cheeseburger Clássico
  const custoBase = calcularCustoPrato(fichaPrincipal, INSUMOS_EXEMPLO);
  const precoSugeridoVenda = 34.0;

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 mb-2">
          Análise de Canais de Venda
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          Margem de Contribuição por Canal
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Veja quanto sobra no bolso após pagar os ingredientes, embalagens e taxas de cada aplicativo.
        </p>
      </div>

      {/* Alerta de conformidade com a regra de negócio */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Aviso importante:</strong> Margem de contribuição <strong>não é lucro líquido</strong>.
          Despesas fixas do restaurante (como aluguel, luz, salários da equipe e pró-labore) ainda precisam ser cobertas por esta margem.
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs space-y-4">
        <div className="border-b border-zinc-100 pb-3">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
            Exemplo Simulado
          </span>
          <h2 className="text-lg font-bold text-zinc-900 mt-0.5">
            {fichaPrincipal.nomePrato} — Preço de venda: R$ {precoSugeridoVenda.toFixed(2)} (Custo ingredientes: R$ {custoBase.toFixed(2)})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CANAIS_EXEMPLO.map((canal) => {
            const margemRs = calcularMargemContribuicao(precoSugeridoVenda, custoBase, canal);
            const margemPct = calcularMargemPercentual(margemRs, precoSugeridoVenda);
            const taxaPctFormatada = (
              canal.taxaPercentual > 1 ? canal.taxaPercentual : canal.taxaPercentual * 100
            ).toFixed(1);

            return (
              <div
                key={canal.id}
                className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 text-sm">{canal.nome}</h3>
                  <span className="text-[11px] font-semibold bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded">
                    Taxa: {taxaPctFormatada}%
                  </span>
                </div>

                <div className="space-y-1 text-xs text-zinc-600">
                  <div className="flex justify-between">
                    <span>Preço de Venda:</span>
                    <span className="font-medium">R$ {precoSugeridoVenda.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custo do Lanche:</span>
                    <span className="font-medium text-rose-600">- R$ {custoBase.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxas do Canal:</span>
                    <span className="font-medium text-rose-600">
                      - R$ {(precoSugeridoVenda * (canal.taxaPercentual > 1 ? canal.taxaPercentual / 100 : canal.taxaPercentual) + canal.taxaFixa).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-500 block">Sobra em R$:</span>
                    <span className="text-lg font-extrabold text-emerald-700">
                      R$ {margemRs.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-500 block">Margem %:</span>
                    <span className="text-sm font-bold text-zinc-900">
                      {margemPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-zinc-100/70 p-4 rounded-xl border border-dashed border-zinc-300 text-center text-xs text-zinc-500">
        <TrendingUp className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
        Placeholder da tela de Margem por Canal. Gráficos interativos com Recharts serão implementados nas etapas visuais.
      </div>
    </div>
  );
}
