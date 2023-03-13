import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefressTokenDto } from 'apps/api-gateway/src/dto/refresstoken-data.dto';
import { compareSync } from 'bcrypt';
import { options } from 'joi';
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
    const exists = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!exists)
      throw new NotFoundException('User not found, please check again !');
    else return exists;
  }

  async register(authenticationDto: AuthenticationDto): Promise<string> {
    return JSON.stringify(await this.userRepository.insert(authenticationDto));
  }

  private generateTokens(user: any): {
    accessToken: string;
    refressToken: string;
  } {
    const accesspayload = { username: user.email, sub: user._id };
    const refresspayload = { username: user.email, sub: user._id };
    const accessToken = this.jwtSecret.sign(accesspayload);
    const refressToken = this.jwtSecret.sign(refresspayload, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: '2h',
    });
    return { accessToken, refressToken };
  }

  async login(loginUserDto: AuthenticationDto): Promise<{
    refressToken: string;
    accessToken: string;
    tokenType: string;
    expiresIn: string;
    expiresInRefress: string;
  }> {
    const user = await this.findUserByEmail(loginUserDto.email);
    if (user && compareSync(loginUserDto.password, user.password)) {
      const { accessToken, refressToken } = this.generateTokens(user);
      await this.userRepository.update(user._id, {
        refressToken: refressToken,
      });
      return {
        accessToken: accessToken,
        refressToken: refressToken,
        tokenType: 'Bearer',
        expiresIn: '1h',
        expiresInRefress: '2h',
      };
    } else
      throw new BadRequestException('Wrong password, please check again !');
  }

  async refresstoken(refresstoken: RefressTokenDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    const payload = await this.jwtSecret.verify(refresstoken.refresstoken, {
      secret: process.env.SECRET_KEY_REFRESH,
    });
    const user = await this.findUserByEmail(payload.username);
    if (user.refressToken !== refresstoken.refresstoken) {
      throw new NotFoundException('Refress token is not match!');
    }
    const { accessToken } = this.generateTokens(user);
    const data = {
      accessToken: accessToken,
      tokenType: 'Bearer',
      expiresIn: '1h',
    };
    return data;
  }
}
