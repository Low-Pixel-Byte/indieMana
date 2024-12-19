import { IDeveloper } from "../interfaces/IDeveloper";
import { Developer, DeveloperCreate } from "../@types/typesDeveloper";
import { prisma } from "../db/prisma-client";

class RepositoryDeveloper implements IDeveloper {
  async create(developer: DeveloperCreate): Promise<Developer> {
    const newDeveloper = await prisma.developer.create({
      data: {
        name: developer.name,
        email: developer.email || "",
        website: developer.website || "",
        twitter: developer.twitter || "",
        instagram: developer.instagram || "",
        about: developer.about || "",
      },
    });

    return newDeveloper;
  }

  async findById(developerId: string): Promise<Developer | null> {
    const developer = await prisma.developer.findUnique({
      where: {
        id: developerId,
      },
      include: {
        games: true,
      },
    });

    return developer;
  }
}

export { RepositoryDeveloper };
