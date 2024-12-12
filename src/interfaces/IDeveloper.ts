import { Developer, DeveloperCreate } from "../@types/typesDeveloper";

export interface IDeveloper {
  create(developer: DeveloperCreate): Promise<Developer>;
}
