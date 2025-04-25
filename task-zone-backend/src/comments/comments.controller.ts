import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { TaskService } from 'src/task/task.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    await this.commentsService.create(createCommentDto);
    const task = await this.taskService.findOne(createCommentDto.taskId);
    return task;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }

  // @Get('task/:taskId')
  // findByTaskId(@Param('taskId') taskId: string) {
  //   return this.commentsService.findByTaskId(taskId);
  // }
}
