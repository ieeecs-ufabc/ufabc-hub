"use client";

import { useId, type ReactNode } from "react";
import { IconeBusca, IconeSetaBaixo } from "@/components/icones";
import {
  OPCOES_CAMPUS,
  OPCOES_TURNO,
  type FiltrosOfertadas,
} from "@/lib/montador/ofertadas";

type MenuPesquisaProps = {
  value: FiltrosOfertadas;
  onChange: (filtros: FiltrosOfertadas) => void;
};

export function MenuPesquisa({ value, onChange }: MenuPesquisaProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <label htmlFor={`${id}-busca`} className="sr-only">
          Buscar disciplinas
        </label>
        <IconeBusca className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400" />
        <input
          id={`${id}-busca`}
          type="search"
          value={value.busca}
          onChange={(evento) => onChange({ ...value, busca: evento.target.value })}
          placeholder="Buscar por código, nome ou professor..."
          autoComplete="off"
          enterKeyHint="search"
          className="h-8 w-full rounded-xl bg-slate-100 pr-3 pl-8 text-xs text-slate-800 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Seletor
          id={`${id}-campus`}
          rotulo="Campus"
          value={value.campus}
          onChange={(valor) => onChange({ ...value, campus: lerCampus(valor) })}
        >
          <option value="todos">Todos os Campus</option>
          {OPCOES_CAMPUS.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </Seletor>

        <Seletor
          id={`${id}-turno`}
          rotulo="Turno"
          value={value.turno}
          onChange={(valor) => onChange({ ...value, turno: lerTurno(valor) })}
        >
          <option value="todos">Todos os Turnos</option>
          {OPCOES_TURNO.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </Seletor>
      </div>
    </div>
  );
}

type SeletorProps = {
  id: string;
  rotulo: string;
  value: string;
  onChange: (valor: string) => void;
  children: ReactNode;
};

function Seletor({ id, rotulo, value, onChange, children }: SeletorProps) {
  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className="sr-only">
        {rotulo}
      </label>
      <select
        id={id}
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
        className={`h-8 w-full cursor-pointer appearance-none truncate rounded-xl bg-slate-100 pr-8 pl-8 text-xs *:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
          value === "todos" ? "text-gray-400" : "text-slate-700"
        }`}
      >
        {children}
      </select>
      <IconeSetaBaixo className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function lerCampus(valor: string): FiltrosOfertadas["campus"] {
  return OPCOES_CAMPUS.find((opcao) => opcao.valor === valor)?.valor ?? "todos";
}

function lerTurno(valor: string): FiltrosOfertadas["turno"] {
  return OPCOES_TURNO.find((opcao) => opcao.valor === valor)?.valor ?? "todos";
}
