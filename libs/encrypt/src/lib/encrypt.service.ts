import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { KeyPair } from '@nest-demo/rsa-generation';
import { GenerateKeysCommand } from '@nest-demo/keys';

import { BlockEncryption, HybridEncryption } from './encrypt.types';

@Injectable()
export class EncryptService {
  private samplePdfCache: Buffer | null = null;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly httpService: HttpService
  ) {}

  private async getSamplePdfBuffer(): Promise<Buffer> {
    if (this.samplePdfCache) return this.samplePdfCache;

    const samplePdfUrl = 'http://www.africau.edu/images/default/sample.pdf';
    const observableData = this.httpService.get(samplePdfUrl);
    const { data } = await firstValueFrom(observableData);
    this.samplePdfCache = Buffer.from(data);
    return this.samplePdfCache;
  }

  private async encryptWithBlocks(
    publicKey: string,
    data: Buffer
  ): Promise<BlockEncryption> {
    const encryptedBlocks: Buffer[] = [];
    const chunkLength = 128;

    for (let i = 0; i < data.length; i += chunkLength) {
      const chunk = data.slice(i, i + chunkLength);
      const encryptedChunkData = crypto.publicEncrypt(
        {
          key: publicKey,
        },
        chunk
      );
      encryptedBlocks.push(encryptedChunkData);
    }

    return {
      blocksNumber: encryptedBlocks.length,
      blocksSize: chunkLength,
      blocks: encryptedBlocks.map((block) => block.toString('base64')),
    };
  }

  private async hybridEncryption(
    publicKey: string,
    data: Buffer
  ): Promise<HybridEncryption> {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(
      crypto.randomBytes(32),
      crypto.randomBytes(32),
      32
    );
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

    const encryptedKey = crypto.publicEncrypt(
      {
        key: publicKey,
      },
      key
    );

    return {
      data: encryptedData.toString('base64'),
      key: encryptedKey.toString('base64'),
      iv: iv.toString('base64'),
      algorithm,
    };
  }

  async getEncryptedSamplePdf(keyOwnerId: string): Promise<unknown> {
    const keyPair: KeyPair = await this.commandBus.execute(
      new GenerateKeysCommand(keyOwnerId)
    );

    const samplePdfBuffer = await this.getSamplePdfBuffer();
    return this.hybridEncryption(keyPair.publicKey, samplePdfBuffer);
  }
}
