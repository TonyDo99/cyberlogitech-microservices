import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';

@Module({
  imports: [],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}
