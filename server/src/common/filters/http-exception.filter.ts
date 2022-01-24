import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionStatus = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { message: string }
      | object;

    if (typeof error === 'string') {
      response.status(exceptionStatus).json({ message: error });
      return;
    }
    if ('message' in error) {
      response.status(exceptionStatus).json({ message: error.message });
      return;
    }
    response.status(exceptionStatus).json(error);
  }
}
