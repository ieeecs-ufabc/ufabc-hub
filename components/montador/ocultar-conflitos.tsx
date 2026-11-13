"use client";

import { IconeAlerta } from "@/components/icones";

type OcultarConflitosProps = {
  value: boolean;
  onChange: (ocultar: boolean) => void;
};

export function OcultarConflitos({ value, onChange }: OcultarConflitosProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.25 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald-600">
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-xl transition-colors motion-reduce:transition-none ${
          value ? "bg-slate-100 text-slate-400" : "bg-red-100 text-red-600"
        }`}
      >
        <IconeAlerta className="size-3.5" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-xs font-bold text-slate-800">Ocultar Conflitos</span>
        <span className={`text-[10px] ${value ? "text-emerald-600" : "text-red-600"}`}>
          {value ? "Exibindo apenas horários livres" : "Exibindo turmas com conflito"}
        </span>
      </span>

      <input
        type="checkbox"
        role="switch"
        checked={value}
        onChange={(evento) => onChange(evento.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors motion-reduce:transition-none ${
          value ? "bg-emerald-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full border border-slate-200 bg-white shadow-xs transition-[translate] motion-reduce:transition-none ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </label>
  );
}
