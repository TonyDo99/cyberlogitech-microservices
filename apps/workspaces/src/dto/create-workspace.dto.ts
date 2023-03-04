import { IsDefined, IsNotEmpty, IsNumberString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkSpaceDto {
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  public readonly workSpace: string;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  public readonly avatar: string;

  @IsDefined()
  @IsNumberString()
  @Min(1)
  public readonly members: number;
}
