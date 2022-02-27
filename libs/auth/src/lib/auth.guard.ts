import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { UserByEmailQuery } from '@nest-demo/user';

import { AuthToken } from './auth.types';
import { ValidateRequestCommand } from './commands/impl';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authToken = this.extractTokenFromRequest(request);

    if (!authToken) {
      throw new UnauthorizedException('Missing auth token');
    }

    const tokenPayload: AuthToken = await this.commandBus.execute(
      new ValidateRequestCommand(authToken)
    );

    request.user = await this.queryBus.execute(
      new UserByEmailQuery(tokenPayload.email)
    );

    return true;
  }

  extractTokenFromRequest(req: Request): string | undefined {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.slice('Bearer '.length);
    return token;
  }
}

export const Auth = () =>
  applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());
