"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BuscaDisciplinas } from "@/components/montador/busca-disciplinas";
import { GrandeMontador } from "@/components/montador/grade-montador";
import { PopUpConflito } from "@/components/montador/popup-conflito";
import { CORES, toDisciplina } from "@/lib/montador/disciplina";
import {
  escreverIdsNaUrl,
  lerIdsDaUrl,
  lerIdsSalvos,
  mesmasTurmas,
  salvarIds,
} from "@/lib/montador/turmas-url";
import { useFecharComVoltar } from "@/lib/montador/use-fechar-com-voltar";
import type { TurmaPropsData } from "@/services/quadrimestre";

type TurmaNaGrade = { id: string; cor: number };
type Conflito = { antigas: string[]; novas: string[] }; // códigos de turma

const paraGrade = (ids: string[]): TurmaNaGrade[] =>
  ids.map((id, i) => ({ id, cor: i % CORES.length }));

export function TelasMontador({ turmas }: { turmas: TurmaPropsData[] }) {
  const [pesquisando, setPesquisando] = useState(false);
  const [grade, setGrade] = useState<TurmaNaGrade[]>([]);
  const origemDoFoco = useRef<HTMLElement | null>(null);
  const iniciou = useRef(false);

  const [pronto, setPronto] = useState(false);
  const [conflito, setConflito] = useState<Conflito | null>(null);

  const todas = useMemo(() => turmas.map((turma) => toDisciplina(turma)), [turmas]);
  const porId = useMemo(() => new Map(todas.map((d) => [d.id, d])), [todas]);

  const porCodigo = useMemo(
    () => new Map(todas.map((d) => [d.codigoTurma.toUpperCase(), d])),
    [todas],
  );

  const naGrade = useMemo(
    () =>
      grade.flatMap(({ id, cor }) => {
        const d = porId.get(id);
        return d ? [{ ...d, cor }] : [];
      }),
    [grade, porId],
  );

  useEffect(() => {
    if (iniciou.current) return;
    iniciou.current = true;

    const validos = (codigos: string[]) => [
      ...new Set(codigos.flatMap((c) => porCodigo.get(c.toUpperCase())?.codigoTurma ?? [])),
    ];
    const daUrl = validos(lerIdsDaUrl());
    const salvas = validos(lerIdsSalvos());

    if (daUrl.length > 0 && salvas.length > 0 && !mesmasTurmas(daUrl, salvas)) {
      setConflito({ antigas: salvas, novas: daUrl });
    } else {
      setGrade(paraGrade(idsDosCodigos(daUrl.length > 0 ? daUrl : salvas)));
    }
    setPronto(true);
  }, [porCodigo]);

  useEffect(() => {
    if (!pronto || conflito) return;
    const codigos = grade.flatMap((g) => porId.get(g.id)?.codigoTurma ?? []);
    salvarIds(codigos);
    escreverIdsNaUrl(codigos);

    const manterUrlAtualizada = () => escreverIdsNaUrl(codigos);
    window.addEventListener("popstate", manterUrlAtualizada);
    return () => window.removeEventListener("popstate", manterUrlAtualizada);
  }, [grade, pronto, conflito, porId]);

  const idsDosCodigos = (codigos: string[]) =>
    codigos.flatMap((c) => porCodigo.get(c.toUpperCase())?.id ?? []);

  function resolverConflito(manter: "antigas" | "novas") {
    if (!conflito) return;
    setGrade(paraGrade(idsDosCodigos(conflito[manter])));
    setConflito(null);
  }

  function adicionar(id: string) {
    setGrade((atual) => {
      if (atual.some((g) => g.id === id)) return atual;
      const usadas = new Set(atual.map((g) => g.cor));
      const livre = CORES.findIndex((_, i) => !usadas.has(i));
      return [...atual, { id, cor: livre >= 0 ? livre : atual.length % CORES.length }];
    });
  }

  function remover(id: string) {
    setGrade((atual) => atual.filter((g) => g.id !== id));
  }

  function abrirPesquisa() {
    if (document.activeElement instanceof HTMLElement) {
      origemDoFoco.current = document.activeElement;
    }
    setPesquisando(true);
  }

  function fecharPesquisa() {
    setPesquisando(false);
  }

  useFecharComVoltar(pesquisando, fecharPesquisa);

  useEffect(() => {
    if (!pesquisando) return;

    const html = document.documentElement;
    const overflowAnterior = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = overflowAnterior;
    };
  }, [pesquisando]);

  useEffect(() => {
    if (pesquisando) return;

    origemDoFoco.current?.focus({ preventScroll: true });
    origemDoFoco.current = null;
  }, [pesquisando]);

  return (
    <div data-pesquisando={pesquisando}>
      <div
        inert={pesquisando || conflito !== null}
        className={`relative transition-[left] duration-300 ease-out motion-reduce:transition-none ${
          pesquisando ? "-left-full" : "left-0"
        }`}
      >
        <GrandeMontador
          disciplinas={naGrade}
          onRemover={remover}
          onDesfazer={adicionar}
          onAdicionarTurma={abrirPesquisa}
        />
      </div>

      <div
        inert={!pesquisando || conflito !== null}
        className={`fixed inset-0 z-20 overflow-y-auto overscroll-contain bg-grade-bg transition-[translate,visibility] duration-300 ease-out motion-reduce:transition-none ${
          pesquisando ? "" : "invisible translate-x-full"
        }`}
      >
        <BuscaDisciplinas
          ativa={pesquisando}
          disciplinas={todas}
          naGrade={naGrade}
          onAdicionar={(d) => adicionar(d.id)}
          onRemover={(d) => remover(d.id)}
          onVoltar={fecharPesquisa}
        />
      </div>

      {conflito && (
        <PopUpConflito
          antigas={conflito.antigas.flatMap((c) => porCodigo.get(c.toUpperCase()) ?? [])}
          novas={conflito.novas.flatMap((c) => porCodigo.get(c.toUpperCase()) ?? [])}
          onManterAntigas={() => resolverConflito("antigas")}
          onManterNovas={() => resolverConflito("novas")}
        />
      )}
    </div>
  );
}
