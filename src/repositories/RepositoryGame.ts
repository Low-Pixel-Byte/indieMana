import { GameCreate, Game } from "../@types/typesGame";
import { IGame } from "../interfaces/IGame";
import { prisma } from "../db/prisma-client";

export class RepositoryGame implements IGame {
  async create(game: GameCreate): Promise<Game> {
    const newGame = await prisma.game.create({
      data: {
        name: game.name,
        bannerUrl: game.bannerUrl || "",
        description: game.description || "",
        xbox: game.xbox || "",
        psn: game.psn || "",
        nintendo: game.nintendo || "",
        steam: game.steam || "",
        discord: game.discord || "",
        developers: {
          connect: {
            id: game.developerId,
          },
        },
      },
    });

    return newGame;
  }

  async findAll(): Promise<Game[]> {
    const games = await prisma.game.findMany({
      include: {
        developers: true,
      },
    });
    return games;
  }
}
