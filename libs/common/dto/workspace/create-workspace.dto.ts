import {
  IsArray,
  IsDefined,
  IsEmail,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from 'libs/common/entities/user.entity';

export class CreateWorkSpaceDto {
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  public readonly hostWorkspace: UserEntity;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  public readonly workspaceName: string;

  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  public readonly avatar: string;

  @IsDefined()
  @IsNumber()
  @Min(1)
  public readonly members: number;

  @IsDefined()
  @IsArray()
  @IsString({
    each: true,
  })
  public readonly invited: string[];

  @IsOptional()
  @IsDefined()
  @IsHexColor()
  public readonly color: string;
}
