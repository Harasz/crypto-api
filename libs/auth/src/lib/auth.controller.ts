import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { SignInUserCommand } from './commands/impl';
import { SignInBodyDto, SignInResponseDto } from './dtos';

@ApiTags('Auth')
@Controller('sign-in')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiBadRequestResponse({ description: 'Request body invalid schema.' })
  @ApiCreatedResponse({
    type: SignInResponseDto,
    description: 'Successfully signed in.',
  })
  async signIn(@Body() body: SignInBodyDto) {
    return await this.commandBus.execute(
      new SignInUserCommand(body.email, body.password)
    );
  }
}
