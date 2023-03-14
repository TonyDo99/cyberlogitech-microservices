import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let message: any;

    if (exception instanceof RpcException) {
      const errorCatch = exception.getError();
      message = errorCatch['detail'] || errorCatch; // One was for SQL catching exceptions format, second is from RPC
    } else message = exception.response;

    response.json({
      path: request.url,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
