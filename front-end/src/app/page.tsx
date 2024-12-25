import { GameCard } from "@/components/GameCard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <GameCard />
      </main>
    </>
  );
}
