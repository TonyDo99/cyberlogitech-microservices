import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import { catchError } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkSpaceClientService } from './workspace.service';

@Controller('workspace')
export class WorkSpaceGatewayController {
  constructor(
    private readonly workspaceClientService: WorkSpaceClientService,
  ) {}
  
  // @UseGuards(JwtAuthGuard)
  @Post()
  createWorkspace(@Body() createWorkSpaceDto: CreateWorkSpaceDto) {
    return this.workspaceClientService.createWorkspace(createWorkSpaceDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
