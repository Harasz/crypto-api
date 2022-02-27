import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

import { ValidateRequestCommand } from '../impl';
import { AuthToken } from '../../auth.types';

@CommandHandler(ValidateRequestCommand)
export class ValidateRequestCommandHandler
  implements ICommandHandler<ValidateRequestCommand>
{
  constructor(private readonly jwtService: JwtService) {}

  async execute(command: ValidateRequestCommand) {
    const { authToken } = command;

    try {
      return await this.jwtService.verifyAsync<AuthToken>(authToken);
    } catch {
      throw new UnauthorizedException('Provided token is invalid or expired');
    }
  }
}
