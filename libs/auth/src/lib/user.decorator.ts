import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as IUser } from '@nest-demo/user';

export type User = IUser;
export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUser;
  }
);
