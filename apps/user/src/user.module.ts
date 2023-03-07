import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from 'libs/common/entities/mail.entity';
import { UserEntity } from 'libs/common/entities/user.entity';
import { WorkspaceEntity } from 'libs/common/entities/workspace.entity';
import { DB_VALIDATION } from 'libs/common/joi/database.joi';
import { join } from 'path';
import { UserUseCaseModule } from './usecase';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
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
        entities: [UserEntity, WorkspaceEntity, MailEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserUseCaseModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
