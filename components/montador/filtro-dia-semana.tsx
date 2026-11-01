"use client";

import { useId } from "react";
import { OPCOES_DIA_SEMANA, type DiaSemana } from "@/lib/montador/tipos";

type FiltroDiaSemanaProps = {
  value: DiaSemana;
  onChange: (dia: DiaSemana) => void;
};

export function FiltroDiaSemana({ value, onChange }: FiltroDiaSemanaProps) {
  const name = useId();

  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">Dia da semana</legend>

      <div className="grid grid-cols-6 gap-1.5">
        {OPCOES_DIA_SEMANA.map((opcao) => (
          <label
            key={opcao.valor}
            className="flex h-8.5 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white text-xs font-semibold text-slate-600 transition has-checked:border-emerald-600 has-checked:bg-emerald-600 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald-600 motion-reduce:transition-none"
          >
            <input
              type="radio"
              name={name}
              value={opcao.valor}
              checked={value === opcao.valor}
              onChange={() => onChange(opcao.valor)}
              className="sr-only"
            />
            <span aria-hidden="true">{opcao.rotulo}</span>
            <span className="sr-only">{opcao.nome}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
