/**
 * Field-Level Encryption for NEWTUBE
 * 
 * Provides encryption/decryption for sensitive data like OAuth tokens
 * Uses AES-256-GCM for authenticated encryption.
 */

import crypto from 'crypto';
import { logger } from './logger';

// Encryption configuration
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 128 bits
const TAG_LENGTH = 16; // 128 bits
const KEY_LENGTH = 32; // 256 bits

/**
 * Get encryption key from environment
 */
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  
  if (key.length !== KEY_LENGTH) {
    throw new Error(`ENCRYPTION_KEY must be exactly ${KEY_LENGTH} characters long`);
  }
  
  return Buffer.from(key, 'utf8');
}

/**
 * Encrypt a string value
 */
export function encrypt(plaintext: string): string {
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher(ALGORITHM, key);
    
    cipher.setAAD(Buffer.from('newtube-field-encryption'));
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    // Combine IV + tag + encrypted data
    const combined = iv.toString('hex') + tag.toString('hex') + encrypted;
    
    return combined;
  } catch (error) {
    logger.error('Encryption failed', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt a string value
 */
export function decrypt(encryptedData: string): string {
  try {
    const key = getEncryptionKey();
    
    // Extract IV, tag, and encrypted data
    const ivHex = encryptedData.slice(0, IV_LENGTH * 2);
    const tagHex = encryptedData.slice(IV_LENGTH * 2, (IV_LENGTH + TAG_LENGTH) * 2);
    const encrypted = encryptedData.slice((IV_LENGTH + TAG_LENGTH) * 2);
    
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    
    const decipher = crypto.createDecipher(ALGORITHM, key);
    decipher.setAuthTag(tag);
    decipher.setAAD(Buffer.from('newtube-field-encryption'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    logger.error('Decryption failed', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Encrypt OAuth tokens for database storage
 */
export function encryptOAuthTokens(tokens: {
  accessToken: string;
  refreshToken?: string;
}) {
  return {
    accessTokenEnc: encrypt(tokens.accessToken),
    refreshTokenEnc: tokens.refreshToken ? encrypt(tokens.refreshToken) : null,
  };
}

/**
 * Decrypt OAuth tokens from database
 */
export function decryptOAuthTokens(encryptedTokens: {
  accessTokenEnc: string;
  refreshTokenEnc?: string | null;
}) {
  return {
    accessToken: decrypt(encryptedTokens.accessTokenEnc),
    refreshToken: encryptedTokens.refreshTokenEnc ? decrypt(encryptedTokens.refreshTokenEnc) : undefined,
  };
}

/**
 * Generate a secure random key for ENCRYPTION_KEY
 * Use this during initial setup
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('base64').slice(0, KEY_LENGTH);
}

/**
 * Validate encryption key format
 */
export function validateEncryptionKey(key: string): boolean {
  try {
    if (key.length !== KEY_LENGTH) {
      return false;
    }
    
    // Test encryption/decryption
    const testData = 'test-encryption-validation';
    const testKey = process.env.ENCRYPTION_KEY;
    process.env.ENCRYPTION_KEY = key;
    
    const encrypted = encrypt(testData);
    const decrypted = decrypt(encrypted);
    
    process.env.ENCRYPTION_KEY = testKey; // Restore original key
    
    return decrypted === testData;
  } catch {
    return false;
  }
}

/**
 * Hash sensitive data for logging (one-way)
 * Use this for logging purposes where you need to identify
 * the same value without exposing it
 */
export function hashForLogging(data: string): string {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
    .slice(0, 8); // First 8 characters for brevity
}