import { UserUpdateDto } from './../dto/user-update.dto';
import { UserRepository } from '../repositories/user.repository';
import {
  ConflictException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { generateRandomNickname } from 'src/common/utils/gen-random-nick.util';
import { pickTodoData } from 'src/common/utils/pick-todo-data.util';
import { pickUserData } from 'src/common/utils/pick-user-data.util';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser({ email, password, nickname }: UserRegisterDto) {
    if (await this.userRepository.exists({ email })) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    if (nickname === undefined) {
      nickname = await this.generateNoDuplicateNickname();
    } else if (await this.userRepository.exists({ nickname })) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }
    // TODO: 비밀번호 암호화

    const newUser = await this.userRepository.save({
      email,
      password,
      nickname,
    });
    return pickUserData(newUser);
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    return pickUserData(user);
  }

  async updateUserById(
    userId: number,
    { originalPassword, nickname, newPassword }: UserUpdateDto
  ) {
    const user = await this.userRepository.findOneOrFail(userId);
    if (user.password !== originalPassword) {
      throw new ForbiddenException('originalPassword가 유효하지 않습니다.');
    }
    if (newPassword !== undefined) {
      user.password = newPassword;
    }
    if (nickname !== undefined) {
      user.nickname = nickname;
    }
    return pickUserData(await user.save());
  }

  async deleteUserById(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    await user.remove();
  }

  async getUserTodos(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId, {
      relations: ['todos'],
    });
    return user.todos.map(pickTodoData);
  }

  private async generateNoDuplicateNickname(): Promise<string> {
    let nickname: string;
    do {
      nickname = generateRandomNickname();
    } while (await this.userRepository.exists({ nickname }));
    return nickname;
  }
}
