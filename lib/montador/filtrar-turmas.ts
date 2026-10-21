import type { DiaSemana, Quinzena, TurmaMontada } from "@/lib/montador/tipos";

export function filtrarTurmasPorDiaEQuinzena(
  turmas: TurmaMontada[],
  dia: DiaSemana,
  quinzena: Quinzena,
) {
  return turmas.filter((turma) => {
    if (!turma.dias.includes(dia)) return false;
    if (quinzena === "todas") return true;
    return turma.quinzenas.includes(quinzena);
  });
}
