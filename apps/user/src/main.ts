import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user',
          brokers: ['kafka-service:9092'],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'user-consumer',
        },
      },
    },
  );
  await app.listen();

  console.log('User service now running healthy');
}
bootstrap();
