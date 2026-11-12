import { TelasMontador } from "@/components/montador/telas-montador";
import { getTurmasQuadrimestreAtual } from "@/services/quadrimestre";

export default async function Home() {
  const turmas = await getTurmasQuadrimestreAtual();

  return (
    <div className="flex-1 bg-slate-50">
      <main className="mx-auto w-full max-w-md px-3 pt-2">
        <TelasMontador turmas={turmas} />
      </main>
    </div>
  );
}
