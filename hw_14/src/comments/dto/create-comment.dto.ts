import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Hello everyone!',
    description: 'Comment text (3-500 characters)',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  text!: string;
}