import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'apps/api-gateway/src/auth/strategies/jwt.strategy';
import { UserEntity } from 'libs/common/entities/user.entity';
import { WorkspaceEntity } from 'libs/common/entities/workspace.entity';
import { IUserRepository, UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WorkspaceEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY'),
        signOptions: {
          expiresIn: 60,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    JwtStrategy
  ],
  exports: [IUserRepository],
})
export class UserRepositoryModule {}
