import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const PRODUCER_LIST: ClientsModuleOptions = [
  {
    name: 'USER',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['kafka-service:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  },
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
];
