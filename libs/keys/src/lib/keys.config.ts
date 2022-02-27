import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { AppConfigService } from '@nest-demo/config';

@Injectable()
export class KeysService implements JwtOptionsFactory {
  constructor(private readonly configService: AppConfigService) {}

  async createJwtOptions(): Promise<JwtModuleOptions> {
    return {
      secret: this.configService.JWT_SECRET,
    };
  }
}
