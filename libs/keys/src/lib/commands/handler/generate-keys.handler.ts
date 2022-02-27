import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KeyPair } from '@nest-demo/rsa-generation';

import { KeysRepository } from '../../repository/keys.repository';
import { GenerateKeysCommand } from '../impl';

@CommandHandler(GenerateKeysCommand)
export class GenerateKeysHandler
  implements ICommandHandler<GenerateKeysCommand>
{
  constructor(private readonly repository: KeysRepository) {}

  async execute(query: GenerateKeysCommand): Promise<KeyPair> {
    let keyPair = await this.repository.findKeyByOwnerId(query.ownerId);

    if (!keyPair) {
      keyPair = await this.repository.addKey(query.ownerId);
    }

    return {
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey,
    };
  }
}
