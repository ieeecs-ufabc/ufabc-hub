import { Suspense } from "react";
import { TelaCarregando } from "@/components/montador/tela-carregando";
import { TelasMontador } from "@/components/montador/telas-montador";
import { getTurmasQuadrimestreAtual } from "@/services/quadrimestre";


async function Montador() {
  const response = await getTurmasQuadrimestreAtual();
  return <TelasMontador turmas={response.turmas} quadrimestre={response.quadrimestre} />;
}

export default function Home() {
  return (
    <div className="flex-1 bg-slate-50">
      <main className="mx-auto w-full max-w-md px-3 pt-2">
        <Suspense fallback={<TelaCarregando />}>
          <Montador />
        </Suspense>
      </main>
    </div>
  );
}