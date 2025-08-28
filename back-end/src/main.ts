import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { fastifyCors } from '@fastify/cors';
import * as dotenv from 'dotenv';
import { RawServerDefault } from 'fastify';

dotenv.config();

async function bootstrap(): Promise<void> {
  const app: NestFastifyApplication<RawServerDefault> =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

  /* await app.register(fastifyCors, {
    // NOT RECOMMENDED
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }); */

  // Configuration Swagger
  const configSwagger: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('IndieMana API')
    .setDescription('Plataform for indie games')
    .setVersion('1.0')
    .build();

  // Configuration document
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    configSwagger,
  );

  // Configuration swagger endpoint
  SwaggerModule.setup('api', app, document);

  // Configuração do pipe de validação de dados
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Inicialização do servidor Nest
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
