import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Exhibit } from 'src/exhibits/exhibits.entity';
import { User } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Exhibit, User])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
