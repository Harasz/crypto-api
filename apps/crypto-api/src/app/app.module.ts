import { Module } from '@nestjs/common';

import { AppConfigModule } from '@nest-demo/config';
import { AppJwtModule } from '@nest-demo/jwt';

import { AuthModule } from '@nest-demo/auth';
import { UserModule } from '@nest-demo/user';
import { KeysModule } from '@nest-demo/keys';
import { EncryptModule } from '@nest-demo/encrypt';

const CONFIG_MODULES = [AppConfigModule, AppJwtModule];
const DOMAIN_MODULES = [AuthModule, UserModule, KeysModule, EncryptModule];

@Module({
  imports: [...CONFIG_MODULES, ...DOMAIN_MODULES],
})
export class AppModule {}
