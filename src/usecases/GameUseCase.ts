import { GameCreate, Game } from "../@types/typesGame";
import { RepositoryGame } from "../repositories/RepositoryGame";

export class GameUseCase {
  private repository: RepositoryGame;
  constructor() {
    this.repository = new RepositoryGame();
  }

  async create({
    name,
    bannerUrl,
    description,
    xbox,
    psn,
    nintendo,
    steam,
    discord,
    developerId,
  }: GameCreate): Promise<Game> {
    const newGame = await this.repository.create({
      name,
      bannerUrl,
      description,
      xbox,
      psn,
      nintendo,
      steam,
      discord,
      developerId,
    });
    return newGame;
  }

  async findAll(): Promise<Game[]> {
    const games = await this.repository.findAll();
    return games;
  }
}
