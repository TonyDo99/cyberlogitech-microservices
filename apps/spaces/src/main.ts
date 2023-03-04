import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SpacesModule } from './spaces.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SpacesModule,
    {
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
  );
  await app.listen();
  console.log('Space service now running healthy');
}
bootstrap();
