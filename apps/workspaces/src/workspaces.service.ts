import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspacesService {
  getHello(): string {
    return 'Hello World!';
  }
}
