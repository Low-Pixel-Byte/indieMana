"use client";
import React from "react";
import { useGames } from "@/hooks/useGames";
import Image from "next/image";
import { Skeleton } from "./skeleton";

export const GameHighlight = () => {
  const { games } = useGames();

  if (!games || games.length === 0) {
    return <Skeleton />;
  }

  return (
    <div className="flex bg-gray-900 text-white p-6 space-x-6 my-10">
      <div className="flex-1 relative border-4 border-indigo-950 rounded-lg">
        <Image
          width={500}
          height={500}
          src={games[0].bannerUrl}
          alt={"Banner do jogo " + games[0].name}
          className="rounded-lg w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4  px-4 py-2 rounded text-lg font-bold">
          {games[0].name}
        </div>
      </div>

      {/* Lista de jogos */}
      <div className="w-1/3 flex flex-col space-y-4">
        {games.slice(1, 4).map((game, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden cursor-pointer border-4 border-indigo-800 rounded-lg"
          >
            <Image
              src={game.bannerUrl}
              alt={"Banner do jogo " + game.name}
              width={200}
              height={100}
              className="w-full h-36 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-lg font-bold">{game.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
