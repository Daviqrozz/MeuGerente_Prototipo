import { FICHAS_EXEMPLO, INSUMOS_EXEMPLO } from "@/lib/dados";
import { calcularCustoPrato } from "@/lib/calculos";
import { UtensilsCrossed, CheckCircle2 } from "lucide-react";

export default function FichasPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
          Engenharia de Cardápio
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          Fichas Técnicas & Custo dos Pratos
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Cálculo do custo real de cada lanche considerando perdas de limpeza (FC) e cocção (IC).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FICHAS_EXEMPLO.map((ficha) => {
          const custoPrato = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);

          return (
            <div
              key={ficha.id}
              className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                    {ficha.categoria}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 mt-0.5">
                    {ficha.nomePrato}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-500 block">Custo por lanche</span>
                  <span className="text-xl font-extrabold text-emerald-700">
                    R$ {custoPrato.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-50 p-3 rounded-lg text-xs text-zinc-600 border border-zinc-100">
                <span className="font-semibold text-zinc-800 block mb-1">
                  Modo de preparo operacional:
                </span>
                <p className="line-clamp-2">{ficha.modoPreparo}</p>
              </div>

              <div className="text-xs text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{ficha.ingredientes.length} ingredientes na receita</span>
                </div>
                <span>Rendimento: {ficha.rendimento} porção</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-100/70 p-4 rounded-xl border border-dashed border-zinc-300 text-center text-xs text-zinc-500">
        <UtensilsCrossed className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
        Tela de Fichas Técnicas detalhadas (com visualizador de FC/IC por ingrediente) será expandida nos próximos passos.
      </div>
    </div>
  );
}
