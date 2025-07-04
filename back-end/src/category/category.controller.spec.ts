import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

describe('CategoryController (Integration)', () => {
  let controller: CategoryController;

  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    controller = moduleRef.get(CategoryController);
    prisma = moduleRef.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const uniqueName = () => `Indie-${Date.now()}-${Math.random()}`;

  it('should create a category', async () => {
    const dto: CreateCategoryDto = { name: uniqueName() };
    const result = await controller.create(dto);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe(dto.name);
  });

  it('should throw BadRequest if name is empty', async () => {
    const dto: CreateCategoryDto = { name: '' };
    await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw ConflictException if name already exists', async () => {
    const dto: CreateCategoryDto = { name: uniqueName() };
    await controller.create(dto); // cria uma vez
    await expect(controller.create(dto)).rejects.toThrow(ConflictException);
  });

  it('should return all categories', async () => {
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return one category by ID', async () => {
    const created = await controller.create({ name: uniqueName() });
    const found = await controller.findOne(String(created.id));
    expect(found.id).toBe(created.id);
  });

  it('should throw NotFound when category does not exist', async () => {
    const id = 999999;
    await expect(controller.findOne(String(id))).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a category', async () => {
    const created = await controller.create({ name: uniqueName() });
    const newName = uniqueName();

    const updateResult = await controller.update(String(created.id), {
      name: newName,
    });
    expect(updateResult).toHaveProperty('id');
    expect(updateResult.name).toBe(newName);

    const updated = await controller.findOne(String(created.id));
    expect(updated.name).toBe(newName);
  });

  it('should delete a category', async () => {
    const created = await controller.create({ name: uniqueName() });
    const result = await controller.remove(String(created.id));
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(created.name);

    await expect(controller.findOne(String(created.id))).rejects.toThrow(
      NotFoundException,
    );
  });
});
