import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { KeysRepository, KeysRepositoryMemoryAdapter } from './repository';
import { COMMANDS_HANDLERS } from './commands/handler';
import { KeysController } from './keys.controller';

@Module({
  imports: [CqrsModule],
  controllers: [KeysController],
  providers: [
    {
      provide: KeysRepository,
      useValue: new KeysRepositoryMemoryAdapter(),
    },
    ...COMMANDS_HANDLERS,
  ],
  exports: [...COMMANDS_HANDLERS],
})
export class KeysModule {}
