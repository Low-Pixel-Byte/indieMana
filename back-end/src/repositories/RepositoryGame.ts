import { GameCreate, Game } from "../@types/typesGame";
import { IGame } from "../interfaces/IGame";
import { prisma } from "../db/prisma-client";

export class RepositoryGame implements IGame {
  async create(game: GameCreate): Promise<Game> {
    const newGame = await prisma.game.create({
      data: {
        name: game.name,
        description: game.description,
        xboxUrl: game.xboxUrl || "",
        googlePlayUrl: game.googlePlayUrl || "",
        psnUrl: game.psnUrl || "",
        nintendoUrl: game.nintendoUrl || "",
        steamUrl: game.steamUrl || "",
        bannerUrl: game.bannerUrl,
        discord: game.discord || "",
        dateRelease: game.dateRelease,
        trailerUrl: game.trailerUrl || "",
        achivents: game.achivents,
        developers: {
          connect: game.developers.map((developer) => ({
            id: developer.id,
          })),
        },
        Categorys: {
          connect: game.categories.map((category) => ({
            id: category.id,
          })),
        },
      },
    });

    return newGame;
  }

  async findAll(): Promise<Game[]> {
    const games = await prisma.game.findMany({
      include: {
        developers: true,
        Categorys: true,
      },
    });
    return games;
  }

  async findById(id: number): Promise<Game | null> {
    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        developers: true,
        Categorys: true,
      },
    });
    return game;
  }
}
