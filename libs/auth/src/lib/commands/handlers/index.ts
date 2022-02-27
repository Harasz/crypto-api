import { SingInUserCommandHandler } from './sign-in-user.handler';
import { ValidateRequestCommandHandler } from './validate-request.handler';

export const COMMANDS_HANDLERS = [
  SingInUserCommandHandler,
  ValidateRequestCommandHandler,
];
