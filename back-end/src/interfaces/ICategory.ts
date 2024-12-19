import { Category, CategoryCreate } from "../@types/typesCategory";

export interface ICategory {
  create(category: CategoryCreate): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
}
