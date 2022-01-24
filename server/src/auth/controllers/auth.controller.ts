import { LoginRequestDto } from '../dto/login-request.dto';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() user: LoginRequestDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const accessToken = await this.authService.login(user);
    // TODO: HTTPS 옵션 추가
    response.cookie('JWT', accessToken, { httpOnly: true });
  }
}
