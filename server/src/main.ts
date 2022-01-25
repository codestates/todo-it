import { EntityNotFoundErrorFilter } from './common/filters/entity-not-found-error.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './env';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions: HttpsOptions = {
    key: readFileSync('./secrets/private-key.pem'),
    cert: readFileSync('./secrets/public-certificate.pem'),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new EntityNotFoundErrorFilter()
  );

  const configService: ConfigService<EnvironmentVariables, true> =
    app.get(ConfigService);

  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
}
bootstrap();
