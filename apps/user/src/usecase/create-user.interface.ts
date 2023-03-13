import { RefressTokenDto } from 'apps/api-gateway/src/dto/refresstoken-data.dto';
import { AuthenticationDto } from '../dto/create-user.dto';

export const IAuthenticationUseCase = Symbol.for('IAuthenticationUseCase');

export interface IAuthenticationUseCase {
  createUser(authenticationDto: AuthenticationDto): Promise<string>;

  login(authenticationDto: AuthenticationDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }>;

  getrefresstoken(refresstoken: RefressTokenDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }>;
}
