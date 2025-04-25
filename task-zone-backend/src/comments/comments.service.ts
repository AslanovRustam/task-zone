import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './comment.shema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async findAll() {
    return this.commentModel.find().populate('taskId').exec();
  }

  async findOne(id: string) {
    return this.commentModel.findById(id).populate('taskId').exec();
  }

  async create(createCommentDto: CreateCommentDto) {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.commentModel.findByIdAndDelete(id);
  }

  async findByTaskId(taskId: string) {
    return this.commentModel.find({ taskId }).exec();
  }
}
