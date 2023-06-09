import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { InsertResult } from 'typeorm';
import { AuthenticationDto } from './dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private readonly logger = new Logger(ApiGatewayService.name);
  constructor(@Inject('USER') private readonly userClient: ClientKafka) {}
  async onModuleInit() {
    this.userClient.subscribeToResponseOf('user-create');
    this.userClient.subscribeToResponseOf('user-login');
    this.userClient.subscribeToResponseOf('user-refreshtoken');
    this.userClient.subscribeToResponseOf('user-info');
    await this.userClient.connect();
  }

  async createUser(
    authenticationDto: AuthenticationDto,
  ): Promise<Observable<InsertResult>> {
    return this.userClient.send('user-create', authenticationDto);
  }

  login(authenticationDto: AuthenticationDto): Observable<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    return this.userClient.send('user-login', authenticationDto);
  }

  userinfo(useremail: string): Observable<any> {
    return this.userClient.send('user-info', useremail);
  }

  refreshToken(refreshToken: RefreshTokenDto): Observable<any> {
    return this.userClient.send('user-refreshtoken', refreshToken);
  }
}
