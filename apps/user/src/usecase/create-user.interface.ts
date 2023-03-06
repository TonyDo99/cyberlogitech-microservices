import { AuthenticationDto } from '../dto/create-user.dto';

export const IAuthenticationUseCase = Symbol.for('IAuthenticationUseCase');

export interface IAuthenticationUseCase {
  createUser(authenticationDto: AuthenticationDto): Promise<string>;

  login(authenticationDto: AuthenticationDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }>;
}
