import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '../../user.model';
import { UserRepository } from '../../user.repository';
import { UserByEmailQuery } from '../impl';

@QueryHandler(UserByEmailQuery)
export class UserByEmailHandler implements IQueryHandler<UserByEmailQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: UserByEmailQuery): Promise<User | undefined> {
    return this.repository.findUserByEmail(query.email);
  }
}
