import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'libs/common/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthenticationDto } from '../dto/create-user.dto';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  register(createUserDto: AuthenticationDto): Promise<string>;

  login(loginUserDto: AuthenticationDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }>;

  findUserByEmail(email: string): Promise<UserEntity>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtSecret: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const exists = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!exists)
        throw new RpcException('User not found, please check again !');
      return exists;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async register(authenticationDto: AuthenticationDto): Promise<string> {
    try {
      return JSON.stringify(
        await this.userRepository.insert(authenticationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  generateTokens(user: UserEntity): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return new Promise((resolve, reject) => {
      const payload = { email: user.email };
      const accessToken = this.jwtSecret.sign(payload);
      const refreshToken = this.jwtSecret.sign(payload, {
        secret: process.env.SECRET_KEY_REFRESH,
      });
      if (accessToken && refreshToken) resolve({ accessToken, refreshToken });
      else reject('generateTokens get errors');
    });
  }

  async login(loginUserDto: AuthenticationDto): Promise<{
    refreshToken: string;
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    try {
      const user = await this.findUserByEmail(loginUserDto.email);
      if (user && compareSync(loginUserDto.password, user.password)) {
        const { accessToken, refreshToken } = await this.generateTokens(user);
        await this.userRepository.update(user._id, {
          refreshToken,
        });
        return {
          accessToken,
          refreshToken,
          tokenType: 'Bearer',
          expiresIn: '1h',
        };
      } else throw new RpcException('Wrong password, please check again !');
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    try {
      const payload = await this.jwtSecret.verify(refreshToken, {
        secret: process.env.SECRET_KEY_REFRESH,
      });
      const user = await this.findUserByEmail(payload.username);
      if (user.refreshToken !== refreshToken) {
        throw new RpcException('refresh token is not match!');
      }
      const genTokens = await this.generateTokens(user);
      return {
        ...genTokens,
        tokenType: 'Bearer',
        expiresIn: '1h',
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
