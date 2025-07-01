import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DeveloperService {
  constructor(private prisma: PrismaService) {}
  async create(createDeveloperDto: CreateDeveloperDto) {
    return await this.prisma.developer.create({ data: createDeveloperDto });
  }

  async findAll() {
    return await this.prisma.developer.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const developer = await this.prisma.developer.findUnique({ where: { id } });
    if (!developer) {
      throw new NotFoundException('Developer not found');
    }
    return developer;
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    const developer = await this.prisma.developer.findUnique({ where: { id } });
    if (!developer) {
      throw new NotFoundException('Developer not found');
    }
    return await this.prisma.developer.update({
      where: { id },
      data: updateDeveloperDto,
    });
  }

  async remove(id: string) {
    const developer = await this.prisma.developer.findUnique({ where: { id } });
    if (!developer) {
      throw new NotFoundException('Developer not found');
    }
    return await this.prisma.developer.delete({ where: { id } });
  }
}
