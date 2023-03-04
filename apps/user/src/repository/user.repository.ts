import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'libs/common/entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { AuthenticationDto } from '../dto/create-user.dto';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  register(createUserDto: AuthenticationDto): Promise<InsertResult>;

  login(loginUserDto: AuthenticationDto): Promise<Omit<UserEntity, 'password'>>;

  findUserByEmail(email: string): Promise<UserEntity>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  async register(authenticationDto: AuthenticationDto): Promise<InsertResult> {
    return await this.userRepository.insert(authenticationDto);
  }

  async login(
    loginUserDto: AuthenticationDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.findUserByEmail(loginUserDto.email);

    if (user && compareSync(loginUserDto.password, user.password)) return user;
    else throw new BadRequestException('Wrong password, please check again !');
  }
}
