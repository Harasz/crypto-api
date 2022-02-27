import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from './config.types';

@Injectable()
export class AppConfigService implements AppConfig {
  constructor(private readonly configService: ConfigService) {}

  get APP_PORT(): number {
    return this.configService.get<number>('APP_PORT', 3000);
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>('JWT_SECRET', "I'm a secret");
  }

  get AUTH_TOKEN_EXPIRES_IN(): string {
    return this.configService.get<string>('AUTH_TOKEN_EXPIRES_IN', '5min');
  }
}
