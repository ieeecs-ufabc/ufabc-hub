"use client";

import { useState, useEffect, type ComponentType } from "react";
import type { TurmaPropsData } from "@/services/quadrimestre";

import {
  IconeCreditos,
  IconeInfo,
  IconeLocal,
  IconeLua,
  IconeSol,
  IconeMais,
  IconeCheck,
  IconeSetaBaixo,
  IconeAlerta,
  IconeProibido,
} from "../icones";

export interface ConflitoInfo {
  disciplinaNome: string;
  diaSemana: string;
  horarioInicio: string;
  horarioTermino: string;
  periodicidade: string;
  horarioIdConflitante?: string;
}

export type StatusTurma = "disponivel" | "adicionada" | "conflito";

export interface TurmaCardProps {
  turma: TurmaPropsData;
  status?: StatusTurma;
  detalhesConflitos?: ConflitoInfo[];
  onToggleAdicionar?: (id: string) => void;
  onInfo?: (id: string) => void;
}

const turnoStyles: Record<
  string,
  { icon: ComponentType<{ className?: string }>; box: string; iconColor: string }
> = {
  Matutino: {
    icon: IconeSol,
    box: "bg-amber-50 border-amber-200 text-amber-700",
    iconColor: "text-amber-500",
  },
  Noturno: {
    icon: IconeLua,
    box: "bg-indigo-50 border-indigo-200 text-indigo-700",
    iconColor: "text-indigo-500",
  },
};

export default function TurmaCardBusca({
  turma,
  status = "disponivel",
  detalhesConflitos = [],
  onToggleAdicionar,
  onInfo,
}: TurmaCardProps) {
  const { disciplina, horarios } = turma;

  const emConflito = status === "conflito";
  const adicionado = status === "adicionada";
  const conflitos = emConflito ? detalhesConflitos : [];

  const [mostrarHorarios, setMostrarHorarios] = useState(true);

  useEffect(() => {
    if (emConflito) {
      setMostrarHorarios(true);
    }
  }, [emConflito]);

  const docentesUnicos = Array.from(
    new Map(
      horarios
        .filter((h) => h?.docente?.nome)
        .map((h) => [h.docente!.id, h.docente!.nome])
    ).values()
  );

  const configTurno = turnoStyles[turma.turno] ?? turnoStyles.Matutino;
  const TurnoIcon = configTurno.icon;

  const horariosValidos = horarios?.filter(Boolean) || [];

  return (
    <article
      className={`w-full max-w-105 rounded-xl border bg-white p-6 shadow-sm transition-all ${
        emConflito ? "border-red-200 bg-red-50/20 shadow-red-100/50" : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            Turma {turma.codigo}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
            <IconeCreditos className="h-4 w-4" />
            {disciplina.creditos} Créditos
          </span>
        </div>

        <button
          type="button"
          onClick={() => onInfo?.(turma.id)}
          aria-label="Mais informações"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 cursor-pointer"
        >
          <IconeInfo className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-900">
        {disciplina.nome}
      </h3>

      <div className="mt-1 flex flex-col gap-0.5">
        {docentesUnicos.length > 0 ? (
          docentesUnicos.map((nomeDocente, index) => (
            <p key={index} className="text-base font-medium text-slate-400">
              {nomeDocente}
            </p>
          ))
        ) : (
          <p className="text-base font-medium text-slate-400">A definir</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
          <IconeLocal className="h-4 w-4 text-slate-400" />
          {turma.campus}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${configTurno.box}`}
        >
          <TurnoIcon className={`h-4 w-4 ${configTurno.iconColor}`} />
          {turma.turno}
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3 border border-slate-100 transition-all">
        <button
          type="button"
          onClick={() => setMostrarHorarios((prev) => !prev)}
          className="flex w-full items-center justify-between text-left cursor-pointer focus-visible:outline-none group"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 group-hover:text-slate-700 transition-colors">
            Horários das aulas ({horariosValidos.length})
          </p>
          <IconeSetaBaixo
            className={`h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-all duration-200 ${
              mostrarHorarios ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {mostrarHorarios && (
          <div className="mt-3 flex flex-col gap-2">
            {horariosValidos.map((horario) => {
              const conflitoDesteHorario = conflitos.find(
                (c) =>
                  c.horarioIdConflitante === horario.id ||
                  (c.diaSemana === horario.diaSemana &&
                    c.horarioInicio === horario.horarioInicio)
              );

              const isConflitante = Boolean(conflitoDesteHorario);

              return (
                <div
                  key={horario.id}
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 transition-all ${
                    isConflitante
                      ? "border-red-200 bg-red-50/60 ring-1 ring-red-200/50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-extrabold text-white ${
                        isConflitante ? "bg-red-600" : "bg-slate-900"
                      }`}
                    >
                      {horario.diaSemana}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isConflitante ? "text-red-900" : "text-slate-700"
                      }`}
                    >
                      {horario.horarioInicio} às {horario.horarioTermino}
                    </span>
                  </div>

                  {isConflitante ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-100/70 px-3 py-1 text-xs font-bold text-red-700">
                      <IconeAlerta className="h-3.5 w-3.5" />
                      Conflito
                    </span>
                  ) : (
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600">
                      {horario.periodicidade}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {conflitos.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {conflitos.map((conflito, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-900"
            >
              <IconeAlerta className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
              <p className="leading-relaxed">
                <span className="font-bold">Conflito de horário:</span> Coincide com{" "}
                <span className="font-bold underline cursor-pointer">
                  {conflito.disciplinaNome}
                </span>{" "}
                na {conflito.diaSemana} ({conflito.horarioInicio} {" "} às
                {conflito.horarioTermino}){" "}
                <span className="font-bold">{conflito.periodicidade}</span>.
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Carga horária (T-P-I-E)
          </p>
          <div className="mt-2 flex gap-2">
            {(
              [
                ["T", disciplina.horasTeoria],
                ["P", disciplina.horasPratica],
                ["I", disciplina.horasIndividuais],
                ["E", disciplina.horasExtensao],
              ] as const
            ).map(([label, value]) => (
              <span
                key={label}
                className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-500"
              >
                {label}: {value}h
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => !emConflito && onToggleAdicionar?.(turma.id)}
          disabled={emConflito}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 ${
            emConflito
              ? "border border-red-200 bg-red-100/70 text-red-600 cursor-not-allowed opacity-90 shadow-xs"
              : adicionado
              ? "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-300 text-xs cursor-pointer"
              : "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-400 shadow-sm cursor-pointer"
          }`}
        >
          {emConflito ? (
            <>
              <IconeProibido className="h-4 w-4 stroke-2.5" />
              Conflito
            </>
          ) : adicionado ? (
            <>
              <IconeCheck className="h-4 w-4 stroke-3" />
              Adicionado
            </>
          ) : (
            <>
              <IconeMais className="h-4 w-4 stroke-3" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </article>
  );
}