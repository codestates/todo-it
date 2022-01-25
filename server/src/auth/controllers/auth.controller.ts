import { LoginRequestDto } from '../dto/login-request.dto';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() user: LoginRequestDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const accessToken = await this.authService.login(user);
    response.cookie('JWT', accessToken, this.jwtCookieOptions);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('JWT', this.jwtCookieOptions);
  }

  private readonly jwtCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };
}
