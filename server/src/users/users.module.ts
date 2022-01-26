import { TodosModule } from '../todos/todos.module';
import { UserMeTodosController } from './controllers/user-me-todos.controller';
import { UsersMeController } from './controllers/users-me.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), TodosModule],
  controllers: [UsersMeController, UserMeTodosController, UsersController],
  providers: [UsersService],
})
export class UsersModule {}
