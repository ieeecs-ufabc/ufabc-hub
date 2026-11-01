export type Quinzena = "Q1" | "Q2" | "todas";

export type OpcaoQuinzena = {
  valor: Quinzena;
  rotulo: string;
};

export const OPCOES_QUINZENA: OpcaoQuinzena[] = [
  { valor: "Q1", rotulo: "Quinzenal I" },
  { valor: "Q2", rotulo: "Quinzenal II" },
  { valor: "todas", rotulo: "Todas" },
];

export type DiaSemana = "seg" | "ter" | "qua" | "qui" | "sex" | "sab";

export type OpcaoDiaSemana = {
  valor: DiaSemana;
  rotulo: string;
  nome: string;
};

export const OPCOES_DIA_SEMANA: OpcaoDiaSemana[] = [
  { valor: "seg", rotulo: "Seg", nome: "Segunda" },
  { valor: "ter", rotulo: "Ter", nome: "Terça" },
  { valor: "qua", rotulo: "Qua", nome: "Quarta" },
  { valor: "qui", rotulo: "Qui", nome: "Quinta" },
  { valor: "sex", rotulo: "Sex", nome: "Sexta" },
  { valor: "sab", rotulo: "Sáb", nome: "Sábado" },
];

export type QuinzenaTurma = "Q1" | "Q2";

export type CargaHorariaTpie = {
  teoria: number;
  pratica: number;
  individual: number;
  extensao: number;
};

export type TurmaMontada = {
  id: string;
  turma: string;
  creditos: number;
  nome: string;
  professor: string;
  campus: string;
  turno: string;
  tipo: string;
  horarioInicio: string;
  horarioFim: string;
  cargaHoraria: CargaHorariaTpie;
  dias: DiaSemana[];
  quinzenas: QuinzenaTurma[];
};

export function rotuloQuinzenaCurto(quinzena: Quinzena) {
  if (quinzena === "todas") return "Todas";
  return quinzena;
}

export function nomeDiaSemana(dia: DiaSemana) {
  return OPCOES_DIA_SEMANA.find((opcao) => opcao.valor === dia)?.nome ?? dia;
}
