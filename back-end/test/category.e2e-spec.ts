import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CategoryModule } from '../src/category/category.module';
import { CategoryService } from '../src/category/category.service';
import { PrismaService } from '../src/prisma.service';
import { randomInt } from 'crypto';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let categoryService: CategoryService;

  const createCategoryDto = {
    name: `Indie-${Date.now()}`,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CategoryModule],
      providers: [CategoryService, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();

    categoryService = moduleRef.get<CategoryService>(CategoryService);

    await app.init();
  });

  it('/category (POST) should create category', async () => {
    return request(app.getHttpServer())
      .post('/category')
      .send(createCategoryDto)
      .expect(201);
  });

  it('/category (POST) name already exists', async () => {
    return request(app.getHttpServer())
      .post('/category')
      .send(createCategoryDto)
      .expect(409);
  });

  it('/category (GET) should return all categories', async () => {
    return request(app.getHttpServer()).get('/category').expect(200);
  });

  it('/category/:id (GET) should return one category', async () => {
    const categories = await categoryService.findAll();

    return request(app.getHttpServer())
      .get(`/category/${categories[0].id}`)
      .expect(200);
  });

  it('/category/:id (GET) should return BadRequestException', async () => {
    const id = '';

    return request(app.getHttpServer()).get(`/category/${+id}`).expect(400);
  });

  it('/category/:id (GET) should return NotFoundException', async () => {
    const id = randomInt(1000, 10000);

    return request(app.getHttpServer()).get(`/category/${+id}`).expect(404);
  });

  it('/category/:id (PATCH) should update category', async () => {
    const categories = await categoryService.findAll();

    const updateCategoryDto = {
      name: `Indie-Updated-${Date.now()}`,
    };

    return request(app.getHttpServer())
      .patch(`/category/${categories[0].id}`)
      .send(updateCategoryDto)
      .expect(204);
  });

  it('/category/:id (PATCH) should return BadRequestException', async () => {
    const id = '';

    const updateCategoryDto = {
      name: `Indie-Updated-${Date.now()}`,
    };

    return request(app.getHttpServer())
      .patch(`/category/${+id}`)
      .send(updateCategoryDto)
      .expect(400);
  });

  it('/category/:id (PATCH) should return NotFoundException', async () => {
    const id = randomInt(1000, 10000);

    const updateCategoryDto = {
      name: `Indie-Updated-${Date.now()}`,
    };

    return request(app.getHttpServer())
      .patch(`/category/${+id}`)
      .send(updateCategoryDto)
      .expect(404);
  });

  it('/category/:id (DELETE) should delete category', async () => {
    const categories = await categoryService.findAll();

    return request(app.getHttpServer())
      .delete(`/category/${categories[0].id}`)
      .expect(204);
  });

  it('/category/:id (DELETE) should return BadRequestException', async () => {
    const id = '';

    return request(app.getHttpServer()).delete(`/category/${+id}`).expect(400);
  });

  it('/category/:id (DELETE) should return NotFoundException', async () => {
    const id = randomInt(1000, 10000);

    return request(app.getHttpServer()).delete(`/category/${+id}`).expect(404);
  });
});
