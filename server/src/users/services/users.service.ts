import { UserRepository } from '../repositories/user.repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { generateRandomNickname } from 'src/common/utils/generateRandomNickname';
import { User } from '../entities/user.entity';
import { Todo } from 'src/todos/entities/todo.entity';

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

  private pickUserData(user: User) {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      isEmailVerified: user.isEmailVerified,
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

    return this.pickUserData(
      await this.userRepository.save({
        email,
        password,
        nickname,
      })
    );
  }

  async findTodos(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['todos'],
    });
    if (user === undefined) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    return user.todos.map(this.pickTodoData);
  }
}
