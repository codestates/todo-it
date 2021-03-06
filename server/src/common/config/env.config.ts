import * as Joi from 'joi';
import { EnvironmentVariables } from 'src/env';

export const envValidationSchema = Joi.object<EnvironmentVariables, true>({
  PORT: Joi.number().port().default(8000),
  DB_HOST: Joi.string().hostname().default('127.0.0.1'),
  DB_PORT: Joi.number().port().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
