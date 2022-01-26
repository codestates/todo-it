import { Todo } from 'src/todos/entities/todo.entity';

export const pickTodoData = (todo: Todo) => ({
  id: todo.id,
  content: todo.content,
  isDone: todo.isDone,
  deadline: todo.deadline,
  comment: todo.comment,
});
