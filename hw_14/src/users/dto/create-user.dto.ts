import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username!: string;
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  password!: string;
}

