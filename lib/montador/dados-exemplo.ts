import type { TurmaMontada } from "@/lib/montador/tipos";

/** Dados temporários só no front até existir API/estado global. */
export const TURMAS_MONTADOR_EXEMPLO: TurmaMontada[] = [
  {
    id: "cg-b1-seg",
    turma: "Turma B1",
    creditos: 6,
    nome: "Computação Gráfica",
    professor: "João Paulo Gois",
    campus: "SA",
    turno: "Matutino",
    tipo: "PRATICA",
    horarioInicio: "14:00",
    horarioFim: "16:00",
    cargaHoraria: { teoria: 0, pratica: 4, individual: 4, extensao: 0 },
    dias: ["seg"],
    quinzenas: ["Q1"],
  },
];
