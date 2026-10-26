"use client";

import { useEffect, useRef, useState } from "react";
import { DisciplinasOfertadas } from "@/components/montador/disciplinas-ofertadas";
import { MontadorMobile } from "@/components/montador/montador-mobile";

export function TelasMontador() {
  const [pesquisando, setPesquisando] = useState(false);
  const origemDoFoco = useRef<HTMLElement | null>(null);

  function abrirPesquisa() {
    if (document.activeElement instanceof HTMLElement) {
      origemDoFoco.current = document.activeElement;
    }
    setPesquisando(true);
  }

  function fecharPesquisa() {
    setPesquisando(false);
  }

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
        inert={pesquisando}
        className={`relative transition-[left] duration-300 ease-out motion-reduce:transition-none ${
          pesquisando ? "-left-full" : "left-0"
        }`}
      >
        <MontadorMobile onAdicionarTurma={abrirPesquisa} />
      </div>

      <div
        inert={!pesquisando}
        className={`fixed inset-0 z-20 overflow-y-auto overscroll-contain bg-white transition-[translate,visibility] duration-300 ease-out motion-reduce:transition-none ${
          pesquisando ? "translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <DisciplinasOfertadas ativa={pesquisando} onVoltar={fecharPesquisa} />
      </div>
    </div>
  );
}
