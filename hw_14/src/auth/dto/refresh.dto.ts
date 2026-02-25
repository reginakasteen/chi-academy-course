import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  @IsNumber()
  userId!: number;

  @ApiProperty({
    example: 'new_user',
    description: 'Username',
  })
  @IsString()
  username!: string;
}