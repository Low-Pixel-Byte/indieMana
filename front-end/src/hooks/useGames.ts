import { useState, useEffect } from "react";
import { api } from "../services/api";

type GameProps = {
  id: number;
  name: string;
  description: string;
  xboxUrl?: string;
  googlePlayUrl?: string;
  psnUrl?: string;
  nintendoUrl?: string;
  steamUrl?: string;
  bannerUrl: string;
  discord?: string;
  dateRelease: Date;
  trailerUrl: string;
  achivents: boolean;
  /* developers: Developer[];
    categories: Category[]; */
};

export function useGames(idGame?: number) {
  const [games, setGames] = useState<GameProps[] | GameProps>([]);

  useEffect(() => {
    async function getData(id?: number) {
      id = idGame;
      let data = await api.get("/games");

      if (id) {
        data = await api.get(`/games/${id}`);
      }
      setGames(data.data);
    }

    getData();
  }, [idGame]);

  return { games };
}
