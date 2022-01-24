import { LoginRequestDto } from '../dto/login-request.dto';
import { UserRepository } from '../../users/repositories/user.repository';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<string> {
    const user = await this.userRepository.findOne({ email });
    // TODO: 비밀번호 복호화
    if (user === undefined || user.password !== password) {
      throw new ForbiddenException('잘못된 이메일 혹은 비밀번호');
    }

    const payload = { sub: user.id, email };
    return this.jwtService.sign(payload);
  }
}
