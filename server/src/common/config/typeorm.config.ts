import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EnvironmentVariables } from 'src/env';
import { User } from 'src/users/entities/user.entity';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (
    configService: ConfigService<EnvironmentVariables, true>
  ): TypeOrmModuleOptions => ({
    type: 'mariadb',
    host: configService.get('DB_HOST', { infer: true }),
    port: configService.get('DB_PORT', { infer: true }),
    username: configService.get('DB_USERNAME', { infer: true }),
    password: configService.get('DB_PASSWORD', { infer: true }),
    database: configService.get('DB_NAME', { infer: true }),
    entities: [User],
    // TODO: 밑의 옵션 두개는 개발모드에서만 적용
    synchronize: true,
    logging: true,
  }),
};
