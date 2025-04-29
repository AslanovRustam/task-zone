import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Task } from 'src/task/task.schema';

export type UserT = {
  userId: number;
  username: string;
  password: string;
};

export type UserWithTasks = User & { tasks: Task[] };

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    const tasks = await this.taskModel.find({ userId: user.id }).exec();
    return {
      ...user.toJSON(),
      tasks,
    };
  }

  async findOneById(id: string): Promise<UserWithTasks> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const tasks = await this.taskModel.find({ userId: id }).exec();

    return {
      ...user.toJSON(),
      tasks,
    };
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();

    return await this.findOne(createUserDto.username);
  }
}
