import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Injectable()
export class DeveloperService {
  create(createDeveloperDto: CreateDeveloperDto) {
    return 'This action adds a new developer';
  }

  findAll() {
    return `This action returns all developer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} developer`;
  }

  update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    return `This action updates a #${id} developer`;
  }

  remove(id: number) {
    return `This action removes a #${id} developer`;
  }
}
