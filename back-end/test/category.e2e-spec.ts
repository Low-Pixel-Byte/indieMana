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
  let prismaService: PrismaService;

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
    prismaService = moduleRef.get<PrismaService>(PrismaService);

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
    const categories = await categoryService.findAll();

    return request(app.getHttpServer())
      .get('/category')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(categories)));
      });
  });

  it('/category/:id (GET) should return one category', async () => {
    const categories = await categoryService.findAll();

    const category = await categoryService.findOne(categories[0].id);

    return request(app.getHttpServer())
      .get(`/category/${categories[0].id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(category)));
      });
  });

  it('/category/:id (GET) should return BadRequestException', async () => {
    const id = '';

    return request(app.getHttpServer()).get(`/category/${+id}`).expect(400);
  });

  it('/category/:id (GET) should return NotFoundException', async () => {
    const id = randomInt(1, 100);

    prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);

    return request(app.getHttpServer()).get(`/category/${+id}`).expect(404);
  });
});
