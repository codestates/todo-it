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
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.registerUser(userRegisterDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUser(userId);
  }

  @Get(':id/todos')
  async findTodos(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.findTodos(userId);
  }
}
