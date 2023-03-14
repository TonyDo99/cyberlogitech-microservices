import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from 'libs/common/http/exception-comon.filter';
import { ResponseInterceptor } from 'libs/common/interceptor/response.interceptor';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new RpcExceptionOne());
  await app.listen(3000, () =>
    console.log('Server now listening on port 3000 '),
  );
}
bootstrap();
