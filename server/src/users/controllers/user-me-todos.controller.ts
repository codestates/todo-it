import { TodosService } from '../../todos/services/todos.service';
import { UserTodoAddDto } from '../dto/user-todo-add.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtValidatePayload } from 'src/auth/jwt/jwt-validate.payload';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users/me/todos')
@UseGuards(JwtAuthGuard)
export class UserMeTodosController {
  constructor(
    private readonly usersService: UsersService,
    private readonly todosService: TodosService
  ) {}

  @Get()
  getMyTodos(@CurrentUser() { userId }: JwtValidatePayload) {
    return this.usersService.getUserTodos(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addTodo(
    @CurrentUser() { userId }: JwtValidatePayload,
    @Body() userTodoAddDto: UserTodoAddDto
  ) {
    return this.todosService.addTodoByUserId(userId, userTodoAddDto);
  }
}