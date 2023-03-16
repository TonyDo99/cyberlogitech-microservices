import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkspacesModule } from './workspaces.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkspacesModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'workspace',
          brokers: ['kafka-service:9092'],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'workspace-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Workspace service now running healthy');
}
bootstrap();
