import { MontadorMobile } from "@/components/montador/montador-mobile";

export default function Home() {
  return (
    <div className="flex-1 bg-slate-50">
      <main className="mx-auto w-full max-w-md px-3 pt-2">
        <MontadorMobile />
      </main>
    </div>
  );
}
