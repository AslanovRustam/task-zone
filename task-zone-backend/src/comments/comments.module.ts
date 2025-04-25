import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.shema';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    forwardRef(() => TaskModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [MongooseModule, CommentsService], // Exporting MongooseModule and CommentsService for use in other modules
})
export class CommentsModule {}
