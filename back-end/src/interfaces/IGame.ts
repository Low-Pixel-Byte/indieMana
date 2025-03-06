import { Game, GameCreate } from "../@types/typesGame";

export interface IGame {
  create(game: GameCreate): Promise<Game>;
  findAll(): Promise<Game[]>;
  findById(id: number): Promise<Game | null>;
}
