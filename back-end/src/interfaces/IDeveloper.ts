import { Developer, DeveloperCreate } from "../@types/typesDeveloper";

export interface IDeveloper {
  create(developer: DeveloperCreate): Promise<Developer>;
  findById(developerId: string): Promise<Developer | null>;
}
