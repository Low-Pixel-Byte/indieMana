import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}
  async create(createGameDto: CreateGameDto) {
    const { developers, categories, ...rest } = createGameDto;

    return this.prisma.game.create({
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
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
