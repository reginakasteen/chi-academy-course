import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateExhibitDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  description?: string;
}