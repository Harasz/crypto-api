import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as argon2 from 'argon2';

import { User } from '../user.model';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from '../user.types';

@Injectable()
export class UserRepositoryMemoryAdapter
  implements OnModuleInit, UserRepository
{
  USERS: User[] = [];

  async onModuleInit(): Promise<void> {
    await Promise.all([
      this.addUser({
        email: 'admin@example.com',
        password: 'administrator',
      }),
      this.addUser({
        email: 'mod@example.com',
        password: 'moderator',
      }),
    ]);

    Logger.log(
      `Users added to memory adapter: ${this.USERS.map((user) => user.email)}`,
      UserRepositoryMemoryAdapter.name
    );
  }

  async addUser({ password, email }: CreateUserDTO): Promise<User> {
    const hash = await argon2.hash(password);
    const user = new User(email, hash);
    this.USERS.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.USERS.find((user) => user.email === email);
  }
}
