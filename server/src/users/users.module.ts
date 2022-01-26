import { Directory } from '../directories/entities/directory.entity';
import { DirectoriesModule } from '../directories/directories.module';
import { UsersMeDirectoriesController } from './controllers/users-me-directories.controller';
import { TodosModule } from '../todos/todos.module';
import { UsersMeTodosController } from './controllers/users-me-todos.controller';
import { UsersMeController } from './controllers/users-me.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, Directory]),
    TodosModule,
    DirectoriesModule,
  ],
  controllers: [
    UsersMeController,
    UsersMeTodosController,
    UsersMeDirectoriesController,
    UsersController,
  ],
  providers: [UsersService],
})
export class UsersModule {}
