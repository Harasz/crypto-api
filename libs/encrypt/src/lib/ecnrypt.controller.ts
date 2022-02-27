import { Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Auth, User } from '@nest-demo/auth';

import { EncryptService } from './encrypt.service';

@Auth()
@ApiTags('Encrypt')
@Controller('encrypt')
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}

  @Post('/')
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  @ApiCreatedResponse({ description: 'Encrypted sample PDF.' })
  async encrypt(@User() user: User): Promise<any> {
    return await this.encryptService.getEncryptedSamplePdf(user.email);
  }
}
