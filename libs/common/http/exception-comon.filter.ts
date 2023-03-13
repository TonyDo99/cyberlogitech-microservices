import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }else if(exception instanceof RpcException){
      message = exception.message;
    } 
    else if (exception instanceof Error) {
      message = exception.message;
    }
    

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}