"use client";
import { useGames } from "@/hooks/useGames";
import { Card } from "./card";
export type GameProps = {
  id: number;
  name: string;
  bannerUrl: string;
  description: string;
};

export const GameCard = () => {
  const { games } = useGames();

  return (
    <div className="container mx-auto grid grid-cols-6 gap-8 my-10">
      {games.map((game) => {
        return <Card key={game.id} info={game} />;
      })}
    </div>
  );
};
