import { Injectable } from '@nestjs/common';

@Injectable()
export class SpacesService {
  getHello(): string {
    return 'Hello World!';
  }
}
