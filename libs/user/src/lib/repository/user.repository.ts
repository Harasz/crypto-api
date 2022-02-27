import { User } from '../user.model';
import { CreateUserDTO } from '../user.types';

export abstract class UserRepository {
  abstract addUser(user: CreateUserDTO): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | undefined>;
}

export const UserRepositoryToken = UserRepository.name;
