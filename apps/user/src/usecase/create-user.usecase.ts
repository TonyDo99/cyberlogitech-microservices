import { Inject, Injectable } from '@nestjs/common';
import { RefressTokenDto } from 'apps/api-gateway/src/dto/refresstoken-data.dto';
import { AuthenticationDto } from '../dto/create-user.dto';
import { IUserRepository, UserRepository } from '../repository/user.repository';
import { IAuthenticationUseCase } from './create-user.interface';

@Injectable()
export class UserUseCase implements IAuthenticationUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: UserRepository,
  ) {}
  async login(authenticationDto: AuthenticationDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    return await this.userRepository.login(authenticationDto);
  }

  public async createUser(createUserDto: AuthenticationDto): Promise<string> {
    return await this.userRepository.register(createUserDto);
  }
  public async getrefresstoken(refresstoken: RefressTokenDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    return await this.userRepository.refresstoken(refresstoken);
  }
}
