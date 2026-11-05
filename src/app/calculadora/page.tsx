import { calcularPrecoRecomendado } from "@/lib/calculos";
import { Calculator, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function CalculadoraPage() {
  const custoVariavelExemplo = 12.5; // Custo de ingredientes + embalagem
  const taxaIfood = 0.23; // 23%
  const margemAlvoDesejada = 0.25; // 25%

  const precoSugerido = calcularPrecoRecomendado(
    custoVariavelExemplo,
    taxaIfood,
    margemAlvoDesejada
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
          Precificação Inteligente
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          Calculadora de Preço de Venda
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Descubra por quanto vender no balcão e no delivery para atingir a margem desejada sem prejuízo.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs space-y-5">
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Simulação de Cálculo com Proteção de Denominador
          </span>
          <h2 className="text-lg font-bold text-zinc-900 mt-0.5">
            Exemplo: Hambúrguer Artesanal no iFood
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <span className="text-xs text-zinc-500 block">Custo Variável Total</span>
            <span className="text-2xl font-bold text-zinc-900 mt-1 block">
              R$ {custoVariavelExemplo.toFixed(2)}
            </span>
            <span className="text-[11px] text-zinc-500">Ingredientes + embalagem</span>
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <span className="text-xs text-zinc-500 block">Taxas do Canal (iFood)</span>
            <span className="text-2xl font-bold text-zinc-900 mt-1 block">
              {(taxaIfood * 100).toFixed(0)}%
            </span>
            <span className="text-[11px] text-zinc-500">Comissão de intermediação</span>
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <span className="text-xs text-zinc-500 block">Margem Alvo Desejada</span>
            <span className="text-2xl font-bold text-emerald-700 mt-1 block">
              {(margemAlvoDesejada * 100).toFixed(0)}%
            </span>
            <span className="text-[11px] text-zinc-500">Sobra para custos fixos</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Preço Recomendado para o Cardápio</span>
            </div>
            <p className="text-xs text-emerald-700 mt-1">
              Fórmula pura: Custo / (1 - Taxas - Margem Alvo) = {custoVariavelExemplo.toFixed(2)} / (1 - {taxaIfood} - {margemAlvoDesejada})
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-emerald-800">
              {precoSugerido ? `R$ ${precoSugerido.toFixed(2)}` : "Inviável"}
            </span>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-4 flex items-center gap-2 text-xs text-zinc-500">
          <ShieldAlert className="w-4 h-4 text-zinc-400 shrink-0" />
          <span>
            <strong>Regra de Bloqueio Ativa:</strong> Se a soma das taxas e da margem alvo for ≥ 100% (denominador ≤ 0), o sistema bloqueia o cálculo e retorna nulo, evitando sugestão de preços impossíveis.
          </span>
        </div>
      </div>

      <div className="bg-zinc-100/70 p-4 rounded-xl border border-dashed border-zinc-300 text-center text-xs text-zinc-500">
        <Calculator className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
        Placeholder da Calculadora. Sliders e inputs interativos de margem e taxas serão adicionados nos próximos passos.
      </div>
    </div>
  );
}
