import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { QUERIES_HANDLERS } from './queries/handler';
import { UserRepository, UserRepositoryMemoryAdapter } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: UserRepository,
      useValue: new UserRepositoryMemoryAdapter(),
    },
    ...QUERIES_HANDLERS,
  ],
  exports: [...QUERIES_HANDLERS],
})
export class UserModule {}
