import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
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
