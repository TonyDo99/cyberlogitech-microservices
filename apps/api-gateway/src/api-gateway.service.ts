import { Inject, Injectable, Logger } from '@nestjs/common';
import { hashingFunc } from 'libs/common/utils/hashing';
import { InsertResult } from 'typeorm';
import { AuthenticationDto } from './dto/create-user.dto';
import { IAuthenticationUseCase } from './usecase/create-user.interface';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);
  constructor(
    @Inject(IAuthenticationUseCase)
    private readonly userUseCase: IAuthenticationUseCase,
  ) {}

  async createUser(
    authenticationDto: AuthenticationDto,
  ): Promise<InsertResult> {
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
}
