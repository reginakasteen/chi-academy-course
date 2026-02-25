import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: 'User identifier',
  })
  id!: number;

  @ApiProperty({
    example: 'username_123',
    description: 'Public username',
  })
  username!: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}