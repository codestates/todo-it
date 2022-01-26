import { UserRepository } from '../users/repositories/user.repository';
import { Todo } from 'src/todos/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, UserRepository])],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
