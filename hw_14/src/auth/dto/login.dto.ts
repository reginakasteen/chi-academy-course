import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'login_user',
    description: 'User username',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'User password',
  })
  @IsString()
  password!: string;
}