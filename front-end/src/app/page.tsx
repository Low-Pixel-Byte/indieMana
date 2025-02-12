import { GameCard } from "@/components/GameCard";
import { GameHighlight } from "@/components/GameHighlight";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <GameHighlight />
        <div className="flex gap-2 h-10 w-full">
          <div className="rounded-full bg-amber-600 w-1.5"></div>
          <h2 className="text-3xl font-bold text-indigo-400">SUGESTÕES</h2>
        </div>
        <GameCard />
      </main>
    </>
  );
}
