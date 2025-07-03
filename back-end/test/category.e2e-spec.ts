import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CategoryModule } from '../src/category/category.module';
import { CategoryService } from '../src/category/category.service';
import { PrismaService } from '../src/prisma.service';
import { randomInt } from 'crypto';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('CategoryController (e2e)', () => {
  let app: NestFastifyApplication;
  let categoryService: CategoryService;

  const createCategoryDto = {
    name: `Indie-${Date.now()}`,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CategoryModule],
      providers: [CategoryService, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    categoryService = moduleRef.get<CategoryService>(CategoryService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/category (POST) should create category', async () => {
    return app
      .inject({
        method: 'POST',
        url: '/category',
        payload: createCategoryDto,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });

  it('/category (POST) name already exists', async () => {
    return app
      .inject({
        method: 'POST',
        url: '/category',
        payload: createCategoryDto,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(409);
      });
  });

  it('/category (GET) should return all categories', async () => {
    return app
      .inject({
        method: 'GET',
        url: '/category',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      });
  });

  it('/category/:id (GET) should return one category', async () => {
    const categories = await categoryService.findAll();

    return app
      .inject({
        method: 'GET',
        url: `/category/${categories[0].id}`,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      });
  });

  it('/category/:id (GET) should return BadRequestException', async () => {
    const id = '';

    return app
      .inject({ method: 'GET', url: `/category/${+id}` })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  it('/category/:id (GET) should return NotFoundException', async () => {
    const id = randomInt(1000, 10000);

    return app
      .inject({ method: 'GET', url: `/category/${+id}` })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  it('/category/:id (PATCH) should update category', async () => {
    const categories = await categoryService.findAll();

    const updateCategoryDto = {
      name: `Indie-Updated-${Date.now()}`,
    };

    return app
      .inject({
        method: 'PATCH',
        url: `/category/${categories[0].id}`,
        payload: updateCategoryDto,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(204);
      });
  });

  it('/category/:id (PATCH) should return BadRequestException', async () => {
    const id = '';

    const updateCategoryDto = {
      name: `Indie-Updated-${Date.now()}`,
    };

    return app
      .inject({
        method: 'PATCH',
        url: `/category/${+id}`,
        payload: updateCategoryDto,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  it('/category/:id (PATCH) should return NotFoundException', async () => {
    const id = randomInt(1000, 10000);

    const updateCategoryDto = {
      name: `Indie-Updated-${Date.now()}`,
    };

    return app
      .inject({
        method: 'PATCH',
        url: `/category/${+id}`,
        payload: updateCategoryDto,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  it('/category/:id (DELETE) should delete category', async () => {
    const categories = await categoryService.findAll();

    return request(app.getHttpServer())
      .delete(`/category/${categories[0].id}`)
      .expect(204);
  });

  it('/category/:id (DELETE) should return BadRequestException', async () => {
    const id = '';

    return app
      .inject({ method: 'DELETE', url: `/category/${+id}` })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });

  it('/category/:id (DELETE) should return NotFoundException', async () => {
    const id = randomInt(1000, 10000);

    return app
      .inject({ method: 'DELETE', url: `/category/${+id}` })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });
});
