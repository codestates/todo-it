import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ConflictException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ConflictException)
export class ConflictExceptionFilter
  implements ExceptionFilter<ConflictException>
{
  catch(exception: ConflictException, host: ArgumentsHost) {
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
