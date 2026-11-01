import { MontadorMobile } from "@/components/montador/montador-mobile";
import { TelasMontador } from "@/components/montador/telas-montador";

export default function Home() {
  return (
    <div className="flex-1 bg-slate-50">
      <main className="mx-auto w-full max-w-md px-3 pt-2">
        <MontadorMobile />
        <TelasMontador />
      </main>
    </div>
  );
}
