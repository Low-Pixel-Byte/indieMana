import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsNotEmpty, IsUrl, IsEmail } from 'class-validator';

export class CreateDeveloperDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the developer',
    example: 'Motion Twin',
  })
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The email of the developer',
    example: 'contact@motion-twin.com',
  })
  @IsEmail()
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The website of the developer',
    example: 'https://motiontwin.com/',
  })
  @IsUrl()
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  website?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The twitter of the developer',
    example: 'https://x.com/motiontwin',
  })
  @IsUrl()
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  twitter?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The instagram of the developer',
    example: 'https://www.instagram.com/motion.twin',
  })
  @IsUrl()
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  instagram?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The about of the developer',
    example:
      "Motion Twin is a small game development studio based in France. Organized as a worker cooperative, with no hierarchy, we choose our projects, our objectives and our working structure together. We are trying to create the games we'd like to play, focusing on the player's experience.",
  })
  @Length(1, 5000)
  @IsString()
  @IsNotEmpty()
  about?: string;
}
