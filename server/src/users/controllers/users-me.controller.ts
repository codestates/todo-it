import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guiard';
import { JwtPayload } from 'src/auth/jwt/jwt.payload';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users/me')
export class UsersMeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() { sub: userId }: JwtPayload) {
    return this.usersService.getUserById(userId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteMe(@CurrentUser() { sub: userId }: JwtPayload) {
    await this.usersService.deleteUserById(userId);
  }

  @Get('todos')
  @UseGuards()
  getMyTodos(@CurrentUser() { sub: userId }: JwtPayload) {
    return this.usersService.getUserTodos(userId);
  }
}
