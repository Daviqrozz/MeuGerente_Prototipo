"use client";

import { useState } from "react";
import { TAREFAS_EXEMPLO, StatusTarefa } from "@/lib/dados";
import { Calendar, User, AlertCircle, CheckCircle2, Clock, Circle } from "lucide-react";

const STATUS_CONFIG: Record<StatusTarefa, { label: string; bg: string; text: string; icon: typeof Circle }> = {
  pendente: { label: "Pendente", bg: "#ffdad6", text: "#9f3c16", icon: Circle },
  em_andamento: { label: "Em andamento", bg: "#ffdcbb", text: "#855000", icon: Clock },
  concluida: { label: "Concluída", bg: "#8ad7a5", text: "#1b6b42", icon: CheckCircle2 },
};

const PRIORIDADE_DOT: Record<string, string> = {
  alta: "#9f3c16",
  media: "#855000",
  baixa: "#1b6b42",
};

export default function TarefasPage() {
  const [filtro, setFiltro] = useState<StatusTarefa | "todas">("todas");

  const tarefas = filtro === "todas"
    ? TAREFAS_EXEMPLO
    : TAREFAS_EXEMPLO.filter((t) => t.status === filtro);

  const contagens = {
    todas: TAREFAS_EXEMPLO.length,
    pendente: TAREFAS_EXEMPLO.filter((t) => t.status === "pendente").length,
    em_andamento: TAREFAS_EXEMPLO.filter((t) => t.status === "em_andamento").length,
    concluida: TAREFAS_EXEMPLO.filter((t) => t.status === "concluida").length,
  };

  return (
    <main className="min-h-screen bg-[#faf9f5] px-8 py-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Cabeçalho */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#1b1c1a] tracking-tight">
              Tarefas e Alertas
            </h1>
            <p className="text-sm text-[#57423b] mt-1">
              Todo problema vira uma tarefa com responsável e prazo — nada fica esquecido
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9f3c16] text-white text-sm font-semibold hover:bg-[#b44f2a] transition-colors shadow-sm">
            + Nova tarefa
          </button>
        </section>

        {/* Resumo em números */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {([
            ["todas", "Total", "#57423b"],
            ["pendente", "Pendentes", "#9f3c16"],
            ["em_andamento", "Em andamento", "#855000"],
            ["concluida", "Concluídas", "#1b6b42"],
          ] as const).map(([key, label, cor]) => (
            <button
              key={key}
              onClick={() => setFiltro(key)}
              className={`p-4 rounded-[18px] border text-left transition-all ${
                filtro === key
                  ? "bg-[#1b1c1a] border-[#1b1c1a] text-white"
                  : "bg-white border-[#e3e2df]/50 hover:border-[#9f3c16]/30"
              }`}
            >
              <div
                className="text-2xl font-bold"
                style={{ color: filtro === key ? "white" : cor }}
              >
                {contagens[key]}
              </div>
              <div className={`text-xs font-semibold mt-0.5 ${filtro === key ? "text-white/70" : "text-[#57423b]"}`}>
                {label}
              </div>
            </button>
          ))}
        </section>

        {/* Lista de Tarefas */}
        <div className="flex flex-col gap-3">
          {tarefas.map((tarefa) => {
            const statusCfg = STATUS_CONFIG[tarefa.status];
            const StatusIcon = statusCfg.icon;
            const dotColor = PRIORIDADE_DOT[tarefa.prioridade];
            return (
              <div
                key={tarefa.id}
                className={`bg-white rounded-[20px] border border-[#e3e2df]/50 shadow-[0_1px_6px_rgba(0,0,0,0.03)] p-5 transition-shadow hover:shadow-md ${
                  tarefa.status === "concluida" ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Dot de prioridade + título */}
                  <div className="flex-1 min-w-0 flex items-start gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                      style={{ backgroundColor: dotColor }}
                    />
                    <div className="min-w-0">
                      <p className={`font-semibold text-sm leading-snug ${tarefa.status === "concluida" ? "line-through text-[#57423b]" : "text-[#1b1c1a]"}`}>
                        {tarefa.titulo}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#57423b]">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span className="line-clamp-1">{tarefa.alertaOrigem}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta info + status */}
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f4f0] text-xs text-[#57423b]">
                      <User className="w-3 h-3" />
                      <span className="font-medium">{tarefa.responsavel.split(" ")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f4f0] text-xs text-[#57423b]">
                      <Calendar className="w-3 h-3" />
                      <span>{tarefa.prazo}</span>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: statusCfg.bg + "80", color: statusCfg.text }}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regra de negócio */}
        <div className="p-4 rounded-[16px] bg-[#8ad7a5]/20 border border-[#8ad7a5]/50 text-xs text-[#1b6b42]">
          <strong>Regra do sistema:</strong> Toda variação de custo, desperdício identificado ou margem comprimida gera automaticamente uma tarefa com responsável e prazo. Nenhum alerta some sem ação.
        </div>
      </div>
    </main>
  );
}
