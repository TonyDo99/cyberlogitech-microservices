import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AuthenticationDto {
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  @IsEmail()
  public readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  @IsStrongPassword({
    minUppercase: 3,
    minLowercase: 3,
    minNumbers: 1,
    minSymbols: 1,
    minLength: 6,
  })
  public readonly password: string;
}
