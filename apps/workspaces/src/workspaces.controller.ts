import { Controller, Get } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

@Controller()
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  getHello(): string {
    return this.workspacesService.getHello();
  }
}
