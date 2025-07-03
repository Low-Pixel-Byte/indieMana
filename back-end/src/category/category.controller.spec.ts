import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { randomInt } from 'crypto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException, ConflictException } from '@nestjs/common';

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
});
