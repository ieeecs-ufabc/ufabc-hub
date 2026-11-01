import { db } from "@/prisma/db";
import { cacheTag } from "next/cache";

export async function getTurmasQuadrimestreAtual() {
  "use cache";  
  cacheTag("quadrimestre-atual");

  const quadrimestre = await db.orm.public.Quadrimestre.where({ isAtual: true })
    .include("turmas", (turma) =>
      turma
        .include("curso")
        .include("disciplina", (disciplina) =>
          disciplina.include(
            "disciplinaRecomendacaosDisciplinaRecomendacao",
            (recomendacao) => recomendacao.include("disciplinaRecomendada")
          )
        )
        .include("horarioAulas", (horario) => horario.include("docente"))
    )
    .first();

  if (!quadrimestre) {
    return [];
  }

  const turmas = quadrimestre.turmas.map((turma) => {
    if (!turma.disciplina) {
      throw new Error(
        `Disciplina não encontrada para a turma ${turma.codigo}`
      );
    }

    return {
      id: turma.id.toString(),
      codigo: turma.codigo,
      campus: turma.campus,
      turno: turma.turno,
      vagas: turma.vagas,
      reserva: turma.reserva,
      ingles: turma.ingles,
      espanhol: turma.espanhol,

      curso: {
        id: turma.curso.id.toString(),
        nome: turma.curso.nome,
      },

      disciplina: {
        id: turma.disciplina.id.toString(),
        codigo: turma.disciplina.codigo,
        nome: turma.disciplina.nome,
        cargaHoraria: turma.disciplina.cargaHoraria,
        creditos: turma.disciplina.creditos,
        bibliografiaBasica: turma.disciplina.bibliografiaBasica,
        bibliografiaComplementar: turma.disciplina.bibliografiaComplementar,
        horasTeoria: turma.disciplina.horasTeoria,
        horasPratica: turma.disciplina.horasPratica,
        horasExtensao: turma.disciplina.horasExtensao,
        horasIndividuais: turma.disciplina.horasIndividuais,

        recomendacoes:
          turma.disciplina.disciplinaRecomendacaosDisciplinaRecomendacao.map(
            (recomendacao) => ({
              id: recomendacao.disciplinaRecomendada.id.toString(),
              codigo: recomendacao.disciplinaRecomendada.codigo,
              nome: recomendacao.disciplinaRecomendada.nome,
            })
          ),
      },

      horarios: turma.horarioAulas.map((horario) => ({
        id: horario.id.toString(),
        tipo: horario.tipo,
        diaSemana: horario.diaSemana,
        periodicidade: horario.periodicidade,
        horarioInicio: horario.horarioInicio,
        horarioTermino: horario.horarioTermino,
        docente: horario.docente
          ? {
              id: horario.docente.id.toString(),
              nome: horario.docente.nome,
            }
          : null,
      })),
    };
  });

  return turmas;
}