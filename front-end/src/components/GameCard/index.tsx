"use client";
import { Card } from "./card";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

export type GameProps = {
  id: number;
  name: string;
  bannerUrl: string;
};

export const GameCard = () => {
  const [games, setgames] = useState<GameProps[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await api.get("/games");
      setgames(data.data);
    }

    getData();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {games.map((game) => {
        return <Card key={game.id} info={game} />;
      })}
    </div>
  );
};
