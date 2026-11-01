"use client";

import { IconeCreditos, IconeCheck, IconeSol, IconeProfessor, IconeMapa, IconeInformacao } from "@/components/icones";
import { formatarCreditos } from "@/lib/montador/formatar";
import type { CargaHorariaTpie } from "@/lib/montador/tipos";

export type HorarioAula = {
  dia: string;
  horarioInicio: string;
  horarioFim: string;
  periodicidade?: string;
};

export type CardDisciplinaAdicionadoProps = {
  turma: string;
  creditos: number;
  nome: string;
  professor: string;
  campus: string;
  turno: string;
  tipo: string;
  horarios: HorarioAula[];
  cargaHoraria: CargaHorariaTpie;
  onInfo?: () => void;
};

function formatarHoras(horas: number) {
  return `${horas}h`;
}

export function CardDisciplinaAdicionado({
  turma,
  creditos,
  nome,
  professor,
  campus,
  turno,
  tipo,
  horarios,
  cargaHoraria,
  onInfo,
}: CardDisciplinaAdicionadoProps) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
            {turma}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-800">
            <IconeCreditos className="size-3.5 shrink-0" aria-hidden="true" />
            {formatarCreditos(creditos)}
          </span>
        </div>

        <button
          type="button"
          onClick={onInfo}
          className="grid size-7 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          aria-label={`Informações sobre ${nome}`}
        >
          <IconeInformacao className="size-3.5" aria-hidden="true" />
        </button>
      </div>


      <div className="mt-3">
        <h2 className="text-lg font-bold tracking-tight text-slate-900">{nome}</h2>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-slate-500">
          <IconeProfessor className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
          {professor}
        </p>
      </div>

      
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
          <IconeMapa className="size-3 shrink-0 text-slate-400" aria-hidden="true" />
          {campus}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
          <IconeSol className="size-3 shrink-0" aria-hidden="true" />
          {turno}
        </span>
        <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-800 uppercase">
          {tipo}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
          Horários das Aulas
        </p>
        <div className="space-y-2">
          {horarios.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white px-3 py-2.5 text-slate-800"
            >
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                  {item.dia}
                </span>
                <span className="text-sm font-bold tracking-tight">
                  {item.horarioInicio} às {item.horarioFim}
                </span>
              </div>
              {item.periodicidade && (
                <span className="rounded-md border border-violet-100 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">
                  {item.periodicidade}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold tracking-wide text-slate-400 uppercase">
            Carga horária (T-P-I-E)
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {(
              [
                ["T", cargaHoraria.teoria],
                ["P", cargaHoraria.pratica],
                ["I", cargaHoraria.individual],
                ["E", cargaHoraria.extensao],
              ] as const
            ).map(([rotulo, horas]) => (
              <span
                key={rotulo}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
              >
                {rotulo}: {formatarHoras(horas)}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 cursor-default"
        >
          <IconeCheck className="size-3.5" aria-hidden="true" />
          Adicionado
        </button>
      </div>
    </article>
  );
}