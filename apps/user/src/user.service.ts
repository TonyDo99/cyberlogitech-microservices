import { Inject, Injectable, Logger } from '@nestjs/common';
import { RefreshTokenDto } from 'apps/api-gateway/src/dto/refreshtoken-data.dto';
import { hashingFunc } from 'libs/common/utils/hashing';
import { AuthenticationDto } from './dto/create-user.dto';
import { IAuthenticationUseCase } from './usecase/create-user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(IAuthenticationUseCase)
    private readonly userUseCase: IAuthenticationUseCase,
  ) {}
  async createUser(authenticationDto: AuthenticationDto): Promise<string> {
    this.logger.log('Register service is running !');
    const hash = await hashingFunc(authenticationDto.password, 10);
    return await this.userUseCase.createUser({
      ...authenticationDto,
      password: hash,
    });
  }

  async login(authenticationDto: AuthenticationDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    this.logger.log('Login service is running !');

    return await this.userUseCase.login(authenticationDto);
  }

  async getrefreshtoken(refreshToken: RefreshTokenDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    return await this.userUseCase.getrefreshtoken(refreshToken);
  }
}
