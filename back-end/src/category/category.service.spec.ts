import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { randomInt } from 'crypto';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$transaction([prismaService.category.deleteMany()]);
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should badRequestException when id is null', async () => {
    const id = '';

    await expect(categoryService.findOne(+id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should NotFoundException when category not found', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(categoryService.findOne(id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return category', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce({
      id,
    });

    const result = await categoryService.findOne(id);

    expect(result).toEqual({ id });
  });

  it('should return all categories', async () => {
    prismaService.category.findMany = jest.fn().mockResolvedValueOnce([]);

    const result = await categoryService.findAll();

    expect(result).toEqual([]);
  });

  it('should badRequestException update when id is null', async () => {
    const id = '';

    const mockdata = jest.fn().mockResolvedValueOnce(null);

    await expect(categoryService.update(+id, mockdata)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should NotFoundException update when id is null', async () => {
    const id = randomInt(1, 100);

    const mockdata = jest.fn().mockResolvedValueOnce(null);

    await expect(categoryService.update(+id, mockdata)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should badRequestException remove when id is null', async () => {
    const id = '';

    await expect(categoryService.remove(+id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should NotFoundException remove when id is null', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(categoryService.remove(id)).rejects.toThrow(NotFoundException);
  });

  it('should BadRequestException VerifyNameExists when name is null', async () => {
    const name = '';

    await expect(categoryService.verifyNameExists(name)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should VerifyNameExists when name exists', async () => {
    const name = 'Indie';

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce({
      name,
    });

    await expect(categoryService.verifyNameExists(name)).rejects.toThrow(
      ConflictException,
    );
  });
});
