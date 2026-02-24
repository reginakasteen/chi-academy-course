import { UserResponseDto } from '../../users/dto/user-response.dto';
import { CommentResponseDto } from '../../comments/dto/comment-response.dto';

export class ExhibitResponseDto {
  id!: number;
  imageUrl!: string;
  description!: string;
  createdAt!: Date;
  user!: UserResponseDto;
  comments!: CommentResponseDto[];

  constructor(partial: Partial<ExhibitResponseDto>) {
    Object.assign(this, partial);
  }
}