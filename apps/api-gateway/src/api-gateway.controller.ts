import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthenticationDto } from './dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('user')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('register')
  async register(@Body() createUserDto: AuthenticationDto) {
    try {
      return (await this.apiGatewayService.createUser(createUserDto)).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  profile(@Request() req) {
    return this.apiGatewayService.userinfo(req.user);
  }

  @Get('login')
  login(@Body() authenticationDto: AuthenticationDto) {
    return this.apiGatewayService.login(authenticationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('refreshToken')
  refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.apiGatewayService.refreshToken(refreshToken).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
