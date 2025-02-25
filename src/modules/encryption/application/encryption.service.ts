import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import configuration from 'src/config/configuration';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;
  private readonly ivLength = 16;
  private readonly saltRounds = 10;

  constructor() {
    if (!configuration().encryption.key) {
      throw new Error('ENCRYPTION_KEY is not defined');
    }
    this.key = Buffer.from(configuration().encryption.key, 'hex');
  }

  encrypt(plainText: string): Buffer {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(plainText, 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return Buffer.concat([iv, authTag, encrypted]);
  }

  decrypt(encryptedBuffer: Buffer): string {
    const totalLength = encryptedBuffer.length;
    if (totalLength < this.ivLength + 16) {
      throw new Error(`Invalid encrypted data length: ${totalLength}`);
    }

    const iv = encryptedBuffer.subarray(0, this.ivLength);
    const authTag = encryptedBuffer.subarray(this.ivLength, this.ivLength + 16);
    const encryptedData = encryptedBuffer.subarray(this.ivLength + 16);

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);

    try {
      const decrypted = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final(),
      ]);
      return decrypted.toString('utf8');
    } catch (error) {
      console.error('Decryption failed:', error.message);
      throw new Error('Decryption failed. Ensure the data is intact.');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
