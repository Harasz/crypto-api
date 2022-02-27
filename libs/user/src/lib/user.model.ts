import * as argon2 from 'argon2';

export class User {
  constructor(
    public readonly email: string,
    public readonly password_hash: string
  ) {}

  async verifyPassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password_hash, password);
  }
}
