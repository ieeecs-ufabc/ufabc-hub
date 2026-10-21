"use client";

import {
    CircleStar,
  Clock,
  GraduationCap,
  Info,
  MapPin,
  Sun,
  Trash2,
} from "lucide-react";
import { formatarCreditos } from "@/lib/montador/formatar";
import type { CargaHorariaTpie } from "@/lib/montador/tipos";

export type CardDisciplinasProps = {
  turma: string;
  creditos: number;
  nome: string;
  professor: string;
  campus: string;
  turno: string;
  tipo: string;
  horarioInicio: string;
  horarioFim: string;
  cargaHoraria: CargaHorariaTpie;
  onExcluir?: () => void;
};

function formatarHoras(horas: number) {
  return `${horas}h`;
}

export function CardDisciplinas({
  turma,
  creditos,
  nome,
  professor,
  campus,
  turno,
  tipo,
  horarioInicio,
  horarioFim,
  cargaHoraria,
  onExcluir,
}: CardDisciplinasProps) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
            {turma}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-800">
            <CircleStar className="size-3.5 shrink-0" aria-hidden="true" />
            {formatarCreditos(creditos)}
          </span>
        </div>

        <button
          type="button"
          className="grid size-7 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          aria-label={`Informações sobre ${nome}`}
        >
          <Info className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3">
        <h2 className="text-lg font-bold tracking-tight text-slate-900">{nome}</h2>
        <p className="mt-0.5 text-sm font-medium text-slate-500">{professor}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
          <MapPin className="size-3 shrink-0 text-slate-400" aria-hidden="true" />
          {campus}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
          <Sun className="size-3 shrink-0" aria-hidden="true" />
          {turno}
        </span>
        <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-800 uppercase">
          {tipo}
        </span>
      </div>

      <div className="mt-3 flex w-full items-center justify-start gap-2 rounded-xl border border-slate-100 bg-slate-100 px-3 py-2.5">
        <Clock className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span className="text-sm font-bold text-slate-800">
          {horarioInicio} às {horarioFim}
        </span>
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

        {onExcluir ? (
          <button
            type="button"
            onClick={onExcluir}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 motion-reduce:transition-none"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Excluir
          </button>
        ) : null}
      </div>
    </article>
  );
}
