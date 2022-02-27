import { Injectable } from '@nestjs/common';
import { generateKeys } from '@nest-demo/rsa-generation';

import { Keys } from '../keys.model';
import { KeysRepository } from './keys.repository';

@Injectable()
export class KeysRepositoryMemoryAdapter implements KeysRepository {
  KEYS: Keys[] = [];

  async addKey(ownerId: string): Promise<Keys> {
    const { publicKey, privateKey } = await generateKeys();

    const key = new Keys(privateKey, publicKey, ownerId);
    this.KEYS.push(key);

    return key;
  }

  async findKeyByOwnerId(ownerId: string): Promise<Keys | undefined> {
    return this.KEYS.find((key) => key.ownerId === ownerId);
  }
}
