import { UserRegisterDTO } from '../dto/user-register.dto';
import { UsersService } from '../services/users.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() userRegisterDTO: UserRegisterDTO
  ): Promise<Pick<User, 'id' | 'email' | 'nickname'>> {
    const newUser = await this.usersService.registerUser(userRegisterDTO);
    return {
      id: newUser.id,
      email: newUser.email,
      nickname: newUser.nickname,
    };
  }
}
