import { pickTodoData } from './../../common/utils/pick-todo-data.util';
import { UserRepository } from '../../users/repositories/user.repository';
import { UserTodoAddDto } from '../../users/dto/user-todo-add.dto';
import { Todo } from 'src/todos/entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly userRepository: UserRepository
  ) {}

  async addTodoByUserId(userId: number, { content }: UserTodoAddDto) {
    return pickTodoData(
      await this.todoRepository.save({
        content,
        user: await this.userRepository.findOneOrFail(userId),
      })
    );
  }
}
