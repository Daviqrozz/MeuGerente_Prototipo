import { TAREFAS_EXEMPLO } from "@/lib/dados";
import { CheckSquare, Calendar, User, AlertCircle, Clock } from "lucide-react";

export default function TarefasPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-2">
          Rotina Operacional & Ação
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          Tarefas e Alertas do Restaurante
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Regra de ouro: Todo alerta de custo ou desperdício gera uma tarefa com responsável e prazo definido.
        </p>
      </div>

      <div className="space-y-3">
        {TAREFAS_EXEMPLO.map((tarefa) => {
          const statusConfig = {
            pendente: {
              label: "Pendente",
              bg: "bg-amber-100 text-amber-800 border-amber-200",
            },
            em_andamento: {
              label: "Em Andamento",
              bg: "bg-blue-100 text-blue-800 border-blue-200",
            },
            concluida: {
              label: "Concluída",
              bg: "bg-emerald-100 text-emerald-800 border-emerald-200",
            },
          }[tarefa.status];

          return (
            <div
              key={tarefa.id}
              className="bg-white rounded-xl border border-zinc-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusConfig.bg}`}
                  >
                    {statusConfig.label}
                  </span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                    Origem: {tarefa.alertaOrigem}
                  </span>
                </div>
                <h3 className="font-bold text-zinc-900 text-base">
                  {tarefa.titulo}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs text-zinc-600 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="font-medium text-zinc-800">{tarefa.responsavel}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Prazo: {tarefa.prazo}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-100/70 p-4 rounded-xl border border-dashed border-zinc-300 text-center text-xs text-zinc-500">
        <CheckSquare className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
        Placeholder da tela de Tarefas e Alertas. Ações de marcar concluído e criação de novas tarefas serão adicionadas nas telas finais.
      </div>
    </div>
  );
}
