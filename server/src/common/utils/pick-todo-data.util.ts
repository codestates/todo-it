import { Todo } from 'src/todos/entities/todo.entity';

export const pickTodoData = (todo: Todo) => ({
  id: todo.id,
  content: todo.content,
  isDone: todo.isDone,
  comment: todo.comment,
  deadline: todo.deadline,
});
