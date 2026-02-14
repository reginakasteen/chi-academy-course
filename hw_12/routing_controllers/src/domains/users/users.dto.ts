import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user!: string;

  @IsEmail()
  email!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
