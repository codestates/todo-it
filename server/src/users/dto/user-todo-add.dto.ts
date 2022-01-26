import { Todo } from 'src/todos/entities/todo.entity';
import { PickType } from '@nestjs/mapped-types';

export class UserTodoAddDto extends PickType(Todo, ['content']) {}
