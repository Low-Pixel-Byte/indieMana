import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DeveloperController],
  providers: [DeveloperService, PrismaService],
})
export class DeveloperModule {}
