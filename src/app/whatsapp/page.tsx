import { MessageSquare, Bot, AlertCircle } from "lucide-react";

export default function WhatsAppPage() {
  const mensagensExemplo = [
    {
      tipo: "usuario",
      texto: "Qual é o custo de produção do Burger Salada hoje?",
      hora: "10:14",
    },
    {
      tipo: "gerente",
      texto:
        "O Burger Salada custa R$ 10,75 para ser produzido (ingredientes + embalagem). Com o alface americano a FC 1.25, são gastos R$ 0,90 só na porção limpa de alface.",
      hora: "10:14",
    },
    {
      tipo: "usuario",
      texto: "Quanto sobra se eu vender a R$ 34,00 no iFood?",
      hora: "10:16",
    },
    {
      tipo: "gerente",
      texto:
        "No iFood, com 23% de taxa + R$ 1,50 fixos, sobra R$ 13,93 de Margem de Contribuição (41% do preço). Lembre-se: isso não é lucro limpo, ainda precisa pagar aluguel e equipe.",
      hora: "10:17",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
          Comunicação Simples
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          WhatsApp Simulado — Meu Gerente
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Demonstração de como o dono do restaurante consulta dados e recebe alertas via conversa direta.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {/* Cabeçalho do Chat */}
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-lg">
              🍔
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                <span>Meu Gerente Food</span>
                <span className="text-[10px] bg-emerald-600 text-emerald-100 px-1.5 py-0.5 rounded">
                  Simulação
                </span>
              </div>
              <div className="text-xs text-emerald-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                <span>Online • Respostas baseadas nos dados do restaurante</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corpo do Chat */}
        <div className="p-4 sm:p-6 bg-zinc-100/60 space-y-4 min-h-[340px]">
          {mensagensExemplo.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.tipo === "usuario" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-xs ${
                  msg.tipo === "usuario"
                    ? "bg-emerald-600 text-white rounded-br-none"
                    : "bg-white text-zinc-900 border border-zinc-200 rounded-bl-none"
                }`}
              >
                <p>{msg.texto}</p>
                <span
                  className={`text-[10px] block mt-1 text-right ${
                    msg.tipo === "usuario" ? "text-emerald-100" : "text-zinc-400"
                  }`}
                >
                  {msg.hora}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé do Chat */}
        <div className="p-3 bg-zinc-50 border-t border-zinc-200 flex items-center gap-2 text-xs text-zinc-500">
          <Bot className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Simulador determinístico: as respostas utilizam os dados do arquivo <code className="font-mono bg-zinc-200 px-1 rounded">dados.ts</code> e cálculos puros sem chamadas externas a LLM.
          </span>
        </div>
      </div>

      <div className="bg-zinc-100/70 p-4 rounded-xl border border-dashed border-zinc-300 text-center text-xs text-zinc-500">
        <MessageSquare className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
        Placeholder da tela de WhatsApp Simulado. As 5 perguntas-modelo interativas serão conectadas no Prompt 3.
      </div>
    </div>
  );
}
