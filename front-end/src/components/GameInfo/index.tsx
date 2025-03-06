"use client";
import React from "react";
import { useGames } from "@/hooks/useGames";
import Image from "next/image";
import { Label } from "../Label";

type GameInfoProps = {
  idGame: number;
};

export function GameInfo({ idGame }: GameInfoProps) {
  const { games } = useGames(idGame);

  return (
    <div className="container mx-auto mt-5">
      <header className="flex gap-2 flex-col">
        <div className="flex gap-2">
          <Image
            src={games.bannerUrl}
            alt={"Banner do jogo " + games.name}
            width={300}
            height={100}
            objectFit="center"
            className="rounded-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mt-10 mb-4 text-lime-500">
              {games.name}
            </h2>
            <div className="flex gap-2">
              <Label label="Aventura" />
              <Label label="Cooperativo" />
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 mt-5">
        <div>
          <h2 className="text-3xl font-bold mt-10 mb-4 text-lime-500">
            Descrição
          </h2>
          <p className=" text-sm">{games.description}</p>
          <p>
            <strong>Lancamento</strong>:{" "}
            {new Date(games.dateRelease).toLocaleDateString()}
          </p>
          <p>
            <strong>Desenvolvido por</strong>: Fred 
          </p>
        </div>

        <div>
          <video
            className="rounded-lg"
            src={games.trailerUrl}
            controls
            width="100%"
            height="100%"
            muted
            autoPlay
          ></video>
          <div className="flex gap-2 mt-2">
            {games.steamUrl && <Label label="Steam" />}
            {games.xboxUrl && <Label label="Xbox" />}
            {games.psnUrl && <Label label="PSN" />}
            {games.nintendoUrl && <Label label="Switch" />}
            {games.googlePlayUrl && <Label label="Google Play" />}
          </div>
        </div>
      </div>
    </div>
  );
}
