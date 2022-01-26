import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env';
import { User } from 'src/users/entities/user.entity';
import { Todo } from '../../todos/entities/todo.entity';
import { Directory } from '../../directories/entities/directory.entity';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (
    configService: ConfigService<EnvironmentVariables, true>
  ): TypeOrmModuleOptions => ({
    type: 'mariadb',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [User, Todo, Directory],
    // TODO: 밑의 옵션 두개는 개발모드에서만 적용
    synchronize: true,
    logging: true,
  }),
};
