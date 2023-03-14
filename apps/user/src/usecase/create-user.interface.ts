import { RefreshTokenDto } from 'apps/api-gateway/src/dto/refreshtoken-data.dto';
import { AuthenticationDto } from '../dto/create-user.dto';

export const IAuthenticationUseCase = Symbol.for('IAuthenticationUseCase');

export interface IAuthenticationUseCase {
  createUser(authenticationDto: AuthenticationDto): Promise<string>;

  login(authenticationDto: AuthenticationDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }>;

  getrefreshtoken(refreshToken: RefreshTokenDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }>;
}
