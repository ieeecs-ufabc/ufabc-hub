"use client";

import { IconeCalendarioCortado }  from "@/components/icones";;
import type { Quinzena } from "@/lib/montador/tipos";
import { rotuloQuinzenaCurto } from "@/lib/montador/tipos";

export type CardSemDisciplinaProps = {
  diaNome: string;
  quinzena: Quinzena;
};

export function CardSemDisciplina({ diaNome, quinzena }: CardSemDisciplinaProps) {
  const periodo = rotuloQuinzenaCurto(quinzena);

  return (
    <article className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-6 py-12 text-center shadow-sm">
      <span className="mb-4 grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        <IconeCalendarioCortado className="size-7" aria-hidden="true" />
      </span>

      <h2 className="text-base font-bold text-slate-900">
        Sem aulas para {diaNome} ({periodo})
      </h2>
      <p className="mt-2 max-w-xs text-sm text-slate-500">
        Você não possui aulas agendadas para este período.
      </p>
    </article>
  );
}
