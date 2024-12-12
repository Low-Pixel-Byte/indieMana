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
}

export { RepositoryDeveloper };
