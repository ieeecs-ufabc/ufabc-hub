"use client";

import { useState } from "react";
import { FiltroDiaSemana } from "@/components/montador/filtro-dia-semana";
import { FiltroQuinzena } from "@/components/montador/filtro-quinzena";
import { MenuInferior } from "@/components/montador/menu-inferior";
import type { DiaSemana, Quinzena } from "@/lib/montador/tipos";

type MontadorMobileProps = {
  onAdicionarTurma: () => void;
};

export function MontadorMobile({ onAdicionarTurma }: MontadorMobileProps) {
  const [quinzena, setQuinzena] = useState<Quinzena>("Q1");
  const [dia, setDia] = useState<DiaSemana>("seg");

  const totalCreditos = 0;

  return (
    <div className="flex flex-col gap-4 pb-20">
      <FiltroQuinzena value={quinzena} onChange={setQuinzena} />
      <FiltroDiaSemana value={dia} onChange={setDia} />

      <MenuInferior
        totalCreditos={totalCreditos}
        onAdicionarTurma={onAdicionarTurma}
      />
    </div>
  );
}
