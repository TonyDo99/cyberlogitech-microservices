import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from 'libs/common/entities/mail.entity';
import { UserEntity } from 'libs/common/entities/user.entity';
import { WorkspaceEntity } from 'libs/common/entities/workspace.entity';
import { DB_VALIDATION } from 'libs/common/joi/database.joi';
import { join } from 'path';
import { WorkSpaceUseCaseModule } from './usecase';
import { WorkSpacesController } from './workspaces.controller';
import { WorkSpacesService } from './workspaces.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/workspaces/.env'),
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
    TypeOrmModule.forFeature([WorkspaceEntity]),
    WorkSpaceUseCaseModule,
  ],
  controllers: [WorkSpacesController],
  providers: [WorkSpacesService],
})
export class WorkspacesModule {}
