import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from './comments.entity';
import { Exhibit } from 'src/exhibits/exhibits.entity';
import { User } from 'src/users/users.entity';
import { CommentResponseDto } from './dto/comment-response.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,

    @InjectRepository(Exhibit)
    private exhibitsRepository: Repository<Exhibit>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private mapToDto(comment: Comment): CommentResponseDto {
    return new CommentResponseDto({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        username: comment.user.username,
      },
    });
  }

  async createComment(
    exhibitId: number,
    userId: number,
    text: string,
  ): Promise<CommentResponseDto> {
    const exhibit = await this.exhibitsRepository.findOneBy({ id: exhibitId });
    if (!exhibit) throw new NotFoundException('Exhibit not found');

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const comment = this.commentsRepository.create({
      text,
      exhibit,
      user,
    });

    const saved = await this.commentsRepository.save(comment);

    return this.mapToDto(saved);
  }

  async getCommentsByExhibit(
    exhibitId: number,
  ): Promise<CommentResponseDto[]> {
    const comments = await this.commentsRepository.find({
      where: { exhibit: { id: exhibitId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return comments.map((comment) => this.mapToDto(comment));
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!comment) throw new NotFoundException(`Comment ${commentId} not found`);

    if (comment.user.id !== userId) {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user?.isAdmin) throw new ForbiddenException('Permission denied');
    }

    await this.commentsRepository.remove(comment);
  }
}