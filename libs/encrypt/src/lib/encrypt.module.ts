import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';

import { EncryptController } from './ecnrypt.controller';
import { EncryptService } from './encrypt.service';

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [EncryptController],
  providers: [EncryptService],
})
export class EncryptModule {}
