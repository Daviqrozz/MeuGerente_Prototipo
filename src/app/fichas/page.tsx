import { FICHAS_EXEMPLO, INSUMOS_EXEMPLO } from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularPrecoUnitarioBase,
  calcularCustoIngrediente,
} from "@/lib/calculos";
import { ChevronDown } from "lucide-react";

const PRECO_VENDA_DEMO: Record<string, number> = {
  "ficha-01": 32.0,
  "ficha-02": 36.0,
  "ficha-03": 38.0,
  "ficha-04": 44.0,
};

const INSUMOS_MAP = Object.fromEntries(INSUMOS_EXEMPLO.map((i) => [i.id, i]));

export default function FichasPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] px-8 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Cabeçalho */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#1b1c1a] tracking-tight">
              Cardápio e Pratos
            </h1>
            <p className="text-sm text-[#57423b] mt-1">
              Quanto custa fazer cada lanche — com perdas de limpeza (FC) e cozimento (IC)
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#efeeea] text-[#57423b] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#855000]" />
            Demonstração
          </span>
        </section>

        {/* Cards das fichas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {FICHAS_EXEMPLO.map((ficha) => {
            const custoPrato = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
            const precoVenda = PRECO_VENDA_DEMO[ficha.id] ?? 35;
            const margemBruta = precoVenda - custoPrato;
            const margemPct = (margemBruta / precoVenda) * 100;

            return (
              <div
                key={ficha.id}
                className="bg-white rounded-[24px] border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden"
              >
                {/* Header do card */}
                <div className="px-6 pt-6 pb-4 border-b border-[#f5f4f0] flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9f3c16]">
                      {ficha.categoria}
                    </span>
                    <h3 className="text-lg font-bold text-[#1b1c1a] mt-0.5 leading-tight">
                      {ficha.nomePrato}
                    </h3>
                    <p className="text-xs text-[#57423b] mt-1 line-clamp-1">
                      {ficha.modoPreparo.slice(0, 70)}…
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] text-[#57423b] font-medium mb-1">Custo de fazer</div>
                    <div className="text-2xl font-bold text-[#1b1c1a]">
                      R$ {custoPrato.toFixed(2)}
                    </div>
                    <div className="text-xs text-[#57423b] mt-0.5">por porção</div>
                  </div>
                </div>

                {/* Ingredientes */}
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#57423b] mb-3">
                    Ingredientes ({ficha.ingredientes.length})
                  </p>
                  <div className="space-y-2">
                    {ficha.ingredientes.slice(0, 4).map((ing, idx) => {
                      const insumo = INSUMOS_MAP[ing.insumoId];
                      if (!insumo) return null;
                      const custo = calcularCustoIngrediente(insumo, ing.quantidade, ing.estadoMedida, ing.fc ?? 1, ing.ic ?? 1);
                      const temFC = ing.fc && ing.fc > 1;
                      const temIC = ing.ic && ing.ic < 1;
                      return (
                        <div key={idx} className="flex items-center justify-between gap-3 py-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#dec0b7] shrink-0" />
                            <span className="text-sm text-[#1b1c1a] truncate font-medium">
                              {insumo.nome}
                            </span>
                            {temFC && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ffdcbb] text-[#855000] font-semibold shrink-0">
                                FC {ing.fc}
                              </span>
                            )}
                            {temIC && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#9f3c16] font-semibold shrink-0">
                                IC {ing.ic}
                              </span>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-semibold text-[#1b6b42]">
                              R$ {custo.toFixed(2)}
                            </span>
                            <span className="text-[11px] text-[#57423b] ml-1">
                              {ing.quantidade}{ing.estadoMedida === "bruto" && insumo.unidadeCompra === "un" ? "un" : "g"}{" "}
                              {ing.estadoMedida !== "bruto" && <span className="opacity-60">{ing.estadoMedida}</span>}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {ficha.ingredientes.length > 4 && (
                      <button className="flex items-center gap-1 text-xs text-[#57423b] hover:text-[#1b1c1a] mt-1 font-medium">
                        <ChevronDown className="w-3.5 h-3.5" />
                        +{ficha.ingredientes.length - 4} ingredientes
                      </button>
                    )}
                  </div>
                </div>

                {/* Rodapé: Preço e Margem */}
                <div className="px-6 py-4 bg-[#faf9f5] border-t border-[#f5f4f0]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#57423b]">Preço de venda sugerido</span>
                      <div className="text-lg font-bold text-[#1b1c1a]">R$ {precoVenda.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#57423b]">Sobra (sem taxas canal)</span>
                      <div
                        className="text-lg font-bold"
                        style={{ color: margemPct >= 40 ? "#1b6b42" : margemPct >= 25 ? "#855000" : "#9f3c16" }}
                      >
                        {margemPct.toFixed(0)}%
                        <span className="text-sm font-normal text-[#57423b] ml-1">
                          (R$ {margemBruta.toFixed(2)})
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Barra de margem */}
                  <div className="mt-3 h-1.5 rounded-full bg-[#efeeea] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(margemPct, 100)}%`,
                        backgroundColor:
                          margemPct >= 40 ? "#1b6b42" : margemPct >= 25 ? "#855000" : "#9f3c16",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda FC/IC */}
        <div className="p-5 rounded-[20px] bg-[#ffdcbb]/30 border border-[#ffdcbb] flex flex-wrap gap-6 items-center">
          <div>
            <span className="text-xs font-bold text-[#855000] block mb-0.5">O que é FC?</span>
            <span className="text-xs text-[#57423b]">
              Fator de Correção — perda na limpeza (ex: alface 1kg comprado → 800g aproveitado = FC 1,25)
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#9f3c16] block mb-0.5">O que é IC?</span>
            <span className="text-xs text-[#57423b]">
              Índice de Cocção — perda no cozimento (ex: frango 1kg cru → 750g pronto = IC 0,75)
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
