"use client";

import { useMemo, useState } from "react";
import { FiltroDiaSemana } from "@/components/montador/filtro-dia-semana";
import { FiltroQuinzena } from "@/components/montador/filtro-quinzena";
import { MenuInferior } from "@/components/montador/menu-inferior";
import { CardDisciplinas } from "./card-disciplinas";
import { CardSemDisciplina } from "./card-sem-disciplina";
import { TURMAS_MONTADOR_EXEMPLO } from "@/lib/montador/dados-exemplo";
import { filtrarTurmasPorDiaEQuinzena } from "@/lib/montador/filtrar-turmas";
import type { DiaSemana, Quinzena, TurmaMontada } from "@/lib/montador/tipos";
import { nomeDiaSemana } from "@/lib/montador/tipos";

export function MontadorMobile() {
  const [quinzena, setQuinzena] = useState<Quinzena>("Q1");
  const [dia, setDia] = useState<DiaSemana>("seg");
  const [turmas, setTurmas] = useState<TurmaMontada[]>(TURMAS_MONTADOR_EXEMPLO);

  const turmasVisiveis = useMemo(
    () => filtrarTurmasPorDiaEQuinzena(turmas, dia, quinzena),
    [turmas, dia, quinzena],
  );

  const totalCreditos = useMemo(
    () => turmas.reduce((soma, turma) => soma + turma.creditos, 0),
    [turmas],
  );

  function abrirDisciplinasOfertadas() {
    // Será ligado à tela "Disciplinas Ofertadas" quando ela existir.
  }

  function excluirTurma(id: string) {
    setTurmas((atual) => atual.filter((turma) => turma.id !== id));
  }

  return (
    <div className="flex flex-col gap-4 pb-20">
      <FiltroQuinzena value={quinzena} onChange={setQuinzena} />
      <FiltroDiaSemana value={dia} onChange={setDia} />

      {turmasVisiveis.length === 0 ? (
        <CardSemDisciplina diaNome={nomeDiaSemana(dia)} quinzena={quinzena} />
      ) : (
        <ul className="flex flex-col gap-3">
          {turmasVisiveis.map((turma) => (
            <li key={turma.id}>
              <CardDisciplinas
                turma={turma.turma}
                creditos={turma.creditos}
                nome={turma.nome}
                professor={turma.professor}
                campus={turma.campus}
                turno={turma.turno}
                tipo={turma.tipo}
                horarioInicio={turma.horarioInicio}
                horarioFim={turma.horarioFim}
                cargaHoraria={turma.cargaHoraria}
                onExcluir={() => excluirTurma(turma.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <MenuInferior
        totalCreditos={totalCreditos}
        onAdicionarTurma={abrirDisciplinasOfertadas}
      />
    </div>
  );
}
