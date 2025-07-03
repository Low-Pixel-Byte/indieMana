import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { randomInt } from 'crypto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

describe('CategoryController', () => {
  let controller: CategoryController;
  let prismaService: PrismaService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    prismaService = module.get<PrismaService>(PrismaService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Indie',
    };

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    categoryService.create = jest.fn().mockResolvedValueOnce(createCategoryDto);

    const result = await controller.create(createCategoryDto);

    expect(result).toBeDefined();
  });

  it('should throw BadRequestException when category name is null', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: '',
    };

    await expect(controller.create(createCategoryDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw ConflictException when category name already exists', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Indie',
    };

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce({
      name: 'Indie',
    });

    await expect(controller.create(createCategoryDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should return all categories', async () => {
    prismaService.category.findMany = jest.fn().mockResolvedValueOnce([]);

    const result = await controller.findAll();

    expect(result).toEqual([]);
  });

  it('should return one category', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce({
      id,
    });

    const result = await controller.findOne(id.toString());

    expect(result).toBeDefined();
  });

  it('should throw BadRequestException when id is null', async () => {
    const id = '';

    await expect(controller.findOne(id)).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException when category not found', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(controller.findOne(id.toString())).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update category', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce({
      id,
    });

    const updateCategoryDto: CreateCategoryDto = {
      name: 'Indie',
    };

    categoryService.update = jest.fn().mockResolvedValueOnce(updateCategoryDto);

    const result = await controller.update(id.toString(), updateCategoryDto);

    expect(result).toBeDefined();
  });

  it('should throw BadRequestException update when id is null', async () => {
    const id = '';

    const updateCategoryDto: CreateCategoryDto = {
      name: 'Indie',
    };

    await expect(controller.update(id, updateCategoryDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException update when id is null', async () => {
    const id = randomInt(1, 100);

    const updateCategoryDto: CreateCategoryDto = {
      name: 'Indie',
    };

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(
      controller.update(id.toString(), updateCategoryDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should remove category', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce({
      id,
    });

    categoryService.remove = jest.fn().mockResolvedValueOnce(null);

    const result = await controller.remove(id.toString());

    expect(result).toBeDefined();
  });

  it('should throw BadRequestException remove when id is null', async () => {
    const id = '';

    await expect(controller.remove(id)).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException remove when id is null', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(controller.remove(id.toString())).rejects.toThrow(
      NotFoundException,
    );
  });
});
