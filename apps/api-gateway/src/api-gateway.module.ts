import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PRODUCER_LIST } from './producers';
import { WorkSpaceGatewayController } from './workspace/workspace.controller';
import { WorkSpaceClientService } from './workspace/workspace.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/api-gateway/.env'),
    }),
    ClientsModule.register(PRODUCER_LIST),
  ],
  controllers: [ApiGatewayController, WorkSpaceGatewayController],
  providers: [ApiGatewayService, WorkSpaceClientService, JwtStrategy],
})
export class ApiGatewayModule {}
