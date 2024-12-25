import { GameCard } from "@/components/GameCard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <h2 className="text-3xl font-bold mt-10 mb-4 text-lime-500">
          Sugestões
        </h2>
        <GameCard />
      </main>
    </>
  );
}
