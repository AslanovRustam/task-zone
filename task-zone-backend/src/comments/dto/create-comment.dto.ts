// export class CreateCommentDto {}
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  taskId: string;

  @IsString()
  author?: string;
}
