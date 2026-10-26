"use client";

import { useEffect, useRef, useState } from "react";
import { IconeBusca } from "@/components/icones";
import { MenuPesquisa } from "@/components/montador/menu-pesquisa";
import {
  FILTROS_OFERTADAS_INICIAIS,
  type FiltrosOfertadas,
} from "@/lib/montador/ofertadas";

type DisciplinasOfertadasProps = {
  ativa: boolean;
  onVoltar: () => void;
};

export function DisciplinasOfertadas({ ativa, onVoltar }: DisciplinasOfertadasProps) {
  const [filtros, setFiltros] = useState<FiltrosOfertadas>(FILTROS_OFERTADAS_INICIAIS);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ativa) tituloRef.current?.focus({ preventScroll: true });
  }, [ativa]);

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

      <MenuPesquisa value={filtros} onChange={setFiltros} />

      <div className="sticky bottom-0 -mx-4 mt-auto bg-white px-4 pt-3 pb-6">
        <button
          type="button"
          onClick={onVoltar}
          className="h-9 w-full cursor-pointer rounded-xl bg-slate-100 text-xs font-bold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none"
        >
          Concluir e Voltar
        </button>
      </div>
    </div>
  );
}
