import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class CommentResponseDto {
  @ApiProperty({ example: 15 })
  id!: number;

  @ApiProperty({
    example: 'Amazing exhibit!',
    description: 'Comment text',
  })
  text!: string;

  @ApiProperty({
    example: '2026-02-24T18:22:11.000Z',
    description: 'Creation date',
  })
  createdAt!: Date;

  @ApiProperty({
    type: () => UserResponseDto,
  })
  user!: UserResponseDto;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}