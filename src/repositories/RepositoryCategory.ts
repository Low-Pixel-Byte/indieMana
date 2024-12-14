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
}
