import type { TurmaPropsData } from "@/services/quadrimestre"; 
import {
  IconeCreditos,
  IconeInfo,
  IconeLixeira,
  IconeLocal,
  IconeLua,
  IconeRelogio,
  IconeSol,
} from "@/components/icones"; 

type HorarioProps = TurmaPropsData["horarios"][number];

type TurmaCardProps = {
  turma: TurmaPropsData;
  horario: HorarioProps;
  onInfo?: (turma: TurmaPropsData) => void;
  onExcluir?: (turma: TurmaPropsData) => void;
};

function formatHora(valor: unknown): string {
  if (valor instanceof Date) return valor.toISOString().slice(11, 16);
  const match = String(valor ?? "").match(/(\d{1,2}):(\d{2})/);
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : "--:--";
}

function capitalizar(texto: string) {
  const t = texto.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function estiloTurno(turno: string) {
  const t = turno.toLowerCase();
  if (t.startsWith("n"))
    return {
      Icone: IconeLua,
      classe: "border-indigo-200 bg-indigo-50 text-indigo-700",
    };
  return {
    Icone: IconeSol,
    classe: "border-amber-200 bg-amber-50 text-amber-700",
  };
}

export function TurmaCard({ turma, horario, onInfo, onExcluir }: TurmaCardProps) {
  const { disciplina } = turma;
  const { Icone: IconeTurno, classe: classeTurno } = estiloTurno(String(turma.turno));
  const docente = horario.docente?.nome;

  return (
    <article className="w-full max-w-420px rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Turma {turma.codigo}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            <IconeCreditos className="size-4" />
            {disciplina.creditos} Créditos
          </span>
        </div>

        <button
          type="button"
          onClick={() => onInfo?.(turma)}
          aria-label="Mais informações"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          <IconeInfo className="size-5" />
        </button>
      </div>


      <h3 className="mt-4 text-xl font-bold leading-tight text-slate-900">
        {disciplina.nome}
      </h3>
      <p className="mt-1 text-base font-medium text-slate-400">
        {docente ?? "Docente não definido"}
      </p>


      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          <IconeLocal className="size-4 text-slate-400" />
          {turma.campus}
        </span>

        <span
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold ${classeTurno}`}
        >
          <IconeTurno className="size-4" />
          {capitalizar(String(turma.turno))}
        </span>

        <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-700">
          {horario.tipo}
        </span>
      </div>


      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <IconeRelogio className="size-5" />
        </span>
        <span className="text-base font-bold text-slate-700">
          {formatHora(horario.horarioInicio)} às {formatHora(horario.horarioTermino)}
        </span>
      </div>


      <div className="mt-4 border-t border-slate-200 pt-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Carga horária (T-P-I-E)
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                ["T", disciplina.horasTeoria],
                ["P", disciplina.horasPratica],
                ["I", disciplina.horasIndividuais],
                ["E", disciplina.horasExtensao],
              ].map(([letra, horas]) => (
                <span
                  key={letra}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                >
                  {letra}: {horas ?? 0}h
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onExcluir?.(turma)}
            className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            <IconeLixeira className="size-4" />
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}