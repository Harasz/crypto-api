export class SignInUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
