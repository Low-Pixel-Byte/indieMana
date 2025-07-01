import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsString,
  IsNotEmpty,
  IsUrl,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the game',
    example: 'Dead Cells',
  })
  @Length(3, 255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The description of the game',
    example:
      "Dead Cells is a roguelite, action-platformer in the Metroidvania style. You'll explore a sprawling, ever-changing castle... with no checkpoints. Kill, die, learn, repeat.",
  })
  @Length(3, 5000)
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The xbox url of the game',
    example: 'https://www.xbox.com/pt-br/games/store/-/bqscns1t8phq',
  })
  @Length(3, 255)
  @IsString()
  @IsUrl()
  xboxUrl?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The google play url of the game',
    example:
      'https://play.google.com/store/apps/details?id=com.playdigious.deadcells.mobile',
  })
  @Length(3, 255)
  @IsString()
  @IsUrl()
  googlePlayUrl?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The Playstation Store url of the game',
    example:
      'https://store.playstation.com/pt-br/product/UP4016-PPSA15552_00-DEADCELLSPS5SIEA',
  })
  @Length(3, 255)
  @IsString()
  @IsUrl()
  psnUrl?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The Nintendo url of the game',
    example: 'https://www.nintendo.com/pt-br/store/products/dead-cells-switch/',
  })
  @Length(3, 255)
  @IsString()
  @IsUrl()
  nintendoUrl?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The Steam url of the game',
    example: 'https://store.steampowered.com/app/588650/Dead_Cells/',
  })
  @Length(3, 255)
  @IsString()
  @IsUrl()
  steamUrl?: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The banner url of the game',
    example:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/588650/header.jpg?t=1747319767',
  })
  @Length(3, 255)
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  bannerUrl: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The discord community url of the game',
    example: 'https://discord.com/invite/DArxZmsSQ3',
  })
  @Length(3, 255)
  @IsString()
  @IsUrl()
  discord?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The trailer url of the game',
    example: 'https://www.youtube.com/watch?v=KV6fBYuuPMg',
  })
  @Length(3, 255)
  @IsString()
  @IsUrl()
  trailerUrl?: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'If the game has achievements',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  achivents: boolean;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'The release date of the game',
    example: '2023-01-01',
  })
  @IsNotEmpty()
  @IsDateString()
  dateRelease: Date;

  @ApiProperty({
    type: 'array',
    required: true,
    description: 'The categories of the game',
    example: [{ id: 1 }],
  })
  @IsNotEmpty()
  @IsArray()
  categories: { id: number }[];

  @ApiProperty({
    type: 'array',
    required: true,
    description: 'The developers of the game',
    example: [{ id: '' }],
  })
  @IsNotEmpty()
  @IsArray()
  developers: { id: string }[];
}
