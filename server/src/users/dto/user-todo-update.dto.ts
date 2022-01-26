import { PartialType, PickType } from '@nestjs/mapped-types';
import { Todo } from 'src/todos/entities/todo.entity';

export class UserTodoUpdateDto extends PartialType(
  PickType(Todo, ['content', 'isDone', 'deadline', 'comment'])
) {}
