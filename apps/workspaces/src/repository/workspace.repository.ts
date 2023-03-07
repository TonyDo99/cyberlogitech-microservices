import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import { WorkspaceEntity } from 'libs/common/entities/workspace.entity';
import { Repository } from 'typeorm';
import { IWorkSpaceRepository } from './workspace.interface';

@Injectable()
export class WorkSpaceRepository implements IWorkSpaceRepository {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceEntity: Repository<WorkspaceEntity>,
  ) {}

  async createWorkSpace(
    createWorkSpaceDto: CreateWorkSpaceDto,
  ): Promise<string> {
    const workspace = this.workspaceEntity.create({
      ...createWorkSpaceDto,
      invitedMail: createWorkSpaceDto.invited.map((mail) => ({
        invited: mail,
      })),
    });

    return JSON.stringify(await this.workspaceEntity.save(workspace));
  }
}
