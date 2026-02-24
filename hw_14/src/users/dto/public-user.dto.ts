import { IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class PublicUserDto {
  @IsNumber()
  @Min(1)
  id!: number;
  @MinLength(5)
  @MaxLength(25)
  username!: string;

  constructor(partial: Partial<PublicUserDto>) {
    Object.assign(this, partial);
  }
}