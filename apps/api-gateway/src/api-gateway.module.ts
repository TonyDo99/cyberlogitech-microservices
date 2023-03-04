import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/common/entities/user.entity';
import { WorkspaceEntity } from 'libs/common/entities/workspace.entity';
import { DB_VALIDATION } from 'libs/common/joi/database.joi';
import { join } from 'path';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UserUsecaseModule } from './usecase';

// TODO Change to using Auth0 for authentication user.
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACES',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'workspace',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'workspace-consumer',
          },
        },
      },
      {
        name: 'SPACES',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'space',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'space-consumer',
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/api-gateway/.env'),
      validationSchema: DB_VALIDATION,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [UserEntity, WorkspaceEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserUsecaseModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
