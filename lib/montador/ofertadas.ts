export type Campus = "SA" | "SBC";

export type Turno = "matutino" | "noturno";

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
  { valor: "matutino", rotulo: "Matutino" },
  { valor: "noturno", rotulo: "Noturno" },
];

type TurmaPesquisavel = {
  codigo?: string;
  nome: string;
  professor: string;
  campus: string;
  turno: string;
};

export function filtrarOfertadas<T extends TurmaPesquisavel>(
  turmas: T[],
  filtros: FiltrosOfertadas,
) {
  const termo = normalizar(filtros.busca.trim());

  return turmas.filter((turma) => {
    if (filtros.campus !== "todos" && turma.campus !== filtros.campus) {
      return false;
    }

    if (filtros.turno !== "todos" && normalizar(turma.turno) !== filtros.turno) {
      return false;
    }

    if (termo === "") return true;

    return [turma.codigo, turma.nome, turma.professor].some(
      (campo) => campo !== undefined && normalizar(campo).includes(termo),
    );
  });
}

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
