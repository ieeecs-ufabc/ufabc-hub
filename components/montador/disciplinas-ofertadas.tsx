"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { IconeBusca } from "@/components/icones";
import { MenuPesquisa } from "@/components/montador/menu-pesquisa";
import { OcultarConflitos } from "@/components/montador/ocultar-conflitos";
import { PopupMaisInformacoes } from "@/components/montador/popup-mais-informacoes";
import TurmaCardBusca from "@/components/montador/turma-card-busca";
import { paraInformacoesTurma } from "@/lib/montador/informacoes-turma";
import {
  FILTROS_OFERTADAS_INICIAIS,
  filtrarOfertadas,
  prepararTurmasOfertadas,
  type FiltrosOfertadas,
} from "@/lib/montador/ofertadas";
import type { TurmaPropsData } from "@/services/quadrimestre";

const TAMANHO_DO_LOTE = 10;

type DisciplinasOfertadasProps = {
  ativa: boolean;
  onVoltar: () => void;
  turmas: TurmaPropsData[];
};

export function DisciplinasOfertadas({ ativa, onVoltar, turmas }: DisciplinasOfertadasProps) {
  const [filtros, setFiltros] = useState<FiltrosOfertadas>(FILTROS_OFERTADAS_INICIAIS);
  const [ocultarConflitos, setOcultarConflitos] = useState(true);
  const [quantidade, setQuantidade] = useState(TAMANHO_DO_LOTE);
  const [turmaDetalhada, setTurmaDetalhada] = useState<TurmaPropsData | null>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const fimDaListaRef = useRef<HTMLDivElement>(null);

  const turmasOrdenadas = useMemo(() => prepararTurmasOfertadas(turmas), [turmas]);
  const filtrosAdiados = useDeferredValue(filtros);
  const resultado = useMemo(
    () => filtrarOfertadas(turmasOrdenadas, filtrosAdiados),
    [turmasOrdenadas, filtrosAdiados],
  );
  const visiveis = resultado.slice(0, quantidade);
  const temMais = quantidade < resultado.length;

  const informacoes = useMemo(
    () => (turmaDetalhada ? paraInformacoesTurma(turmaDetalhada) : null),
    [turmaDetalhada],
  );

  useEffect(() => {
    if (ativa) tituloRef.current?.focus({ preventScroll: true });
  }, [ativa]);

  useEffect(() => {
    const fimDaLista = fimDaListaRef.current;
    if (!fimDaLista || !temMais) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setQuantidade((atual) => atual + TAMANHO_DO_LOTE);
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );
    observador.observe(fimDaLista);

    return () => observador.disconnect();
  }, [temMais, quantidade]);

  function mudarFiltros(novosFiltros: FiltrosOfertadas) {
    setFiltros(novosFiltros);
    setQuantidade(TAMANHO_DO_LOTE);
  }

  function abrirInformacoes(id: string) {
    setTurmaDetalhada(turmas.find((turma) => turma.id === id) ?? null);
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col gap-3 px-4 pt-4">
      <header className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
          <IconeBusca className="size-3.5" />
        </span>
        <h2
          ref={tituloRef}
          tabIndex={-1}
          className="text-sm font-bold text-slate-800 focus:outline-none"
        >
          Disciplinas Ofertadas
        </h2>
      </header>

      <div className="flex flex-col gap-2">
        <MenuPesquisa value={filtros} onChange={mudarFiltros} />
        <OcultarConflitos value={ocultarConflitos} onChange={setOcultarConflitos} />
      </div>

      <p role="status" className="sr-only">
        {resultado.length === 1
          ? "1 turma encontrada"
          : `${resultado.length.toLocaleString("pt-BR")} turmas encontradas`}
      </p>

      {turmas.length === 0 ? (
        <EstadoVazio
          titulo="Nenhuma turma ofertada"
          texto="Ainda não há turmas cadastradas para o quadrimestre atual."
        />
      ) : resultado.length === 0 ? (
        <EstadoVazio
          titulo="Nenhuma turma encontrada"
          texto="Tente outro nome, código ou professor, ou mude o campus e o turno."
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {visiveis.map(({ turma }) => (
            <li key={turma.id}>
              <TurmaCardBusca turma={turma} onInfo={abrirInformacoes} />
            </li>
          ))}
        </ul>
      )}

      {temMais && (
        <div ref={fimDaListaRef} aria-hidden="true">
          <CardEsqueleto />
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 mt-auto bg-white px-4 pt-3 pb-6">
        <button
          type="button"
          onClick={onVoltar}
          className="h-9 w-full cursor-pointer rounded-xl bg-slate-100 text-xs font-bold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
        >
          Concluir e Voltar
        </button>
      </div>

      <PopupMaisInformacoes turma={informacoes} onFechar={() => setTurmaDetalhada(null)} />
    </div>
  );
}

type EstadoVazioProps = {
  titulo: string;
  texto: string;
};

function EstadoVazio({ titulo, texto }: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center">
      <span className="mb-2 grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        <IconeBusca className="size-4" />
      </span>
      <p className="text-sm font-bold text-slate-700">{titulo}</p>
      <p className="text-xs text-slate-400">{texto}</p>
    </div>
  );
}

function CardEsqueleto() {
  return (
    <div className="w-full animate-pulse rounded-xl border border-slate-200 bg-white p-6 motion-reduce:animate-none">
      <div className="flex gap-2">
        <div className="h-7 w-20 rounded-xl bg-slate-100" />
        <div className="h-7 w-24 rounded-xl bg-slate-100" />
      </div>
      <div className="mt-5 h-6 w-3/4 rounded-lg bg-slate-200" />
      <div className="mt-2 h-4 w-1/2 rounded-lg bg-slate-100" />
      <div className="mt-4 h-20 rounded-2xl bg-slate-50" />
      <div className="mt-5 h-9 rounded-xl bg-slate-100" />
    </div>
  );
}
