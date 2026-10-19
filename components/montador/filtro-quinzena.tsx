"use client";

import { useId } from "react";
import { OPCOES_QUINZENA, type Quinzena } from "@/lib/montador/tipos";

type FiltroQuinzenaProps = {
  value: Quinzena;
  onChange: (quinzena: Quinzena) => void;
};

export function FiltroQuinzena({ value, onChange }: FiltroQuinzenaProps) {
  const name = useId();

  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">Quinzena</legend>

      <div className="flex rounded-2xl bg-slate-200/80 p-1">
        {OPCOES_QUINZENA.map((opcao) => (
          <label
            key={opcao.valor}
            className="flex h-8 flex-1 cursor-pointer items-center justify-center rounded-xl text-xs font-semibold whitespace-nowrap text-slate-500 transition has-checked:bg-white has-checked:text-emerald-800 has-checked:shadow-xs has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald-600 motion-reduce:transition-none"
          >
            <input
              type="radio"
              name={name}
              value={opcao.valor}
              checked={value === opcao.valor}
              onChange={() => onChange(opcao.valor)}
              className="sr-only"
            />
            {opcao.rotulo}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
