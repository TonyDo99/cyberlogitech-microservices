import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import { WorkSpacesService } from './workspaces.service';

@Controller()
export class WorkSpacesController {
  constructor(private readonly workSpacesService: WorkSpacesService) {}

  @MessagePattern('workspace-create')
  async createWorkSpace(@Payload() createWorkSpaceDto: CreateWorkSpaceDto) {
    try {
      return await this.workSpacesService.createWorkSpace(createWorkSpaceDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
