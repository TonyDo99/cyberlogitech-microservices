import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthenticationDto } from './dto/create-user.dto';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('user')
  async register(@Body() createUserDto: AuthenticationDto) {
    try {
      return await this.apiGatewayService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('user')
  async login(@Body() authenticationDto: AuthenticationDto) {
    try {
      return await this.apiGatewayService.login(authenticationDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
