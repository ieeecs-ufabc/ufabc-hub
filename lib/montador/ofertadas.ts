import { OPCOES_DIA_SEMANA } from "@/lib/montador/tipos";
import type { TurmaPropsData } from "@/services/quadrimestre";

export type Campus = "SA" | "SBC";

export type Turno = "M" | "N";

export type FiltrosOfertadas = {
  busca: string;
  campus: Campus | "todos";
  turno: Turno | "todos";
};

export const FILTROS_OFERTADAS_INICIAIS: FiltrosOfertadas = {
  busca: "",
  campus: "todos",
  turno: "todos",
};

export const OPCOES_CAMPUS: { valor: Campus; rotulo: string }[] = [
  { valor: "SA", rotulo: "Santo André" },
  { valor: "SBC", rotulo: "São Bernardo" },
];

export const OPCOES_TURNO: { valor: Turno; rotulo: string }[] = [
  { valor: "M", rotulo: "Matutino" },
  { valor: "N", rotulo: "Noturno" },
];

export type TurmaPesquisavel = {
  turma: TurmaPropsData;
  camposBusca: string[];
};

const ordemAlfabetica = new Intl.Collator("pt-BR", { numeric: true });

export function prepararTurmasOfertadas(turmas: TurmaPropsData[]): TurmaPesquisavel[] {
  return turmas
    .map((turma) => ({
      turma,
      camposBusca: [turma.disciplina.nome, turma.disciplina.codigo, ...nomesDocentes(turma)].map(
        normalizar,
      ),
    }))
    .sort(
      (a, b) =>
        ordemAlfabetica.compare(a.turma.disciplina.nome, b.turma.disciplina.nome) ||
        ordemAlfabetica.compare(a.turma.codigo, b.turma.codigo),
    );
}

export function filtrarOfertadas(turmas: TurmaPesquisavel[], filtros: FiltrosOfertadas) {
  const termo = normalizar(filtros.busca.trim());

  return turmas.filter(({ turma, camposBusca }) => {
    if (filtros.campus !== "todos" && turma.campus !== filtros.campus) return false;
    if (filtros.turno !== "todos" && String(turma.turno) !== filtros.turno) return false;
    if (termo === "") return true;

    return camposBusca.some((campo) => campo.includes(termo));
  });
}

export function nomesDocentes(turma: TurmaPropsData) {
  return Array.from(
    new Set(turma.horarios.flatMap((horario) => (horario.docente ? [horario.docente.nome] : []))),
  );
}

export function horariosUnicos(turma: TurmaPropsData) {
  const vistos = new Set<string>();

  return turma.horarios
    .filter((horario) => {
      const chave = [
        horario.tipo,
        horario.diaSemana,
        horario.horarioInicio,
        horario.horarioTermino,
        horario.periodicidade,
      ].join("|");
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      return true;
    })
    .sort(
      (a, b) =>
        posicaoDoDia(a.diaSemana) - posicaoDoDia(b.diaSemana) ||
        String(a.horarioInicio).localeCompare(String(b.horarioInicio)),
    );
}

function posicaoDoDia(dia: string) {
  return OPCOES_DIA_SEMANA.findIndex((opcao) => opcao.valor === dia);
}

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
