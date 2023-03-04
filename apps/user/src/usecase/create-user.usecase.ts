import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'libs/common/entities/user.entity';
import { InsertResult } from 'typeorm';
import { AuthenticationDto } from '../dto/create-user.dto';
import { IUserRepository, UserRepository } from '../repository/user.repository';
import { IAuthenticationUseCase } from './create-user.interface';

@Injectable()
export class UserUseCase implements IAuthenticationUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: UserRepository,
  ) {}
  async login(
    authenticationDto: AuthenticationDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    return await this.userRepository.login(authenticationDto);
  }

  public async createUser(
    createUserDto: AuthenticationDto,
  ): Promise<InsertResult> {
    return await this.userRepository.register(createUserDto);
  }
}
