import { UserRegisterDto } from '../dto/user-register.dto';
import { UsersService } from '../services/users.service';
import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.registerUser(userRegisterDto);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) userId: number) {
    await this.usersService.deleteUserById(userId);
  }

  @Get(':id/todos')
  findTodos(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.findTodos(userId);
  }
}
