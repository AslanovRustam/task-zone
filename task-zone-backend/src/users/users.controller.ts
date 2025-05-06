import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multerConfig';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
    // return this.usersService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Post()
  create(@Body() createUserkDto: CreateUserDto) {
    return this.usersService.create(createUserkDto);
  }

  @UseGuards(AuthGuard)
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatarUrl = `/public/avatars/${id}/${file.filename}`;
    return this.usersService.updateAvatar(id, avatarUrl);
  }
}
