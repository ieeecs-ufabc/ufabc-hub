import type { InformacoesTurma } from "@/components/montador/popup-mais-informacoes";
import { nomesDocentes } from "@/lib/montador/ofertadas";
import type { TurmaPropsData } from "@/services/quadrimestre";

export function paraInformacoesTurma(turma: TurmaPropsData): InformacoesTurma {
  const docentes = nomesDocentes(turma);

  return {
    turma: `Turma ${turma.codigo}`,
    campus: turma.campus,
    nome: turma.disciplina.nome,
    professor: docentes.length > 0 ? docentes.join(", ") : "A definir",
    vagas: turma.vagas,
    vagasReserva: turma.reserva,
    idiomas: idiomasDaTurma(turma),
    disciplinasRecomendadas: turma.disciplina.recomendacoes.map(
      (recomendacao) => recomendacao.nome,
    ),
    bibliografiaBasica: textoComoLista(turma.disciplina.bibliografiaBasica),
    bibliografiaComplementar: textoComoLista(turma.disciplina.bibliografiaComplementar),
  };
}

function idiomasDaTurma(turma: TurmaPropsData) {
  const idiomas: string[] = [];
  if (turma.ingles) idiomas.push("Inglês");
  if (turma.espanhol) idiomas.push("Espanhol");
  return idiomas.length > 0 ? idiomas : ["Português"];
}

function textoComoLista(texto: string | null) {
  const limpo = texto?.trim();
  return limpo ? [limpo] : [];
}
