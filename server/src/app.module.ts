import { envValidationSchema } from './common/config/env.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './common/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { DirectoriesModule } from './directories/directories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    AuthModule,
    TodosModule,
    DirectoriesModule,
  ],
})
export class AppModule {}
