import { Body, Controller, Post } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import { catchError } from 'rxjs';
import { WorkSpaceClientService } from './workspace.service';

@Controller('workspace')
export class WorkSpaceGatewayController {
  constructor(
    private readonly workspaceClientService: WorkSpaceClientService,
  ) {}

  @Post()
  createWorkspace(@Body() createWorkSpaceDto: CreateWorkSpaceDto) {
    return this.workspaceClientService.createWorkspace(createWorkSpaceDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
