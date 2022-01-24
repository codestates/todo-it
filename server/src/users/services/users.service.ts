import { UserRepository } from '../repositories/user.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { generateRandomNickname } from 'src/common/utils/generateRandomNickname';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  private async generateNoDuplicateNickname(): Promise<string> {
    let nickname: string;
    do {
      nickname = generateRandomNickname();
    } while (await this.userRepository.exists({ nickname }));
    return nickname;
  }

  async registerUser({
    email,
    password,
    nickname,
  }: UserRegisterDto): Promise<User> {
    if (await this.userRepository.exists({ email })) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    if (nickname === undefined) {
      nickname = await this.generateNoDuplicateNickname();
    } else if (await this.userRepository.exists({ nickname })) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }
    // TODO: 비밀번호 암호화

    return this.userRepository.save({ email, password, nickname });
  }
}
