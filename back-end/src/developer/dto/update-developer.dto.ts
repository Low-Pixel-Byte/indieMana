import { PartialType } from '@nestjs/swagger';
import { CreateDeveloperDto } from './create-developer.dto';

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {}
