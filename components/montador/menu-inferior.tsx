"use client";

import { Award, CirclePlus } from "lucide-react";
import { formatarCreditos } from "@/lib/montador/formatar";

type MenuInferiorProps = {
  totalCreditos: number;
  onAdicionarTurma: () => void;
};

export function MenuInferior({
  totalCreditos,
  onAdicionarTurma,
}: MenuInferiorProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 rounded-t-xl border-t border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-emerald-100/90 text-emerald-800">
            <Award className="size-4" />
          </span>

          <p aria-live="polite" aria-atomic="true" className="flex min-w-0 flex-col">
            <span className="text-[9px] font-semibold tracking-wide text-slate-400 uppercase">
              Total de créditos
            </span>
            <span className="text-xs font-bold text-slate-800">
              {formatarCreditos(totalCreditos)}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={onAdicionarTurma}
          className="flex h-10.5 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 text-[13px] font-bold whitespace-nowrap text-white shadow-md transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
        >
          <CirclePlus className="size-4 text-emerald-100" />
          Adicionar Turma
        </button>
      </div>
    </div>
  );
}
