import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import * as crypto from 'crypto';
import { generateKeys, KeyPair } from '@nest-demo/rsa-generation';

import { EncryptService } from '../encrypt.service';

describe('Encrypt service', () => {
  let keyPair: KeyPair;
  let service: EncryptService;
  let samplePdf: Buffer;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, HttpModule],
      providers: [EncryptService],
    }).compile();

    service = moduleRef.get(EncryptService);

    keyPair = await generateKeys();
    samplePdf = await service['getSamplePdfBuffer']();
  });

  it('should encrypt using hybrid method and decrypt', async () => {
    const { data, key, iv, algorithm } = await service['hybridEncryption'](
      keyPair.publicKey,
      samplePdf
    );

    expect(data).toBeDefined();
    expect(key).toBeDefined();
    expect(iv).toBeDefined();

    const decryptedKey = crypto.privateDecrypt(
      {
        key: keyPair.privateKey,
        passphrase: '',
      },
      Buffer.from(key, 'base64')
    );

    const decipher = crypto.createDecipheriv(
      algorithm,
      decryptedKey,
      Buffer.from(iv, 'base64')
    );

    const decrypted = Buffer.concat([
      decipher.update(data, 'base64'),
      decipher.final(),
    ]);
    expect(decrypted.toString('base64')).toBe(samplePdf.toString('base64'));
  });

  it('should encrypt using blocks method and decrypt', async () => {
    const { blocks, blocksNumber, blocksSize } = await service[
      'encryptWithBlocks'
    ](keyPair.publicKey, samplePdf);

    expect(blocks).toBeDefined();
    expect(blocksNumber).toBeDefined();
    expect(blocksSize).toBeDefined();

    const decryptedBuffer = blocks.reduce((acc, block) => {
      const decryptedBlock = crypto.privateDecrypt(
        {
          key: keyPair.privateKey,
          passphrase: '',
        },
        Buffer.from(block, 'base64')
      );

      return Buffer.concat([acc, decryptedBlock]);
    }, Buffer.from([]));

    expect(decryptedBuffer.toString('base64')).toBe(
      samplePdf.toString('base64')
    );
  });
});
