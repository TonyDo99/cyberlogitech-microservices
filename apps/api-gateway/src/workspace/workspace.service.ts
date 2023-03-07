import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';
import { Observable } from 'rxjs';
import { InsertResult } from 'typeorm';

@Injectable()
export class WorkSpaceClientService implements OnModuleInit {
  constructor(
    @Inject('WORKSPACES') private readonly workspaceClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.workspaceClient.subscribeToResponseOf('workspace-create');
    await this.workspaceClient.connect();
  }

  createWorkspace(
    createWorkspaceDto: CreateWorkSpaceDto,
  ): Observable<InsertResult> {
    return this.workspaceClient.send('workspace-create', createWorkspaceDto);
  }
}
