"use client";

import { useState } from "react";
import { FICHAS_EXEMPLO, INSUMOS_EXEMPLO, CANAIS_EXEMPLO } from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularPrecoRecomendado,
  calcularMargemContribuicao,
  calcularMargemPercentual,
} from "@/lib/calculos";
import { ShieldCheck, AlertTriangle, Calculator } from "lucide-react";

export default function CalculadoraPage() {
  const [fichaId, setFichaId] = useState(FICHAS_EXEMPLO[0].id);
  const [canalId, setCanalId] = useState(CANAIS_EXEMPLO[0].id);
  const [margemAlvo, setMargemAlvo] = useState(30);

  const ficha = FICHAS_EXEMPLO.find((f) => f.id === fichaId)!;
  const canal = CANAIS_EXEMPLO.find((c) => c.id === canalId)!;

  const custoVariavel = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
  const taxaPctDecimal = canal.taxaPercentual > 1 ? canal.taxaPercentual / 100 : canal.taxaPercentual;
  const taxaTotal = taxaPctDecimal;

  const precoRecomendado = calcularPrecoRecomendado(custoVariavel, taxaTotal, margemAlvo / 100);
  const denominador = 1 - taxaTotal - margemAlvo / 100;

  const margemCalculada = precoRecomendado
    ? calcularMargemContribuicao(precoRecomendado, custoVariavel, canal)
    : 0;
  const margemPctCalculada = precoRecomendado
    ? calcularMargemPercentual(margemCalculada, precoRecomendado)
    : 0;

  return (
    <main className="min-h-screen bg-[#faf9f5] px-8 py-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Cabeçalho */}
        <section>
          <h1 className="text-[28px] font-bold text-[#1b1c1a] tracking-tight">
            Calculadora de Preço
          </h1>
          <p className="text-sm text-[#57423b] mt-1">
            Descubra por quanto vender para bater a margem desejada em cada canal
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Painel de Configuração */}
          <div className="lg:col-span-2 bg-white rounded-[24px] border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-[#1b1c1a]">Configure o cálculo</h2>

            {/* Seletor de Prato */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#57423b] uppercase tracking-wider">
                1. Qual prato?
              </label>
              <div className="flex flex-col gap-1.5">
                {FICHAS_EXEMPLO.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFichaId(f.id)}
                    className={`px-4 py-3 rounded-2xl text-sm font-semibold text-left transition-all ${
                      fichaId === f.id
                        ? "bg-[#9f3c16] text-white shadow-sm"
                        : "bg-[#f5f4f0] text-[#57423b] hover:bg-[#efeeea]"
                    }`}
                  >
                    {f.nomePrato}
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de Canal */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#57423b] uppercase tracking-wider">
                2. Qual canal?
              </label>
              <div className="flex flex-col gap-1.5">
                {CANAIS_EXEMPLO.map((c) => {
                  const taxaFormatada = c.taxaPercentual > 1
                    ? c.taxaPercentual.toFixed(0)
                    : (c.taxaPercentual * 100).toFixed(0);
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCanalId(c.id)}
                      className={`px-4 py-3 rounded-2xl text-sm font-semibold text-left transition-all flex items-center justify-between ${
                        canalId === c.id
                          ? "bg-[#9f3c16] text-white shadow-sm"
                          : "bg-[#f5f4f0] text-[#57423b] hover:bg-[#efeeea]"
                      }`}
                    >
                      <span>{c.nome.split("(")[0].trim()}</span>
                      <span className={`text-xs ${canalId === c.id ? "text-white/80" : "text-[#8a726a]"}`}>
                        {taxaFormatada}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider de margem */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#57423b] uppercase tracking-wider">
                3. Meta de sobra: <span className="text-[#9f3c16]">{margemAlvo}%</span>
              </label>
              <input
                type="range"
                min={5}
                max={60}
                value={margemAlvo}
                onChange={(e) => setMargemAlvo(Number(e.target.value))}
                className="w-full accent-[#9f3c16] h-1.5 rounded-full"
              />
              <div className="flex justify-between text-[11px] text-[#8a726a]">
                <span>5%</span>
                <span>30% (recomendado)</span>
                <span>60%</span>
              </div>
            </div>
          </div>

          {/* Resultado */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Card do resultado principal */}
            {precoRecomendado ? (
              <div className="bg-white rounded-[24px] border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-7 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1b6b42]" />
                  <span className="text-sm font-bold text-[#1b1c1a]">Preço Recomendado</span>
                </div>

                <div className="text-center py-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#57423b] mb-2">
                    Coloque no cardápio por
                  </div>
                  <div className="text-6xl font-black text-[#1b1c1a] tracking-tight">
                    R$ {precoRecomendado.toFixed(2)}
                  </div>
                  <div className="text-sm text-[#57423b] mt-2">
                    no {canal.nome.split("(")[0].trim()}
                  </div>
                </div>

                {/* Desmembramento */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#f5f4f0]">
                    <span className="text-[#57423b]">Custo de fazer o prato</span>
                    <span className="font-semibold text-[#9f3c16]">R$ {custoVariavel.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#f5f4f0]">
                    <span className="text-[#57423b]">Taxas do canal ({(taxaTotal * 100).toFixed(1)}%)</span>
                    <span className="font-semibold text-[#9f3c16]">
                      R$ {(precoRecomendado * taxaTotal + canal.taxaFixa).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 font-bold">
                    <span className="text-[#1b1c1a]">Sobra por lanche</span>
                    <span className="text-[#1b6b42] text-lg">
                      R$ {margemCalculada.toFixed(2)} ({margemPctCalculada.toFixed(0)}%)
                    </span>
                  </div>
                </div>

                {/* Fórmula */}
                <div className="p-3.5 rounded-[14px] bg-[#f5f4f0] text-xs text-[#57423b]">
                  <span className="font-semibold text-[#1b1c1a] block mb-1">Como calculei:</span>
                  R$ {custoVariavel.toFixed(2)} ÷ (1 − {(taxaTotal * 100).toFixed(0)}% − {margemAlvo}%) = <strong className="text-[#1b1c1a]">R$ {precoRecomendado.toFixed(2)}</strong>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[24px] border border-[#9f3c16]/30 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-7 flex flex-col items-center gap-4 text-center">
                <AlertTriangle className="w-10 h-10 text-[#9f3c16]" />
                <div>
                  <h3 className="text-lg font-bold text-[#1b1c1a]">Combinação inviável</h3>
                  <p className="text-sm text-[#57423b] mt-1 leading-relaxed">
                    A soma das taxas do canal ({(taxaTotal * 100).toFixed(0)}%) com a meta de sobra ({margemAlvo}%) passa de 100%.
                    Não existe preço que funcione assim. Reduza a meta ou troque de canal.
                  </p>
                </div>
                <div className="p-3 rounded-[14px] bg-[#ffdad6] text-xs text-[#9f3c16] font-semibold">
                  Denominador calculado: {denominador.toFixed(4)} ≤ 0 → bloqueado pelo sistema
                </div>
              </div>
            )}

            {/* Aviso sobre margem ≠ lucro */}
            <div className="p-4 rounded-[16px] bg-[#faf9f5] border border-[#e3e2df]/60 flex items-start gap-2 text-xs text-[#57423b]">
              <Calculator className="w-4 h-4 text-[#57423b] shrink-0 mt-0.5" />
              <span>
                A "sobra" é a <strong>margem de contribuição</strong>: ainda cobre aluguel, equipe fixa e contas do restaurante. Não é o que fica no seu bolso no final.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
