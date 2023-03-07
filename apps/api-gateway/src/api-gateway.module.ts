import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { PRODUCER_LIST } from './producers';
import { WorkSpaceGatewayController } from './workspace/workspace.controller';
import { WorkSpaceClientService } from './workspace/workspace.service';

@Module({
  imports: [ClientsModule.register(PRODUCER_LIST)],
  controllers: [ApiGatewayController, WorkSpaceGatewayController],
  providers: [ApiGatewayService, WorkSpaceClientService],
})
export class ApiGatewayModule {}
