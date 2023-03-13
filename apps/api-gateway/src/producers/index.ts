import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const PRODUCER_LIST: ClientsModuleOptions = [
  {
    // kafka-service
    name: 'USER',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
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
        brokers: ['localhost:9092'],
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
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'space-consumer',
      },
    },
  },
];
