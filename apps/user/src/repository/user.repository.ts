import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'libs/common/entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
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

  async login(loginUserDto: AuthenticationDto): Promise<{
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    const user = await this.findUserByEmail(loginUserDto.email);

    if (user && compareSync(loginUserDto.password, user.password))
      return {
        accessToken: this.jwtSecret.sign({ email: user.email }),
        tokenType: 'Bearer',
        expiresIn: '1h',
      };
    else throw new BadRequestException('Wrong password, please check again !');
  }
}
