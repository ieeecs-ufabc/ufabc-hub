"use client";

import { useId, useState, type ComponentType } from "react";
import {
  IconeAlerta,
  IconeCheck,
  IconeCreditos,
  IconeInfo,
  IconeLocal,
  IconeLua,
  IconeMais,
  IconeProibido,
  IconeSetaBaixo,
  IconeSol,
  IconeUsuario,
} from "@/components/icones";
import {
  formatarCreditos,
  formatarDiaSemana,
  formatarHorario,
  formatarNomeDiaSemana,
  formatarPeriodicidade,
  formatarTurno,
} from "@/lib/montador/formatar";
import { horariosUnicos, nomesDocentes } from "@/lib/montador/ofertadas";
import type { TurmaPropsData } from "@/services/quadrimestre";

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
  const { disciplina } = turma;
  const idHorarios = useId();

  const emConflito = status === "conflito";
  const adicionado = status === "adicionada";
  const conflitos = emConflito ? detalhesConflitos : [];

  const [mostrarHorarios, setMostrarHorarios] = useState(true);
  const [emConflitoAnterior, setEmConflitoAnterior] = useState(emConflito);
  if (emConflito !== emConflitoAnterior) {
    setEmConflitoAnterior(emConflito);
    if (emConflito) setMostrarHorarios(true);
  }

  const docentes = nomesDocentes(turma);
  const horarios = horariosUnicos(turma);

  const nomeTurno = formatarTurno(String(turma.turno));
  const configTurno = turnoStyles[nomeTurno] ?? turnoStyles.Matutino;
  const TurnoIcon = configTurno.icon;

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
            <IconeCreditos className="size-4" />
            {formatarCreditos(disciplina.creditos)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onInfo?.(turma.id)}
          aria-label={`Mais informações sobre ${disciplina.nome}`}
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
        >
          <IconeInfo className="size-4" />
        </button>
      </div>

      <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-900">
        {disciplina.nome}
      </h3>

      <div className="mt-1 flex items-start gap-1.5 text-base font-medium text-slate-400">
        <IconeUsuario className="mt-1 size-4 shrink-0" />
        <div className="flex min-w-0 flex-col gap-0.5">
          {docentes.length > 0 ? (
            docentes.map((nomeDocente) => <p key={nomeDocente}>{nomeDocente}</p>)
          ) : (
            <p>A definir</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
          <IconeLocal className="size-4 text-slate-400" />
          {turma.campus}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${configTurno.box}`}
        >
          <TurnoIcon className={`size-4 ${configTurno.iconColor}`} />
          {nomeTurno}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-3">
        <button
          type="button"
          onClick={() => setMostrarHorarios((aberto) => !aberto)}
          aria-expanded={mostrarHorarios}
          aria-controls={idHorarios}
          className="group flex w-full cursor-pointer items-center justify-between rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase transition-colors group-hover:text-slate-700">
            Horários das aulas ({horarios.length})
          </span>
          <IconeSetaBaixo
            className={`size-4 text-slate-400 transition-transform duration-300 group-hover:text-slate-600 motion-reduce:transition-none ${
              mostrarHorarios ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          id={idHorarios}
          inert={!mostrarHorarios}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            mostrarHorarios ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="flex flex-col gap-2 pt-3">
              {horarios.map((horario) => {
                const conflitante = conflitos.some(
                  (conflito) =>
                    conflito.horarioIdConflitante === horario.id ||
                    (conflito.diaSemana === horario.diaSemana &&
                      conflito.horarioInicio === horario.horarioInicio),
                );

                return (
                  <li
                    key={horario.id}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 transition-all ${
                      conflitante
                        ? "border-red-200 bg-red-50/60 ring-1 ring-red-200/50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-extrabold text-white ${
                          conflitante ? "bg-red-600" : "bg-slate-900"
                        }`}
                      >
                        {formatarDiaSemana(horario.diaSemana)}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          conflitante ? "text-red-900" : "text-slate-700"
                        }`}
                      >
                        {formatarHorario(horario.horarioInicio)} às{" "}
                        {formatarHorario(horario.horarioTermino)}
                      </span>
                    </div>

                    {conflitante ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-100/70 px-3 py-1 text-xs font-bold text-red-700">
                        <IconeAlerta className="size-3.5" />
                        Conflito
                      </span>
                    ) : (
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600">
                        {formatarPeriodicidade(horario.periodicidade)}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {conflitos.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {conflitos.map((conflito, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-900"
            >
              <IconeAlerta className="mt-0.5 size-4 shrink-0 text-red-600" />
              <p className="leading-relaxed">
                <span className="font-bold">Conflito de horário:</span> Coincide com{" "}
                <span className="cursor-pointer font-bold underline">
                  {conflito.disciplinaNome}
                </span>{" "}
                na {formatarNomeDiaSemana(conflito.diaSemana)} (
                {formatarHorario(conflito.horarioInicio)} às{" "}
                {formatarHorario(conflito.horarioTermino)}){" "}
                <span className="font-bold">{formatarPeriodicidade(conflito.periodicidade)}</span>.
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          Carga horária (T-P-I-E)
        </p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-wrap gap-2">
            {(
              [
                ["T", disciplina.horasTeoria],
                ["P", disciplina.horasPratica],
                ["I", disciplina.horasIndividuais],
                ["E", disciplina.horasExtensao],
              ] as const
            ).map(([rotulo, horas]) => (
              <span
                key={rotulo}
                className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold whitespace-nowrap text-slate-500"
              >
                {rotulo}: {horas}h
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => !emConflito && onToggleAdicionar?.(turma.id)}
            disabled={emConflito}
            className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 ${
              emConflito
                ? "cursor-not-allowed border border-red-200 bg-red-100/70 text-red-600 opacity-90 shadow-xs"
                : adicionado
                  ? "cursor-pointer border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-300"
                  : "cursor-pointer bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-400"
            }`}
          >
            {emConflito ? (
              <>
                <IconeProibido className="size-4 stroke-[2.5]" />
                Conflito
              </>
            ) : adicionado ? (
              <>
                <IconeCheck className="size-4 stroke-3" />
                Adicionado
              </>
            ) : (
              <>
                <IconeMais className="size-4 stroke-3" />
                Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
