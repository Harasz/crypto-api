import { generateKeyPair } from 'crypto';

export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

export const generateKeys = () => {
  return new Promise<KeyPair>((resolve, reject) => {
    generateKeyPair(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: '',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            publicKey,
            privateKey,
          });
        }
      }
    );
  });
};
