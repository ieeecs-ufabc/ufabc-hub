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
