import { CreateWorkSpaceDto } from 'libs/common/dto/workspace/create-workspace.dto';

export const IWorkSpaceUseCase = 'IWorkSpaceUseCase';

export interface IWorkSpaceUseCase {
  createWorkSpace(createWorkSpaceDto: CreateWorkSpaceDto): Promise<string>;
}
