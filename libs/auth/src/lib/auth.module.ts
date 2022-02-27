import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppJwtModule } from '@nest-demo/jwt';

import { AuthController } from './auth.controller';
import { COMMANDS_HANDLERS } from './commands/handlers';

@Module({
  imports: [AppJwtModule, CqrsModule],
  controllers: [AuthController],
  providers: [...COMMANDS_HANDLERS],
  exports: [...COMMANDS_HANDLERS],
})
export class AuthModule {}
