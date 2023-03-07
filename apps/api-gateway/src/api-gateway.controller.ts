import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';
import { AuthenticationDto } from './dto/create-user.dto';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('user')
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

  @Get('user')
  login(@Body() authenticationDto: AuthenticationDto) {
    return this.apiGatewayService.login(authenticationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
