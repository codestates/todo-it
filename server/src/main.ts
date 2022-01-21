import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<EnvironmentVariables, true> =
    app.get(ConfigService);

  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
}
bootstrap();
