import { DeveloperCreate, Developer } from "../@types/typesDeveloper";
import { RepositoryDeveloper } from "../repositories/RepositoryDeveloper";

export class DeveloperUseCase {
  private repository: RepositoryDeveloper;
  constructor() {
    this.repository = new RepositoryDeveloper();
  }

  async create({
    name,
    about,
    email,
    instagram,
    twitter,
    website,
  }: DeveloperCreate): Promise<Developer> {
    const developer = await this.repository.create({
      name,
      about,
      email,
      instagram,
      twitter,
      website,
    });
    return developer;
  }

  async findById(developerId: string): Promise<Developer | null> {
    const developer = await this.repository.findById(developerId);
    return developer;
  }
}
