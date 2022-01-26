import { UserUpdateDto } from '../dto/user-update.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtValidatePayload } from 'src/auth/jwt/jwt-validate.payload';

@Controller('users/me')
export class UsersMeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() { userId }: JwtValidatePayload) {
    return this.usersService.getUserById(userId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateMe(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Body() userUpdateDto: UserUpdateDto
  ) {
    return this.usersService.updateUserById(userId, userUpdateDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteMe(@CurrentUser() { userId }: JwtValidatePayload) {
    await this.usersService.deleteUserById(userId);
  }

  @Get('todos')
  @UseGuards()
  getMyTodos(@CurrentUser() { userId }: JwtValidatePayload) {
    return this.usersService.getUserTodos(userId);
  }
}
