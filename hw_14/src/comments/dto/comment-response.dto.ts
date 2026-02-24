import { PublicUserDto } from '../../users/dto/public-user.dto';

export class CommentResponseDto {
  id!: number;
  text!: string;
  createdAt!: Date;
  user!: PublicUserDto;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}