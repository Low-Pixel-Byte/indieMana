import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}
  async create(createGameDto: CreateGameDto) {
    const { developers, categories, ...rest } = createGameDto;

    const game = await this.prisma.game.create({
      data: {
        ...rest,
        developers: {
          connect: developers.map((dev) => ({ id: dev.id })),
        },
        categories: {
          connect: categories.map((cat) => ({ id: cat.id })),
        },
      },
    });

    return game;
  }

  async findAll() {
    return await this.prisma.game.findMany();
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const game = await this.prisma.game.findUnique({
      where: { id },
      include: { developers: true, categories: true },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const { developers, categories, ...rest } = updateGameDto;

    return await this.prisma.game.update({
      where: { id },
      data: {
        ...rest,
        developers: {
          connect: developers?.map((dev) => ({ id: dev.id })),
        },
        categories: {
          connect: categories?.map((cat) => ({ id: cat.id })),
        },
      },
    });
  }

  async remove(id: number) {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return await this.prisma.game.delete({ where: { id } });
  }
}
