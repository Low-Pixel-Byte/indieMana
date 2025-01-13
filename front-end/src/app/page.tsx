import { GameCard } from "@/components/GameCard";
import { GameHighlight } from "@/components/GameHighlight";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <GameHighlight />
        <h2 className="text-3xl font-bold mt-10 mb-4 text-lime-500">
          Sugestões
        </h2>
        <GameCard />
      </main>
    </>
  );
}
