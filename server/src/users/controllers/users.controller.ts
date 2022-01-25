import { JwtAuthGuard } from './../../auth/jwt/jwt-auth.guiard';
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
  UseGuards,
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
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) userId: number) {
    await this.usersService.deleteUserById(userId);
  }

  @Get(':id/todos')
  getUserTodos(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserTodos(userId);
  }
}
