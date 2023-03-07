import { Module } from '@nestjs/common';
import { WorkSpaceRepositoryModule } from '../repository';
import { IWorkSpaceUseCase } from './workspace.interface';
import { WorkSpaceUseCase } from './workspace.usecase';

@Module({
  imports: [WorkSpaceRepositoryModule],
  providers: [
    {
      provide: IWorkSpaceUseCase,
      useClass: WorkSpaceUseCase,
    },
  ],
  exports: [IWorkSpaceUseCase],
})
export class WorkSpaceUseCaseModule {}
