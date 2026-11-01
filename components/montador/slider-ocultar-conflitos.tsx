"use client";

import { IconeAlerta } from "@/components/icones";

export type SliderOcultarConflitosProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function SliderOcultarConflitos({
  checked,
  onCheckedChange,
}: SliderOcultarConflitosProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3.5">
        
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
          <IconeAlerta className="size-5" aria-hidden="true" />
        </div>

        
        <div>
          <h2 className="text-sm font-bold tracking-tight text-slate-900">
            Ocultar Conflitos
          </h2>
          <p className="mt-0.5 text-xs font-medium text-emerald-600">
            Exibindo apenas horários livres
          </p>
        </div>
      </div>

      <button
        type="button"
        role="Slider"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
          checked ? "bg-emerald-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block size-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}