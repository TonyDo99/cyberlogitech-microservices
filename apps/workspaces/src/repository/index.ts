import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from 'libs/common/entities/workspace.entity';
import { WorkSpaceRepository } from './workspace.repository';
import { IWorkSpaceRepository } from './workspace.interface';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
  providers: [
    {
      provide: IWorkSpaceRepository,
      useClass: WorkSpaceRepository,
    },
  ],
  exports: [IWorkSpaceRepository],
})
export class WorkSpaceRepositoryModule {}
