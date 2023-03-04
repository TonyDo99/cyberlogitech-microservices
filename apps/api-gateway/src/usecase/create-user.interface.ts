import { UserEntity } from 'libs/common/entities/user.entity';
import { InsertResult } from 'typeorm';
import { AuthenticationDto } from '../dto/create-user.dto';

export const IAuthenticationUseCase = Symbol.for('IAuthenticationUseCase');

export interface IAuthenticationUseCase {
  createUser(authenticationDto: AuthenticationDto): Promise<InsertResult>;

  login(
    authenticationDto: AuthenticationDto,
  ): Promise<Omit<UserEntity, 'password'>>;
}
