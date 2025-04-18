import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL ??
        (() => {
          throw new Error('DATABASE_URL is not defined');
        })(),
    ),
    TaskModule,
    CommentsModule,
  ],
})
export class AppModule {}
