"use client";

import { useEffect, useEffectEvent } from "react";

const CHAVE = "camada";

function camadaDoEstado(estado: unknown): number {
  if (typeof estado !== "object" || estado === null) return 0;
  const camada = (estado as Record<string, unknown>)[CHAVE];
  return typeof camada === "number" ? camada : 0;
}

/**
 * Liga uma camada (tela ou pop-up) ao histórico do navegador: ao abrir, cria uma
 * entrada; o botão "voltar" fecha a camada de cima em vez de sair do site.
 * Quando a camada é fechada pela interface, a entrada criada é consumida.
 */
export function useFecharComVoltar(aberta: boolean, fechar: () => void) {
  const aoVoltar = useEffectEvent(fechar);

  useEffect(() => {
    if (!aberta) return;

    const camada = camadaDoEstado(window.history.state) + 1;
    window.history.pushState({ [CHAVE]: camada }, "");
    let fechouPeloVoltar = false;

    function aoNavegar(evento: PopStateEvent) {
      if (camadaDoEstado(evento.state) >= camada) return;
      fechouPeloVoltar = true;
      aoVoltar();
    }

    window.addEventListener("popstate", aoNavegar);

    return () => {
      window.removeEventListener("popstate", aoNavegar);
      if (!fechouPeloVoltar && camadaDoEstado(window.history.state) === camada) {
        window.history.back();
      }
    };
  }, [aberta]);
}
