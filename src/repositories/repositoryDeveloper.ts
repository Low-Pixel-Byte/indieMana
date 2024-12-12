import { IDeveloper } from "../interfaces/IDeveloper";
import { Developer, DeveloperCreate } from "../@types/typesDeveloper";

class RepositoryDeveloper implements IDeveloper {
  async create(developer: DeveloperCreate): Promise<Developer> {
    throw new Error("Method not implemented.");
  }
}

export { RepositoryDeveloper };
