import { Controller, Get } from '@nestjs/common';
import { SpacesService } from './spaces.service';

@Controller()
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Get()
  getHello(): string {
    return this.spacesService.getHello();
  }
}
