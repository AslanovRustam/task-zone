import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from 'src/task/task.schema';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;
}
