"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { IconeAlerta, IconeBusca, IconeCheck, IconeSetaBaixo } from "@/components/icones";
import { PopUpDetalhes } from "./popup-detalhes";
import { TurmaBuscaCard } from "./turma-busca-card";
import { getEstado } from "@/lib/montador/conflitos";
import { nomesDocentes, type Disciplina } from "@/lib/montador/disciplina";

const TODOS = "todos";
const TAMANHO_DO_LOTE = 10;

const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const unicos = (xs: string[]) => [...new Set(xs.filter(Boolean))].sort();
const ordemAlfabetica = new Intl.Collator("pt-BR", { numeric: true });

function Opcoes({ legenda, valor, opcoes, onChange }: { legenda: string; valor: string; opcoes: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[10px] text-grade-mute">{legenda}</p>
      <div role="radiogroup" aria-label={legenda} className="flex flex-wrap gap-1.5">
        {[TODOS, ...opcoes].map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={valor === o}
            onClick={() => onChange(o)}
            className={`min-h-10 rounded-full border px-3.5 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink ${
              valor === o ? "border-grade-accent bg-grade-accent text-white" : "border-grade-line bg-grade-bg text-grade-mute"
            }`}
          >
            {o === TODOS ? "Todos" : o}
          </button>
        ))}
      </div>
    </div>
  );
}

function SeletorCurso({ valor, cursos, onChange }: { valor: string; cursos: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] text-grade-mute">Curso</span>
      <span className="relative block">
        <select
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 w-full appearance-none truncate rounded-full border bg-grade-bg pl-4 pr-10 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink ${
            valor === TODOS ? "border-grade-line text-grade-mute" : "border-grade-accent text-grade-ink"
          }`}
        >
          <option value={TODOS}>Todos os cursos</option>
          {cursos.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-grade-mute">
          <IconeSetaBaixo className="size-4" />
        </span>
      </span>
    </label>
  );
}

function Vazio({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-[14px] border border-dashed border-grade-line p-6 text-center text-sm text-grade-mute">
      {children}
    </p>
  );
}

function CardEsqueleto() {
  return (
    <div className="mt-2.5 animate-pulse rounded-[14px] border border-grade-line bg-grade-surface p-3.5 motion-reduce:animate-none">
      <div className="h-5 w-3/4 rounded-md bg-grade-line" />
      <div className="mt-2.5 flex gap-1">
        <div className="h-5 w-16 rounded-md bg-grade-line/70" />
        <div className="h-5 w-20 rounded-md bg-grade-line/70" />
      </div>
      <div className="mt-3 h-20 rounded-xl bg-grade-bg" />
      <div className="mt-3.5 h-12 rounded-full bg-grade-line/70" />
    </div>
  );
}

type Props = {
  ativa: boolean;
  disciplinas: Disciplina[]; 
  naGrade: Disciplina[]; 
  onAdicionar: (d: Disciplina) => void;
  onRemover: (d: Disciplina) => void;
  onVoltar: () => void;
};

export function BuscaDisciplinas({ ativa, disciplinas, naGrade, onAdicionar, onRemover, onVoltar }: Props) {
  const [busca, setBusca] = useState("");
  const [turno, setTurno] = useState(TODOS);
  const [campus, setCampus] = useState(TODOS);
  const [curso, setCurso] = useState(TODOS);
  const [ocultarConflitos, setOcultarConflitos] = useState(true);
  const [quantidade, setQuantidade] = useState(TAMANHO_DO_LOTE);
  const [detalhe, setDetalhe] = useState<Disciplina | null>(null);
  const [aberto, setAberto] = useState(false);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const fimDaListaRef = useRef<HTMLDivElement>(null);

  const buscaAdiada = useDeferredValue(busca);

  const turnos = useMemo(() => unicos(disciplinas.map((d) => d.turno)), [disciplinas]);
  const campi = useMemo(() => unicos(disciplinas.map((d) => d.campus)), [disciplinas]);
  const cursos = useMemo(() => unicos(disciplinas.map((d) => d.curso)).sort(ordemAlfabetica.compare), [disciplinas]);

  // Ordena e normaliza o texto de busca uma única vez.
  const indice = useMemo(
    () =>
      disciplinas
        .map((d) => ({
          d,
          alvo: semAcento(`${d.nome} ${d.codigo} ${d.sigla} ${d.turma} ${nomesDocentes(d).join(" ")}`),
        }))
        .sort((a, b) => ordemAlfabetica.compare(a.d.nome, b.d.nome) || ordemAlfabetica.compare(a.d.turma, b.d.turma)),
    [disciplinas],
  );

  const filtradas = useMemo(() => {
    const termos = semAcento(buscaAdiada).split(/\s+/).filter(Boolean);
    return indice
      .filter(
        ({ d }) =>
          (turno === TODOS || d.turno === turno) &&
          (campus === TODOS || d.campus === campus) &&
          (curso === TODOS || d.curso === curso),
      )
      .filter(({ alvo }) => termos.every((t) => alvo.includes(t)))
      .map(({ d }) => d);
  }, [indice, buscaAdiada, turno, campus, curso]);

  const { resultados, ocultas } = useMemo(() => {
    if (!ocultarConflitos) return { resultados: filtradas, ocultas: 0 };
    let ocultas = 0;
    const resultados = filtradas.filter((d) => {
      const { tipo } = getEstado(d, naGrade, true);
      if (tipo === "duplicada") return false;
      if (tipo === "conflito") {
        ocultas++;
        return false;
      }
      return true;
    });
    return { resultados, ocultas };
  }, [filtradas, naGrade, ocultarConflitos]);

  const visiveis = resultados.slice(0, quantidade);
  const temMais = quantidade < resultados.length;

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

  const mudar = <T,>(set: (v: T) => void) => (v: T) => { set(v); setQuantidade(TAMANHO_DO_LOTE); };

  const filtrosAlterados = turno !== TODOS || campus !== TODOS || curso !== TODOS || !ocultarConflitos;
  const limparFiltros = () => {
    setCurso(TODOS);
    setTurno(TODOS);
    setCampus(TODOS);
    setOcultarConflitos(true);
    setQuantidade(TAMANHO_DO_LOTE);
  };

  const abrir = useCallback((d: Disciplina) => { setDetalhe(d); setAberto(true); }, []);
  const fechar = useCallback(() => setAberto(false), []);

  return (
    <main className="mx-auto w-full max-w-lg px-3 pb-12">
      <header className="sticky top-0 z-30 -mx-3 bg-grade-bg/90 px-3 pb-3 pt-[calc(14px+env(safe-area-inset-top))] backdrop-blur">
        <div className="mb-3 flex items-end justify-between px-1">
          <h1
            ref={tituloRef}
            tabIndex={-1}
            className="text-[40px] font-extrabold leading-[.9] tracking-[-0.04em] focus:outline-none"
          >
            Buscar
          </h1>
          <button
            type="button"
            onClick={onVoltar}
            className="flex min-h-11 items-center rounded-full border border-grade-line bg-grade-surface px-4 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink"
          >
            Ver grade ({naGrade.length})
          </button>
        </div>
        <label className="relative block">
          <span className="sr-only">Buscar por disciplina, código, sigla, turma ou professor</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-grade-mute h-12"><IconeBusca /></span>
          <input
            type="search"
            value={busca}
            onChange={(e) => mudar(setBusca)(e.target.value)}
            placeholder="Disciplina, código ou professor"
            enterKeyHint="search"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-grade-line bg-grade-surface pl-11 pr-4 text-[15px] placeholder:text-grade-mute focus-visible:outline-2 focus-visible:outline-grade-accent"
          />
        </label>
      </header>

      <section aria-label="Filtros" className="mt-1 grid gap-3.5 rounded-[18px] border border-grade-line bg-grade-surface p-3.5">

        <SeletorCurso valor={curso} cursos={cursos} onChange={mudar(setCurso)} />
        <Opcoes legenda="Turno" valor={turno} opcoes={turnos} onChange={mudar(setTurno)} />
        <Opcoes legenda="Campus" valor={campus} opcoes={campi} onChange={mudar(setCampus)} />
          <div className="-mb-1 flex justify-end">
            <button
              type="button"
              onClick={limparFiltros}
              className="min-h-9 rounded-full border border-grade-line bg-grade-bg px-3.5 text-[12px] font-semibold text-grade-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink"
            >
              Limpar filtros
            </button>
          </div>
       </section>

      <section
        aria-label="Conflitos de horário"
        className={`mt-3 flex items-center gap-3 rounded-[18px] border bg-grade-surface p-3.5 transition-colors motion-reduce:transition-none ${
          ocultarConflitos ? "border-grade-line" : "border-grade-danger/30"
        }`}
      >
        <span
          aria-hidden="true"
          className={`grid size-11 shrink-0 place-items-center rounded-xl ${
            ocultarConflitos ? "bg-grade-accent/12 text-grade-accent" : "bg-grade-danger/12 text-grade-danger"
          }`}
        >
          {ocultarConflitos ? <IconeCheck className="size-5" /> : <IconeAlerta className="size-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p id="rotulo-conflitos" className="text-sm font-bold leading-tight">Ocultar conflitos</p>
          <p
            id="descricao-conflitos"
            className={`mt-0.5 text-xs leading-snug ${ocultarConflitos ? "text-grade-mute" : "font-semibold text-grade-danger"}`}
          >
            {!ocultarConflitos
              ? "Exibindo turmas com conflito"
              : ocultas === 0
                ? "Nenhuma turma com conflito de horário"
                : `${ocultas.toLocaleString("pt-BR")} ${ocultas === 1 ? "turma oculta" : "turmas ocultas"} por conflito`}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={ocultarConflitos}
          aria-labelledby="rotulo-conflitos"
          aria-describedby="descricao-conflitos"
          onClick={() => mudar(setOcultarConflitos)(!ocultarConflitos)}
          className={`relative h-8 w-14 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink motion-reduce:transition-none ${
            ocultarConflitos ? "bg-grade-accent" : "bg-grade-line"
          }`}
        >
          <span className={`absolute left-1 top-1 size-6 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${ocultarConflitos ? "translate-x-6" : ""}`} />
        </button>
      </section>

      <p aria-live="polite" className="mx-1 mb-2 mt-4 text-[13px] font-semibold text-grade-mute">
        {resultados.length.toLocaleString("pt-BR")} {resultados.length === 1 ? "turma" : "turmas"}
      </p>

      {disciplinas.length === 0 ? (
        <Vazio>Ainda não há turmas cadastradas para o quadrimestre atual.</Vazio>
      ) : resultados.length === 0 ? (
        <Vazio>Nenhuma turma encontrada. Tente outro nome, limpe os filtros de curso, turno e campus{ocultas > 0 && " ou desative o ocultar conflitos"}.</Vazio>
      ) : (
        <ul className="grid gap-2.5">
          {visiveis.map((d) => (
            <TurmaBuscaCard
              key={d.id}
              disciplina={d}
              estado={getEstado(d, naGrade, true)}
              onInfo={abrir}
              onAdicionar={onAdicionar}
              onRemover={onRemover}
            />
          ))}
        </ul>
      )}

      {temMais && (
        <div ref={fimDaListaRef} aria-hidden="true">
          <CardEsqueleto />
        </div>
      )}

      <PopUpDetalhes disciplina={detalhe} open={aberto} onClose={fechar} />
    </main>
  );
}