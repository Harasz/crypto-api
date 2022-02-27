import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from '@nest-demo/config';
import { User, UserByEmailQuery } from '@nest-demo/user';

import { SignInUserCommand } from '../impl';
import { AuthToken } from '../../auth.types';

@CommandHandler(SignInUserCommand)
export class SingInUserCommandHandler
  implements ICommandHandler<SignInUserCommand>
{
  constructor(
    private readonly applicationConfig: AppConfigService,
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: SignInUserCommand) {
    const { email, password } = command;

    const user = await this.queryBus.execute<
      UserByEmailQuery,
      User | undefined
    >(new UserByEmailQuery(email));

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await user.verifyPassword(password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: AuthToken = {
      email,
    };

    const authToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.applicationConfig.AUTH_TOKEN_EXPIRES_IN,
    });

    return { authToken };
  }
}
