import { UserRepository } from '../repositories/user.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { generateRandomNickname } from 'src/common/utils/generateRandomNickname';
import { User } from '../entities/user.entity';
import { Todo } from 'src/todos/entities/todo.entity';

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
    return this.pickUserData(newUser);
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    return this.pickUserData(user);
  }

  async deleteUserById(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    await user.remove();
  }

  async getUserTodos(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId, {
      relations: ['todos'],
    });
    return user.todos.map(this.pickTodoData);
  }

  private async generateNoDuplicateNickname(): Promise<string> {
    let nickname: string;
    do {
      nickname = generateRandomNickname();
    } while (await this.userRepository.exists({ nickname }));
    return nickname;
  }

  private pickUserData(user: User) {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }

  private pickTodoData(todo: Todo) {
    return {
      id: todo.id,
      content: todo.content,
      isDone: todo.isDone,
      deadline: todo.deadline,
      comment: todo.comment,
    };
  }
}
