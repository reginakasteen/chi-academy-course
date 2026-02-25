import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test_user',
    minLength: 5,
    maxLength: 25,
    description: 'Username (must be unique)',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username!: string;

  @ApiProperty({
    example: 'StrongPass123',
    minLength: 10,
    maxLength: 15,
    description: 'User password',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  password!: string;
}