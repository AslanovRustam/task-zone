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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async findAll() {
    return await this.userModel.find().exec();
  }
  // async findOne(id: string) {
  // return await this.userModel.findOne({ username }).exec();
  // const user = await this.userModel.findById(id).exec();

  // if (!user)
  //   return {
  //     message: `User with id ${id} not finded`,
  //   };

  // const comments = await this.commentModel.find({ taskId: id }).exec();
  //    return user;
  // }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();

    return await this.findOne(createUserDto.username);
  }
}
