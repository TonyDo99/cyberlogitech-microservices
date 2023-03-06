import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthenticationDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user-create')
  async register(@Payload() createUserDto: AuthenticationDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('user-login')
  async login(@Payload() authenticationDto: AuthenticationDto) {
    try {
      return await this.userService.login(authenticationDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
