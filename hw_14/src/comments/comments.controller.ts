import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  Body, 
  UseGuards, 
  ParseIntPipe 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';

interface CreateCommentDto {
  text: string;
}

@Controller('api/exhibits/:exhibitId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({ summary: 'Get all comments' })
    @Get()
    async getComments(@Param('exhibitId', ParseIntPipe) exhibitId: number) {
      return await this.commentsService.getCommentsByExhibit(exhibitId);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: 'Add new comment' })
    @ApiConsumes('application/json')
    @ApiBody({
        description: 'Comment creation data',
        schema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              example: 'Wow, this vase is so cool!',
            },
          },
          required: ['text'],
        },
      })
    async addComment(
      @Param('exhibitId', ParseIntPipe) exhibitId: number,
      @CurrentUser() user: JwtPayload,
      @Body() body: CreateCommentDto
    ) {
      return await this.commentsService.createComment(exhibitId, user.sub, body.text);
    }

    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Delete comment' })
    @ApiParam({ name: 'commentId', example: 15 })
    @ApiParam({ name: 'exhibitId', example: 3 })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':commentId')
    async deleteComment(
      @Param('commentId', ParseIntPipe) commentId: number,
      @CurrentUser() user: JwtPayload,
    ) {
      return await this.commentsService.deleteComment(commentId, user.sub);
    }
}