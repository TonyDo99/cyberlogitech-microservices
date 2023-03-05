import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repository';
import { IAuthenticationUseCase } from './create-user.interface';
import { UserUseCase } from './create-user.usecase';

@Module({
  imports: [UserRepositoryModule],
  providers: [
    {
      provide: IAuthenticationUseCase,
      useClass: UserUseCase,
    },
  ],
  exports: [IAuthenticationUseCase],
})
export class UserUseCaseModule {}
