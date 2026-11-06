"use client";

import React, { useState } from "react";
import {
  FICHAS_EXEMPLO,
  INSUMOS_EXEMPLO,
  CANAIS_EXEMPLO,
  TAREFAS_EXEMPLO,
} from "@/lib/dados";
import {
  calcularCustoPrato,
  calcularMargemContribuicao,
  calcularMargemPercentual,
  calcularPrecoRecomendado,
} from "@/lib/calculos";
import { Bot, Send } from "lucide-react";

type Mensagem = { tipo: "usuario" | "gerente"; texto: string; hora: string };

const PERGUNTAS_MODELO = [
  "Qual é o custo de fazer o Cheeseburger?",
  "Quanto sobra se eu vender a R$ 34 no iFood?",
  "Qual prato tem a melhor margem?",
  "Por quanto devo vender o Chicken Crispy no iFood com 30% de meta?",
  "Quais tarefas estão pendentes?",
];

function responderPergunta(pergunta: string): string {
  const p = pergunta.toLowerCase();

  // Custo do Cheeseburger
  if (p.includes("custo") && (p.includes("cheese") || p.includes("clássico"))) {
    const ficha = FICHAS_EXEMPLO.find((f) => f.id === "ficha-01")!;
    const custo = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
    return `O Cheeseburger Clássico custa **R$ ${custo.toFixed(2)}** para ser produzido por porção, incluindo pão, blend bovino (com perda de cozimento IC 0,8), queijo cheddar, maionese especial e embalagem.`;
  }

  // Margem no iFood
  if ((p.includes("sobra") || p.includes("margem") || p.includes("lucro")) && p.includes("ifood")) {
    const ficha = FICHAS_EXEMPLO.find((f) => f.id === "ficha-01")!;
    const custo = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
    const canal = CANAIS_EXEMPLO.find((c) => c.id === "canal-ifood")!;
    const preco = 34;
    const margem = calcularMargemContribuicao(preco, custo, canal);
    const pct = calcularMargemPercentual(margem, preco);
    return `Vendendo o Cheeseburger a R$ ${preco},00 no iFood (23% de taxa + R$ 1,50 fixos), sobram **R$ ${margem.toFixed(2)}** — isso é **${pct.toFixed(0)}%** de margem de contribuição. Lembre: isso ainda precisa pagar aluguel e equipe fixa.`;
  }

  // Melhor prato
  if (p.includes("melhor") && (p.includes("prato") || p.includes("margem"))) {
    const canal = CANAIS_EXEMPLO.find((c) => c.id === "canal-salao")!;
    const preco = 35;
    const melhor = FICHAS_EXEMPLO.map((f) => {
      const custo = calcularCustoPrato(f, INSUMOS_EXEMPLO);
      const margem = calcularMargemContribuicao(preco, custo, canal);
      const pct = calcularMargemPercentual(margem, preco);
      return { nome: f.nomePrato, pct };
    }).sort((a, b) => b.pct - a.pct)[0];
    return `Considerando preço de R$ ${preco},00 no Salão, o prato com maior margem é **${melhor.nome}** com **${melhor.pct.toFixed(0)}%** de sobra. Os pratos mais simples costumam ter melhor rendimento por custo menor de ingredientes.`;
  }

  // Preço recomendado
  if ((p.includes("quanto") || p.includes("preço") || p.includes("vender")) && p.includes("chicken")) {
    const ficha = FICHAS_EXEMPLO.find((f) => f.id === "ficha-03")!;
    const custo = calcularCustoPrato(ficha, INSUMOS_EXEMPLO);
    const canal = CANAIS_EXEMPLO.find((c) => c.id === "canal-ifood")!;
    const taxaPct = canal.taxaPercentual > 1 ? canal.taxaPercentual / 100 : canal.taxaPercentual;
    const preco = calcularPrecoRecomendado(custo, taxaPct, 0.30);
    if (preco) {
      return `Para o Chicken Crispy Burger no iFood com meta de 30% de sobra, o preço recomendado é **R$ ${preco.toFixed(2)}**. O custo de fazer é R$ ${custo.toFixed(2)} (inclui frango com IC 0,75 — 150g prontos = 200g crus).`;
    }
  }

  // Tarefas pendentes
  if (p.includes("tarefas") || p.includes("pendente") || p.includes("fazer")) {
    const pendentes = TAREFAS_EXEMPLO.filter((t) => t.status !== "concluida");
    if (pendentes.length === 0) return "Parabéns! Não há tarefas pendentes no momento.";
    const lista = pendentes
      .map((t) => `• **${t.titulo.split(" ").slice(0, 7).join(" ")}…** (${t.responsavel.split(" ")[0]}, prazo ${t.prazo})`)
      .join("\n");
    return `Há **${pendentes.length} tarefas pendentes**:\n\n${lista}`;
  }

  return "Não encontrei dados suficientes para responder essa pergunta com precisão. Tente perguntar sobre o custo de um prato, a margem no iFood ou as tarefas pendentes.";
}

function formatarTexto(texto: string): React.ReactElement[] {
  return texto.split("\n").map((linha, i) => (
    <p key={i} className={i > 0 ? "mt-1" : ""}>
      {linha.split(/\*\*(.+?)\*\*/).map((parte, j) =>
        j % 2 === 1 ? <strong key={j}>{parte}</strong> : <span key={j}>{parte}</span>
      )}
    </p>
  ));
}

export default function WhatsAppPage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      tipo: "gerente",
      texto: "Olá! Sou o Meu Gerente — seu assistente financeiro operacional. Pergunte sobre custos, margens, preços ou tarefas da sua loja.",
      hora: "--:--",
    },
  ]);
  const [input, setInput] = useState("");

  function agora() {
    return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  function enviarMensagem(texto: string) {
    if (!texto.trim()) return;
    const hora = agora();
    setMensagens((prev) => [...prev, { tipo: "usuario", texto, hora }]);
    setInput("");

    setTimeout(() => {
      const resposta = responderPergunta(texto);
      setMensagens((prev) => [...prev, { tipo: "gerente", texto: resposta, hora: agora() }]);
    }, 400);
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-8 py-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Cabeçalho */}
        <section>
          <h1 className="text-[28px] font-bold text-[#1b1c1a] tracking-tight">
            Meu gerente
          </h1>
          <p className="text-sm text-[#57423b] mt-1">
            Simulação de consultas operacionais com respostas baseadas nos dados reais da loja
          </p>
        </section>

        {/* Chat */}
        <div className="bg-white rounded-[24px] border border-[#e3e2df]/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Header do chat */}
          <div className="bg-[#9f3c16] text-white px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🍔</div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                Meu Gerente Food
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">Simulação</span>
              </div>
              <div className="text-xs text-white/70 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
                Respostas baseadas nos dados da loja demo
              </div>
            </div>
          </div>

          {/* Mensagens */}
          <div className="px-5 py-5 space-y-4 min-h-[320px] bg-[#faf9f5]/60">
            {mensagens.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.tipo === "usuario" ? "justify-end" : "justify-start"}`}
              >
                {msg.tipo === "gerente" && (
                  <div className="w-7 h-7 rounded-full bg-[#9f3c16]/10 flex items-center justify-center mr-2 mt-1 shrink-0">
                    <Bot className="w-4 h-4 text-[#9f3c16]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.tipo === "usuario"
                      ? "bg-[#9f3c16] text-white rounded-br-sm"
                      : "bg-white text-[#1b1c1a] border border-[#e3e2df]/50 rounded-bl-sm"
                  }`}
                >
                  <div className="leading-relaxed">{formatarTexto(msg.texto)}</div>
                  <div className={`text-[11px] mt-1 text-right ${msg.tipo === "usuario" ? "text-white/60" : "text-[#8a726a]"}`}>
                    {msg.hora}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Perguntas rápidas */}
          <div className="px-5 py-3 border-t border-[#f5f4f0] bg-white">
            <p className="text-xs font-semibold text-[#57423b] mb-2 uppercase tracking-wider">Perguntas rápidas</p>
            <div className="flex flex-wrap gap-2">
              {PERGUNTAS_MODELO.map((pergunta) => (
                <button
                  key={pergunta}
                  onClick={() => enviarMensagem(pergunta)}
                  className="px-3 py-1.5 rounded-full bg-[#f5f4f0] text-xs text-[#57423b] font-medium hover:bg-[#efeeea] hover:text-[#1b1c1a] transition-colors"
                >
                  {pergunta}
                </button>
              ))}
            </div>
          </div>

          {/* Campo de texto */}
          <div className="px-5 py-4 border-t border-[#f5f4f0] bg-white flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarMensagem(input)}
              placeholder="Digite sua pergunta..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-[#f5f4f0] border border-[#e3e2df]/50 text-sm text-[#1b1c1a] placeholder-[#8a726a] focus:outline-none focus:border-[#9f3c16]/50 transition-colors"
            />
            <button
              onClick={() => enviarMensagem(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-[#9f3c16] text-white flex items-center justify-center hover:bg-[#b44f2a] transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Aviso */}
        <div className="p-4 rounded-[16px] bg-[#f5f4f0] border border-[#e3e2df]/60 text-xs text-[#57423b] flex items-start gap-2">
          <Bot className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#1b1c1a]">Sem IA externa:</strong> As respostas são calculadas em tempo real com funções determinísticas a partir dos dados cadastrados na loja — sem chamadas para modelos de linguagem externos.
          </span>
        </div>
      </div>
    </main>
  );
}
