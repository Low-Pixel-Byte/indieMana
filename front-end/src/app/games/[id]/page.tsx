import { GameInfo } from "@/components/GameInfo";
import Header from "@/components/Header";
export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  //const { games } = useGames(parseInt(id));
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <GameInfo idGame={parseInt(id)} />
      </main>
    </>
  );
}
