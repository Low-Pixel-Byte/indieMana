import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the category',
    example: 'Indie',
  })
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name: string;
}
