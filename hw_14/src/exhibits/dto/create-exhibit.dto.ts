import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExhibitDto {
  @ApiProperty({
    example: 'Beautiful butterfly',
    description: 'Description of the exhibit',
    minLength: 3,
    maxLength: 2000,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  description!: string;
}