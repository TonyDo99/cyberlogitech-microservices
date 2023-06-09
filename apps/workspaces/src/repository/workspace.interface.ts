import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';

export const IWorkSpaceRepository = Symbol('IWorkSpaceRepository');

export interface IWorkSpaceRepository {
  createWorkSpace(createWorkSpaceDto: CreateWorkSpaceDto): Promise<string>;
}
