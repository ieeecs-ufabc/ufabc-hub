"use client";

import { useCallback, useEffect, useState } from "react";
import { TurmaCard } from "./turma-card";
import { Grade, type Filtro } from "./grade";
import { MenuInferior } from "./menu-inferior";
import { PopUpDetalhes } from "./popup-detalhes";
import type { Disciplina } from "@/lib/montador/disciplina";

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "all", label: "Grade completa" },
  { id: "1", label: "Quinzenal I" },
  { id: "2", label: "Quinzenal II" },
];

const tag = "rounded-[5px] bg-grade-line px-1.5 py-0.5 font-mono text-[10px] font-semibold text-grade-ink";

type Props = {
  disciplinas: Disciplina[];
  quadrimestre?: string; 
  onRemover: (turmaId: string) => void;
  onDesfazer: (turmaId: string) => void;
  onAdicionarTurma: () => void;
};

export function GrandeMontador({ disciplinas, quadrimestre, onRemover, onDesfazer, onAdicionarTurma }: Props) {
  const [filtro, setFiltro] = useState<Filtro>("all");
  const [detalhe, setDetalhe] = useState<Disciplina | null>(null);
  const [aberto, setAberto] = useState(false);
  const [desfazer, setDesfazer] = useState<Disciplina | null>(null);

  const totalCreditos = disciplinas.reduce((soma, d) => soma + d.creditos, 0);

  const abrir = useCallback((d: Disciplina) => {
    setDetalhe(d);
    setAberto(true);
  }, []);

  const fechar = useCallback(() => setAberto(false), []);

  function remover(d: Disciplina) {
    setAberto(false);
    setDesfazer(d);
    onRemover(d.id);
  }

  function adicionarTurma() {
    setDesfazer(null);
    onAdicionarTurma();
  }

  useEffect(() => {
    if (!desfazer) return;
    const t = setTimeout(() => setDesfazer(null), 5000);
    return () => clearTimeout(t);
  }, [desfazer]);

  return (
    <main className="mx-auto w-full max-w-lg px-3 pb-28 pt-[calc(18px+env(safe-area-inset-top))]">
      <header className="flex items-end justify-between px-1 pb-3.5">
        <div className="flex items-start gap-2">
          <h1 className="text-[44px] font-extrabold leading-[.9] tracking-[-0.04em]">Grade</h1>
          <span className="text-xs font-bold text-grade-mute">BETA</span>
        </div>
          {quadrimestre && (
            <div className="flex flex-col items-end">
                <span className="text-right font-mono text-[11px] leading-normal text-grade-mute">
                  Quadrimestre
                </span>
                <span className="text-right font-mono text-[11px] leading-normal text-grade font-bold">
                  {quadrimestre}
                </span>
            </div>
        )}
      </header>

      <div role="tablist" className="mb-3 grid grid-cols-3 gap-1 rounded-full border border-grade-line bg-grade-surface p-1">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            aria-selected={filtro === f.id}
            onClick={() => setFiltro(f.id)}
            className={`rounded-full px-1 py-2.5 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink ${
              filtro === f.id ? "bg-grade-accent text-white" : "text-grade-mute"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Grade disciplinas={disciplinas} filtro={filtro} onSelect={abrir} />

      <p className="mx-1 mt-3 flex flex-wrap items-center gap-1.5 text-xs text-grade-mute">
        <i className={`${tag} not-italic`}>Q1</i>
        <i className={`${tag} not-italic`}>Q2</i>
        quinzenal I e II
      </p>

      <section className="mt-4.5 grid gap-2">
        <h2 className="px-1 text-[15px] font-semibold text-grade-mute">Disciplinas</h2>
        {disciplinas.length === 0 ? (
          <p className="p-4.5 text-center text-sm text-grade-mute">Nenhuma disciplina na grade.</p>
        ) : (
          <ul className="grid gap-2">
            {disciplinas.map((d) => (
              <TurmaCard key={d.id} disciplina={d} onDetalhes={abrir} onRemover={remover} />
            ))}
          </ul>
        )}
      </section>

      <PopUpDetalhes disciplina={detalhe} open={aberto} onClose={fechar} />

      <MenuInferior totalCreditos={totalCreditos} onAdicionarTurma={adicionarTurma} />

      <div
        role="status"
        className={`fixed inset-x-3 bottom-[calc(84px+env(safe-area-inset-bottom))] z-60 mx-auto flex max-w-124 items-center justify-between gap-2.5 rounded-[14px] bg-grade-ink py-2.5 pl-4 pr-2.5 text-sm font-semibold text-grade-bg transition-transform duration-300 ${
          desfazer ? "translate-y-0" : "translate-y-[260%]"
        }`}
      >
        <span>{desfazer?.sigla} removida da grade</span>
        <button
          type="button"
          onClick={() => {
            if (desfazer) onDesfazer(desfazer.id);
            setDesfazer(null);
          }}
          className="min-h-10 rounded-[10px] bg-grade-accent px-3.5 font-extrabold text-white"
        >
          Desfazer
        </button>
      </div>
    </main>
  );
}