import { IsDefined, IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsDefined()
  @IsNotEmpty()
  @IsJWT()
  public readonly refreshToken: string;
}
