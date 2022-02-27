import { Keys } from '../keys.model';

export abstract class KeysRepository {
  abstract addKey(ownerId: string): Promise<Keys>;
  abstract findKeyByOwnerId(ownerId: string): Promise<Keys | undefined>;
}

export const KeysRepositoryToken = KeysRepository.name;
