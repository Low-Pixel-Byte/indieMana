"use client";
import { useGames } from "@/hooks/useGames";
import { Card } from "./card";
export type GameProps = {
  id: number;
  name: string;
  bannerUrl: string;
};

export const GameCard = () => {
  const { games } = useGames();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {games.map((game) => {
        return <Card key={game.id} info={game} />;
      })}
    </div>
  );
};
