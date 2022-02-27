import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Auth, User } from '@nest-demo/auth';
import { User as IUser } from '@nest-demo/user';

import { GenerateKeysCommand } from './commands/impl';
import { GenerateKeysResponseDto } from './dtos';

@Auth()
@ApiTags('Keys')
@Controller('generate-key-pair')
export class KeysController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  @ApiCreatedResponse({
    description: 'Successfully generated key pair.',
    type: GenerateKeysResponseDto,
  })
  async generateKeyPair(@User() user: IUser) {
    return await this.commandBus.execute(new GenerateKeysCommand(user.email));
  }
}
