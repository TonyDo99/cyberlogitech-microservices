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
import { RefressTokenDto } from './dto/refresstoken-data.dto';

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
  infouser(@Request() req) {
    return this.apiGatewayService.info(req);
  }

  @Get('login')
  login(@Body() authenticationDto: AuthenticationDto) {
    return this.apiGatewayService.login(authenticationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('refresstoken')
  refresstoken(@Body() refresstoken: RefressTokenDto) {
    return this.apiGatewayService.refresstoken(refresstoken).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
