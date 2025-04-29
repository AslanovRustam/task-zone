import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatusEnum {
  NEW = 'new',
  IN_WORK = 'in work',
  COMPLETED = 'completed',
}

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({
    type: String,
    enum: TaskStatusEnum,
    default: TaskStatusEnum.NEW,
  })
  status: TaskStatusEnum;

  @Prop({ required: true })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
