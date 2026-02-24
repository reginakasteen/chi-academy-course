import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  Body, 
  Req, 
  UseGuards, 
  ParseIntPipe, 
  UnauthorizedException 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

interface CreateCommentDto {
  text: string;
}

@Controller('api/exhibits/:exhibitId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    async getComments(@Param('exhibitId', ParseIntPipe) exhibitId: number) {
      return await this.commentsService.getCommentsByExhibit(exhibitId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addComment(
      @Param('exhibitId', ParseIntPipe) exhibitId: number,
      @CurrentUser() user: JwtPayload,
      @Body() body: CreateCommentDto
    ) {
      return await this.commentsService.createComment(exhibitId, user.sub, body.text);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':commentId')
    async deleteComment(
      @Param('commentId', ParseIntPipe) commentId: number,
      @CurrentUser() user: JwtPayload,
    ) {
      return await this.commentsService.deleteComment(commentId, user.sub);
    }
}