import { FICHAS_EXEMPLO, INSUMOS_EXEMPLO, CANAIS_EXEMPLO, Canal } from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularMargemContribuicao,
  calcularMargemPercentual,
} from "@/lib/calculos";
import { AlertTriangle, Info } from "lucide-react";

const PRECOS_DEMO: Record<string, number> = {
  "ficha-01": 32.0,
  "ficha-02": 36.0,
  "ficha-03": 38.0,
  "ficha-04": 44.0,
};

function barColor(pct: number) {
  if (pct >= 45) return "#1b6b42";
  if (pct >= 28) return "#855000";
  return "#9f3c16";
}

function CanalCard({ canal, custoPrato, preco }: { canal: Canal; custoPrato: number; preco: number }) {
  const taxaPctDecimal = canal.taxaPercentual > 1 ? canal.taxaPercentual / 100 : canal.taxaPercentual;
  const margem = calcularMargemContribuicao(preco, custoPrato, canal);
  const margemPct = calcularMargemPercentual(margem, preco);
  const taxaTotal = preco * taxaPctDecimal + canal.taxaFixa;
  const color = barColor(margemPct);

  return (
    <div className="bg-white rounded-[20px] border border-[#e3e2df]/50 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#1b1c1a]">{canal.nome.split("(")[0].trim()}</span>
        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: color + "15", color }}
        >
          {margemPct.toFixed(0)}% de sobra
        </span>
      </div>

      {canal.descricao && (
        <p className="text-xs text-[#57423b]">{canal.descricao}</p>
      )}

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-[#57423b]">
          <span>Preço de venda</span>
          <span className="font-semibold text-[#1b1c1a]">R$ {preco.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#57423b]">
          <span>Custo de fazer</span>
          <span className="font-semibold text-[#9f3c16]">− R$ {custoPrato.toFixed(2)}</span>
        </div>
        {taxaTotal > 0 && (
          <div className="flex justify-between text-[#57423b]">
            <span>Taxa do canal ({(taxaPctDecimal * 100).toFixed(0)}%{canal.taxaFixa > 0 ? ` + R$ ${canal.taxaFixa.toFixed(2)}` : ""})</span>
            <span className="font-semibold text-[#9f3c16]">− R$ {taxaTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-2 border-t border-[#f5f4f0] flex justify-between">
          <span className="font-bold text-[#1b1c1a]">Sobra por lanche</span>
          <span className="font-bold text-xl" style={{ color }}>R$ {margem.toFixed(2)}</span>
        </div>
      </div>

      {/* Barra visual */}
      <div className="h-2 rounded-full bg-[#f5f4f0] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, margemPct)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function MargemPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] px-8 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Cabeçalho */}
        <section>
          <h1 className="text-[28px] font-bold text-[#1b1c1a] tracking-tight">
            Preços e Margem por Canal
          </h1>
          <p className="text-sm text-[#57423b] mt-1">
            Quanto sobra no seu bolso ao vender no Salão, Delivery próprio ou iFood
          </p>
        </section>

        {/* Aviso de linguagem */}
        <div className="p-4 rounded-[16px] bg-[#ffdcbb]/40 border border-[#ffdcbb] flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#855000] shrink-0 mt-0.5" />
          <p className="text-xs text-[#57423b] leading-relaxed">
            <strong className="text-[#1b1c1a]">Atenção:</strong> O valor de "sobra" mostrado aqui é a{" "}
            <strong>margem de contribuição</strong> — ela ainda precisa pagar o aluguel, a equipe fixa e outras despesas do restaurante. Não é o lucro líquido final.
          </p>
        </div>

        {/* Por ficha técnica */}
        {FICHAS_EXEMPLO.map((ficha) => {
          const custo = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
          const preco = PRECOS_DEMO[ficha.id] ?? 35;
          return (
            <section key={ficha.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#1b1c1a]">{ficha.nomePrato}</h2>
                  <p className="text-xs text-[#57423b]">
                    Custo de fazer: <strong className="text-[#1b1c1a]">R$ {custo.toFixed(2)}</strong>
                    {" "}•{" "}
                    Preço sugerido: <strong className="text-[#1b1c1a]">R$ {preco.toFixed(2)}</strong>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CANAIS_EXEMPLO.map((canal) => (
                  <CanalCard key={canal.id} canal={canal} custoPrato={custo} preco={preco} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Comparativo rápido */}
        <section className="bg-white rounded-[24px] border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-[#9f3c16]" />
            <h2 className="text-sm font-bold text-[#1b1c1a]">Por que a margem cai tanto no iFood?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { label: "Salão", taxa: "0% de taxa", cor: "#1b6b42", nota: "Maior margem" },
              { label: "Delivery Próprio", taxa: "3,5% gateway", cor: "#855000", nota: "Boa alternativa" },
              { label: "iFood", taxa: "23% + R$ 1,50", cor: "#9f3c16", nota: "Alto volume, menor sobra" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-[16px] bg-[#faf9f5]">
                <div className="text-sm font-bold text-[#1b1c1a]">{item.label}</div>
                <div className="text-xs text-[#57423b] mt-0.5">{item.taxa}</div>
                <div className="mt-2 text-xs font-semibold" style={{ color: item.cor }}>
                  {item.nota}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
