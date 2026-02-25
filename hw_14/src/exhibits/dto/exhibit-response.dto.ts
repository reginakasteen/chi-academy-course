import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseDto } from 'src/comments/dto/comment-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class ExhibitResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'uploads/abc123.jpg' })
  imageUrl!: string;

  @ApiProperty({ example: 'Ancient Greek vase' })
  description!: string;

  @ApiProperty({ example: '2026-02-24T19:30:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ type: () => UserResponseDto })
  user!: UserResponseDto;

  @ApiProperty({ type: () => [CommentResponseDto] })
  comments!: CommentResponseDto[];

  constructor(partial: Partial<ExhibitResponseDto>) {
    Object.assign(this, partial);
  }
}