import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/task/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll() {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();
    if (!task)
      return {
        message: `Something went wrong, task with id:${id} not finded`,
      };

    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      ...createTaskDto,
      isDone: createTaskDto.isDone ? createTaskDto.isDone : false,
    };
    const createdTask = new this.taskModel(newTask);
    await createdTask.save();

    return await this.findAll();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();

    if (!updatedTask) {
      return {
        message: `Task with id:${id} not found`,
      };
    }

    return updatedTask;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id).exec();

    if (!task)
      return {
        message: `Something went wrong, task with id:${id} not deleted`,
      };

    return { message: 'Task deleted successfully' };
  }
}
