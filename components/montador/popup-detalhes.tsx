"use client";

import { useEffect, useRef } from "react";
import { IconeLivro, IconeMarcador, IconeRelogio, IconeBussola, IconeFechar } from "@/components/icones";
import { DIAS_LONGOS, formatCreditos, formatHora, nomesDocentes, type Disciplina } from "@/lib/montador/disciplina";
import { useFecharComVoltar } from "@/lib/montador/use-fechar-com-voltar";

const TPIE = [
  ["Teoria", "t"],
  ["Prática", "p"],
  ["Individual", "i"],
  ["Extensão", "e"],
] as const;

const chip = "rounded-lg border border-grade-line bg-grade-bg px-2 py-1 font-mono text-[10.5px] font-semibold";
const caixa = "whitespace-pre-line rounded-2xl border border-grade-line bg-grade-bg px-3.5 py-3 text-sm leading-normal";

function Titulo({ icone, children }: { icone: React.ReactNode; children: React.ReactNode }) {
  return (
    <h4 className="mb-2 mt-5 flex items-center gap-2 text-[15px] font-bold">
      <span className="text-grade-accent">{icone}</span>
      {children}
    </h4>
  );
}

type Props = { disciplina: Disciplina | null; open: boolean; onClose: () => void };

export function PopUpDetalhes({ disciplina: d, open, onClose }: Props) {
  const fechar = useRef<HTMLButtonElement>(null);
  useFecharComVoltar(open, onClose);

  useEffect(() => {
    if (!open) return;
    fechar.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#0a1e1a]/45 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="detalhes-titulo"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 z-50 flex justify-center transition-transform duration-300 ease-out ${open ? "translate-y-0" : "pointer-events-none translate-y-[110%]"}`}
      >
        <div className="max-h-[88dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-[26px] border border-grade-line bg-white px-4.5 pb-[calc(22px+env(safe-area-inset-bottom))] pt-5 shadow-[0_-12px_40px_rgba(18,48,43,.18)]">
          {d && (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className={`${chip} border-grade-accent/30 bg-grade-accent/12 text-grade-accent`}>
                    Turma {d.turma}{d.campus && ` · Campus ${d.campus}`}
                  </span>
                  <span className={chip}>{d.turno}</span>
                </div>
                <button
                  ref={fechar}
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar detalhes"
                  className="-mr-1.5 -mt-2 grid size-11 shrink-0 place-items-center rounded-full bg-grade-bg text-grade-mute focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink"
                >
                  <IconeFechar className="size-4.5" />
                </button>
              </div>

              <h3 id="detalhes-titulo" className="mb-1.5 mt-3.5 text-[30px] font-extrabold leading-none tracking-[-0.035em]">
                {d.nome}
              </h3>
              <p className="text-sm font-semibold leading-snug text-grade-mute">
                {nomesDocentes(d).join(", ") || "Docente a definir"}
              </p>

              <div className="mb-1 mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-2xl border border-grade-line bg-grade-bg px-3.5 py-3">
                  <small className="mb-1.5 block font-mono text-[10px] text-grade-mute">Vagas / reserva</small>
                  <b className="text-[15px] font-bold leading-tight">{d.vagas} vagas ({d.reserva} reserva)</b>
                </div>
                <div className="rounded-2xl border border-grade-line bg-grade-bg px-3.5 py-3">
                  <small className="mb-1.5 block font-mono text-[10px] text-grade-mute">Idiomas ofertados</small>
                  <b className="text-[15px] font-bold leading-tight">{d.idiomas.join(", ")}</b>
                </div>
                <div className="col-span-2 rounded-2xl border border-grade-line bg-grade-bg px-3.5 py-3">
                  <div className="mb-2.5 flex items-baseline justify-between gap-2">
                    <small className="font-mono text-[10px] text-grade-mute">Carga horária (TPIE)</small>
                    <b className="text-[15px] font-bold">{formatCreditos(d.creditos)}</b>
                  </div>
                  <dl className="grid grid-cols-4 gap-2">
                    {TPIE.map(([nome, k]) => (
                      <div key={k}>
                        <dt className="font-mono text-[10px] text-grade-mute">{nome}</dt>
                        <dd className="text-xl font-extrabold leading-tight tracking-tight">{d.tpie[k]}h</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <Titulo icone={<IconeRelogio className="size-4.5" />}>Horários</Titulo>
              <ul>
                {d.aulas.map((s) => (
                  <li key={`${s.dia}-${s.inicio}-${s.tipo}-${s.quinzena}`} className="flex items-center justify-between gap-2.5 border-t border-grade-line py-2.5 first:border-t-0 first:pt-0">
                    <div>
                      <b className="block text-sm font-bold">
                        {DIAS_LONGOS[s.dia]}, {formatHora(s.inicio)} às {formatHora(s.inicio + s.duracao)}
                      </b>
                      <span className="text-xs text-grade-mute">{s.docentes.join(", ") || "Docente a definir"}</span>
                    </div>
                    <span className={`${chip} shrink-0`}>
                      {s.tipo ?? "Aula"}{s.quinzena > 0 && ` · Q${s.quinzena}`}
                    </span>
                  </li>
                ))}
              </ul>

              {d.recomendadas.length > 0 && (
                <>
                  <Titulo icone={<IconeBussola className="size-4.5" />}>Disciplinas recomendadas</Titulo>
                  <div className={`${caixa} border-grade-accent/30 bg-grade-accent/10 font-semibold`}>
                    {d.recomendadas.join("\n")}
                  </div>
                </>
              )}
              {d.bibliografiaBasica && (
                <>
                  <Titulo icone={<IconeLivro className="size-4.5" />}>Bibliografia básica</Titulo>
                  <div className={caixa}>{d.bibliografiaBasica}</div>
                </>
              )}
              {d.bibliografiaComplementar && (
                <>
                  <Titulo icone={<IconeMarcador className="size-4.5" />}>Bibliografia complementar</Titulo>
                  <div className={caixa}>{d.bibliografiaComplementar}</div>
                </>
              )}

              <button
                type="button"
                onClick={onClose}
                className="mt-6 min-h-13 w-full rounded-full bg-grade-accent text-[15px] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grade-ink"
              >
                Fechar detalhes
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
