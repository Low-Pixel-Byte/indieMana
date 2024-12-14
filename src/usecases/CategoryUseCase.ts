import { CategoryCreate, Category } from "../@types/typesCategory";
import { RepositoryCategory } from "../repositories/RepositoryCategory";

export class CategoryUseCase {
  private repository: RepositoryCategory;

  constructor() {
    this.repository = new RepositoryCategory();
  }
  async create({ name }: CategoryCreate): Promise<Category> {
    const category = await this.repository.create({ name });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.findAll();
    return categories;
  }
}
