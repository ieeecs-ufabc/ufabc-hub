"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  IconeBussola,
  IconeFechar,
  IconeLivro,
  IconeMarcador,
} from "@/components/icones";

export type InformacoesTurma = {
  turma: string;
  campus: string;
  nome: string;
  professor: string;
  vagas: number;
  vagasReserva: number;
  idiomas: string[];
  disciplinasRecomendadas: string[];
  bibliografiaBasica: string[];
  bibliografiaComplementar: string[];
};

type PopupMaisInformacoesProps = {
  turma: InformacoesTurma | null;
  onFechar: () => void;
};

export function PopupMaisInformacoes({ turma, onFechar }: PopupMaisInformacoesProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tituloId = useId();
  const aberto = turma !== null;

  const [turmaExibida, setTurmaExibida] = useState(turma);
  if (turma !== null && turma !== turmaExibida) {
    setTurmaExibida(turma);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!aberto || !dialog) return;

    dialog.showModal();

    const html = document.documentElement;
    const overflowAnterior = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = overflowAnterior;
      dialog.close();
    };
  }, [aberto]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={tituloId}
      onCancel={(evento) => {
        evento.preventDefault();
        onFechar();
      }}
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) onFechar();
      }}
      className="fixed inset-x-0 top-auto bottom-0 mx-auto max-h-[85dvh] w-full max-w-md overflow-y-auto overscroll-contain rounded-t-3xl border-t border-slate-100 bg-white text-slate-900 translate-y-full transition-[translate,overlay,display] transition-discrete duration-300 ease-out open:translate-y-0 starting:open:translate-y-full backdrop:bg-slate-900/40 backdrop:opacity-0 backdrop:transition-[opacity,overlay,display] backdrop:transition-discrete backdrop:duration-300 open:backdrop:opacity-100 starting:open:backdrop:opacity-0 motion-reduce:transition-none motion-reduce:backdrop:transition-none"
    >
      {turmaExibida && (
        <div className="relative px-5 pt-5.5 pb-5">
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="absolute top-4 right-4 grid size-8 cursor-pointer place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
          >
            <IconeFechar className="size-4" />
          </button>

          <span className="inline-flex h-5 items-center rounded-md border border-emerald-200/50 bg-emerald-100/80 px-2.5 text-[9px] font-bold tracking-wide text-emerald-800 uppercase">
            {turmaExibida.turma} • Campus {turmaExibida.campus}
          </span>

          <h2 id={tituloId} className="mt-2 text-xl font-extrabold">
            {turmaExibida.nome}
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-500">{turmaExibida.professor}</p>

          <dl className="mt-5 grid grid-cols-2 gap-2.5">
            <Informacao
              rotulo="Vagas / Reserva"
              valor={formatarVagas(turmaExibida.vagas, turmaExibida.vagasReserva)}
            />
            <Informacao
              rotulo="Idiomas ofertados"
              valor={turmaExibida.idiomas.length > 0 ? turmaExibida.idiomas.join(", ") : "Não informado"}
            />
          </dl>

          {turmaExibida.disciplinasRecomendadas.length > 0 && (
            <section className="mt-3 rounded-2xl border border-amber-200/80 bg-amber-50 p-4">
              <h3 className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <IconeBussola className="size-3.5 shrink-0 text-amber-700" />
                Disciplinas Recomendadas
              </h3>
              <ul className="mt-2 pl-5.5 text-xs text-amber-800">
                {turmaExibida.disciplinasRecomendadas.map((disciplina) => (
                  <li key={disciplina}>{disciplina}</li>
                ))}
              </ul>
            </section>
          )}

          <Bibliografia
            titulo="Bibliografia Básica"
            icone={<IconeLivro className="size-3.5 shrink-0 text-emerald-800" />}
            referencias={turmaExibida.bibliografiaBasica}
          />
          <Bibliografia
            titulo="Bibliografia Complementar"
            icone={<IconeMarcador className="size-3.5 shrink-0 text-emerald-800" />}
            referencias={turmaExibida.bibliografiaComplementar}
          />

          <button
            type="button"
            onClick={onFechar}
            className="mt-5 h-11 w-full cursor-pointer rounded-2xl bg-emerald-600 text-xs font-bold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
          >
            Fechar Detalhes
          </button>
        </div>
      )}
    </dialog>
  );
}

type InformacaoProps = {
  rotulo: string;
  valor: string;
};

function Informacao({ rotulo, valor }: InformacaoProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5">
      <dt className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">{rotulo}</dt>
      <dd className="mt-2 text-xs font-bold">{valor}</dd>
    </div>
  );
}

type BibliografiaProps = {
  titulo: string;
  icone: ReactNode;
  referencias: string[];
};

function Bibliografia({ titulo, icone, referencias }: BibliografiaProps) {
  return (
    <section className="mt-3">
      <h3 className="flex items-center gap-2 text-xs font-bold">
        {icone}
        {titulo}
      </h3>
      <div className="mt-2.5 rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5 text-xs leading-5 text-slate-700">
        {referencias.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {referencias.map((referencia) => (
              <li key={referencia}>{referencia}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">Não informada.</p>
        )}
      </div>
    </section>
  );
}

function formatarVagas(vagas: number, vagasReserva: number) {
  const total = `${vagas} ${vagas === 1 ? "Vaga" : "Vagas"}`;
  return vagasReserva > 0 ? `${total} (${vagasReserva} Reserva)` : total;
}
