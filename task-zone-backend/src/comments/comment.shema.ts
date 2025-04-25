import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/task/task.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ default: 'Anonymous' })
  author: string;

  @Prop({ required: true })
  content: string;

  // @Prop({ required: true, type: Types.ObjectId, ref: 'Task' })
  @Prop({ required: true, type: Types.ObjectId, ref: Task.name })
  taskId: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
