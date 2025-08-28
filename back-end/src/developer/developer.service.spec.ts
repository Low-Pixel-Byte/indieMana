import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperService } from './developer.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateDeveloperDto } from './dto/create-developer.dto';

describe('CategoryService', () => {
  let developerService: DeveloperService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeveloperService, PrismaService],
    }).compile();

    developerService = module.get<DeveloperService>(DeveloperService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$transaction([prismaService.category.deleteMany()]);
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
    expect(developerService).toBeDefined();
  });

  it('should BadRequestException create when name is null', async () => {
    const dto: CreateDeveloperDto = {
      name: '',
    };

    await expect(developerService.create(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should badRequestException when id is null', async () => {
    const id = '';

    await expect(developerService.findOne(id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should notFoundException when id is null', async () => {
    const id = randomUUID();

    prismaService.developer.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(developerService.findOne(id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return developer', async () => {
    const id = randomUUID();

    prismaService.developer.findUnique = jest.fn().mockResolvedValueOnce({
      id,
    });

    const result = await developerService.findOne(id);

    expect(result).toEqual({ id });
  });

  it('should return all develpers', async () => {
    prismaService.developer.findMany = jest.fn().mockResolvedValueOnce([]);

    const result = await developerService.findAll();

    expect(result).toEqual([]);
  });

  it('should badRequestException update when id is null', async () => {
    const id = '';

    const mockdata = jest.fn().mockResolvedValueOnce(null);

    await expect(developerService.update(id, mockdata)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should NotFoundException update when id is null', async () => {
    const id = randomUUID();

    const mockdata = jest.fn().mockResolvedValueOnce(null);

    await expect(developerService.update(id, mockdata)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should badRequestException remove when id is null', async () => {
    const id = '';

    await expect(developerService.remove(id)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should NotFoundException remove when id is null', async () => {
    const id = randomUUID();

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(developerService.remove(id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
