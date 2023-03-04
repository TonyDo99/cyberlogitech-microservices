import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/common/entities/user.entity';
import { WorkspaceEntity } from 'libs/common/entities/workspace.entity';
import { IUserRepository, UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WorkspaceEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class UserRepositoryModule {}
