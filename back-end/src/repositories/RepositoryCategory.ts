import { CategoryCreate, Category } from "../@types/typesCategory";
import { ICategory } from "../interfaces/ICategory";
import { prisma } from "../db/prisma-client";

export class RepositoryCategory implements ICategory {
  create(category: CategoryCreate): Promise<Category> {
    const newCategory = prisma.category.create({
      data: {
        name: category.name,
      },
    });

    return newCategory;
  }

  findAll(): Promise<Category[]> {
    const categories = prisma.category.findMany();
    return categories;
  }

  findById(id: number): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: { id },
      include: { games: true },
    });
    return category;
  }
}
