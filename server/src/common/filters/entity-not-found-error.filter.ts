import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter
  implements ExceptionFilter<EntityNotFoundError>
{
  private readonly errorMessages: Record<string, string> = {
    User: '존재하지 않는 유저입니다.',
    Todo: '존재하지 않는 Todo입니다.',
    Directory: '존재하지 않는 Directory입니다.',
  };

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorEntity = exception.message.split('"')[1];
    const errorMessage = this.errorMessages[errorEntity];
    response.status(404).json({ message: errorMessage });
  }
}
