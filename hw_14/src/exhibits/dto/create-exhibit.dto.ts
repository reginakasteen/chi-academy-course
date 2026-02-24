import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateExhibitDto {
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  description!: string;
}