import { Todo } from 'src/todos/entities/todo.entity';
import { IntersectionType, PickType, PartialType } from '@nestjs/mapped-types';
import { IsPositive } from 'class-validator';

export class UserTodoAddDto extends IntersectionType(
  PickType(Todo, ['content']),
  PartialType(PickType(Todo, ['deadline']))
) {
  @IsPositive()
  directoryId: number | undefined;
}
