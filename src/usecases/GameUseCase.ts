import { GameCreate, Game } from "../@types/typesGame";
import { RepositoryGame } from "../repositories/RepositoryGame";

export class GameUseCase {
  private repository: RepositoryGame;
  constructor() {
    this.repository = new RepositoryGame();
  }

  async create({
    name,
        description,
        xboxUrl,
        googlePlayUrl,
        psnUrl,
        nintendoUrl,
        steamUrl,
        bannerUrl,
        discord,
        dateRelease,
        trailerUrl,
        achivents,
        developers,
        categories
  }: GameCreate): Promise<Game> {
    const newGame = await this.repository.create({
      name,
        description,
        xboxUrl,
        googlePlayUrl,
        psnUrl,
        nintendoUrl,
        steamUrl,
        bannerUrl,
        discord,
        dateRelease,
        trailerUrl,
        achivents,
        developers,
        categories
    });
    return newGame;
  }

  async findAll(): Promise<Game[]> {
    const games = await this.repository.findAll();
    return games;
  }
}
