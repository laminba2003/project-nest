import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
 
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = exception.status ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception instanceof Error) ? exception.message : exception.message.error;
    response
      .status(status)
      .json({
        status,
        message
      });
  }
}