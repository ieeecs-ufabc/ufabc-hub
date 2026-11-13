import { OPCOES_TURNO } from "@/lib/montador/ofertadas";
import { OPCOES_DIA_SEMANA } from "@/lib/montador/tipos";

export function formatarCreditos(creditos: number) {
  return `${creditos} ${creditos === 1 ? "Crédito" : "Créditos"}`;
}

export function formatarTurno(turno: string) {
  return OPCOES_TURNO.find((opcao) => opcao.valor === turno)?.rotulo ?? turno;
}

export function formatarDiaSemana(dia: string) {
  return OPCOES_DIA_SEMANA.find((opcao) => opcao.valor === dia)?.rotulo ?? dia;
}

export function formatarNomeDiaSemana(dia: string) {
  return OPCOES_DIA_SEMANA.find((opcao) => opcao.valor === dia)?.nome ?? dia;
}

export function formatarHorario(horario: string) {
  return horario.slice(0, 5);
}

const PERIODICIDADES: Record<string, string> = {
  semanal: "Semanal",
  q1: "Quinzenal I",
  q2: "Quinzenal II",
};

export function formatarPeriodicidade(periodicidade: string) {
  return PERIODICIDADES[periodicidade] ?? periodicidade;
}
