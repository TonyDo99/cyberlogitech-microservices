import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import { IWorkSpaceRepository } from '../repository/workspace.interface';
import { WorkSpaceRepository } from '../repository/workspace.repository';
import { IWorkSpaceUseCase } from './workspace.interface';

@Injectable()
export class WorkSpaceUseCase implements IWorkSpaceUseCase {
  constructor(
    @Inject(IWorkSpaceRepository)
    private readonly workspaceRepository: WorkSpaceRepository,
  ) {}

  async createWorkSpace(
    createWorkSpaceDto: CreateWorkSpaceDto,
  ): Promise<string> {
    return await this.workspaceRepository.createWorkSpace(createWorkSpaceDto);
  }
}
