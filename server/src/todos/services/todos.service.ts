import { UserTodoUpdateDto } from '../../users/dto/user-todo-update.dto';
import { pickTodoData } from '../../common/utils/pick-todo-data.util';
import { UserRepository } from '../../users/repositories/user.repository';
import { UserTodoAddDto } from '../../users/dto/user-todo-add.dto';
import { Todo } from 'src/todos/entities/todo.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directory } from 'src/directories/entities/directory.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly userRepository: UserRepository,
    @InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>
  ) {}

  async addTodoByUserId(
    userId: number,
    { content, deadline, directoryId }: UserTodoAddDto
  ) {
    const directory =
      directoryId === undefined
        ? null
        : await this.directoryRepository.findOneOrFail(directoryId, {
            relations: ['user'],
          });

    if (directory !== null && directory.user.id !== userId) {
      throw new ForbiddenException('자신의 Directory가 아닙니다.');
    }

    return pickTodoData(
      await this.todoRepository.save({
        content,
        deadline,
        directory,
        user: await this.userRepository.findOneOrFail(userId),
      })
    );
  }

  async checkAndUpdateTodoByTodoId(
    todoId: number,
    { content, comment, isDone, deadline }: UserTodoUpdateDto,
    userId: number
  ) {
    const todo = await this.todoRepository.findOneOrFail(todoId, {
      relations: ['user', 'directory'],
    });
    if (todo.user.id !== userId) {
      throw new ForbiddenException('자신의 Todo가 아닙니다.');
    }
    if (content !== undefined) {
      todo.content = content;
    }
    if (comment !== undefined) {
      todo.comment = comment;
    }
    if (isDone !== undefined) {
      todo.isDone = isDone;
    }
    if (deadline !== undefined) {
      todo.deadline = deadline;
    }
    return pickTodoData(await todo.save());
  }

  async checkAndDeleteTodoByTodoId(todoId: number, userId: number) {
    const todo = await this.todoRepository.findOneOrFail(todoId, {
      relations: ['user'],
    });
    if (todo.user.id !== userId) {
      throw new ForbiddenException('자신의 Todo가 아닙니다.');
    }
    todo.remove();
  }
}
