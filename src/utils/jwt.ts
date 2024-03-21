import {
  jwtVerify,
  SignJWT,
  compactDecrypt,
  CompactEncrypt,
  importPKCS8,
  importSPKI,
  JWTPayload,
  CompactSign,
  compactVerify,
  base64url,
} from 'jose';
//Internal app
import { AUDIENCE, ISSUER, JWE_ALG, JWS_ALG, JWT_ALG } from './constants';

const encode = TextEncoder.prototype.encode.bind(new TextEncoder());
const decode = TextDecoder.prototype.decode.bind(new TextDecoder());

/**
 * Signs a JWT with a private key and a payload.
 *
 * @param privateKey - The private key to sign the JWT.
 * @param payload - The payload of the JWT.
 * @param expiresIn - The expiration time of the JWT.
 * @returns The signed JWT.
 * @throws If there is an error importing the private key or signing the JWT.
 */
export async function signJWT(
  privateKey: string,
  payload: JWTPayload = {},
  expiresIn: string | number | Date = '2h'
): Promise<string> {
  try {
    if (!hasPEMHeadersAndFooters(privateKey)) {
      privateKey = addPEMHeadersAndFooters(privateKey, 'private');
    }
    const key = await importPKCS8(privateKey, JWT_ALG);
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: JWT_ALG })
      .setIssuedAt()
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setExpirationTime(expiresIn)
      .sign(key);

    return jwt;
  } catch (error) {
    throw new Error('There was an error signing the JWT.');
  }
}

/**
 * Verifies a JWT with a public key.
 *
 * @param jwt - The JWT to verify.
 * @param publicKey - The public key to verify the JWT.
 * @returns The payload of the JWT.
 * @throws If there is an error importing the public key or verifying the JWT.
 */
export async function verifyJWT(jwt: string | Uint8Array, publicKey: string): Promise<JWTPayload> {
  try {
    if (!hasPEMHeadersAndFooters(publicKey)) {
      publicKey = addPEMHeadersAndFooters(publicKey, 'public');
    }
    const key = await importSPKI(publicKey, JWT_ALG);
    const { payload } = await jwtVerify(jwt, key, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    return payload;
  } catch (error) {
    throw new Error('There was an error verifying the JWT.');
  }
}

/**
 * Encrypts a payload into a JWE with a public key.
 *
 * @param payload - The payload to encrypt.
 * @param publicKey - The public key to encrypt the payload.
 * @returns The encrypted JWE.
 * @throws If there is an error importing the public key or encrypting the payload.
 */
export async function encryptJWE(payload: object, publicKey: string): Promise<string> {
  try {
    if (!hasPEMHeadersAndFooters(publicKey)) {
      publicKey = addPEMHeadersAndFooters(publicKey, 'public');
    }
    const plaintext = encode(JSON.stringify(payload));
    const key = await importSPKI(publicKey, JWE_ALG);
    const jwe = await new CompactEncrypt(plaintext).setProtectedHeader({ alg: JWE_ALG, enc: 'A256GCM' }).encrypt(key);

    return jwe;
  } catch (error) {
    throw new Error('There was an error encrypting the payload.');
  }
}

/**
 * Decrypts a JWE with a private key.
 *
 * @param jwe - The JWE to decrypt.
 * @param privateKey - The private key to decrypt the JWE.
 * @returns The decrypted payload.
 * @throws If there is an error importing the private key or decrypting the JWE.
 */
export async function decryptJWE(jwe: string, privateKey: string): Promise<object> {
  try {
    if (!hasPEMHeadersAndFooters(privateKey)) {
      privateKey = addPEMHeadersAndFooters(privateKey, 'private');
    }
    const key = await importPKCS8(privateKey, JWE_ALG);
    const { plaintext } = await compactDecrypt(jwe, key);

    return JSON.parse(decode(plaintext));
  } catch (error) {
    throw new Error('There was an error decrypting JWE.');
  }
}

/**
 * Generates a JWS without payload from a JWE and a private key.
 *
 * @param privateKey - The private key to sign the JWE.
 * @param jwe - The JWE to sign.
 * @returns The JWS without payload.
 * @throws If there is an error importing the private key or signing the JWE.
 */
export async function signJWE(privateKey: string, jwe: string): Promise<string> {
  try {
    if (!hasPEMHeadersAndFooters(privateKey)) {
      privateKey = addPEMHeadersAndFooters(privateKey, 'private');
    }
    const key = await importPKCS8(privateKey, JWS_ALG);
    const jws = await new CompactSign(encode(jwe)).setProtectedHeader({ alg: JWS_ALG }).sign(key);
    const parts = jws.split('.');
    const modifiedJws = `${parts[0]}..${parts[2]}`;

    return modifiedJws;
  } catch (error) {
    console.log('Error signing JWE:', error);
    throw new Error('There was an error when signing the JWE.');
  }
}

/**
 * Verifies a JWS using a public key.
 *
 * @param jws - The JWS to verify.
 * @param publicKey - The public key to verify the JWS.
 * @returns A boolean indicating whether the JWS is valid.
 * @throws If there is an error importing the public key or verifying the JWS.
 */
export async function verifyJWS(jws: string | Uint8Array, publicKey: string): Promise<boolean> {
  try {
    if (!hasPEMHeadersAndFooters(publicKey)) {
      publicKey = addPEMHeadersAndFooters(publicKey, 'public');
    }
    const key = await importSPKI(publicKey, JWS_ALG);
    await compactVerify(jws, key);

    return true;
  } catch (error) {
    throw new Error('There was an error verifying the JWS.');
  }
}

/**
 * Verifies a Detached JWS using a public key and a payload.
 *
 * @param jws - The Detached JWS to verify.
 * @param publicKey - The public key to verify the JWS.
 * @param payload - The original payload of the JWS.
 * @returns A boolean indicating whether the JWS is valid.
 * @throws If the JWS was not provided or if there is an error verifying the JWS.
 */
export async function verifyDetachedJWS(jws: string | null, publicKey: string, payload: string): Promise<boolean> {
  try {
    if (!jws) {
      throw new Error('JWS was not provided. Please make sure your application includes a valid JWS.');
    }

    const base64UrlPayload = base64url.encode(payload);

    const jwsReplace = jws.replace('JWS ', '');

    const parts = jwsReplace.split('.');
    const completeJws = `${parts[0]}.${base64UrlPayload}.${parts[2]}`;

    await verifyJWS(completeJws, publicKey);

    return true;
  } catch (error) {
    throw new Error('There was an error verifying the JWS:' + (error as Error).message);
  }
}

/**
 * Verifies if a key has the typical PEM headers and footers.
 *
 * @param key - The key to verify.
 * @returns `true` if the key has the headers and footers, `false` otherwise.
 */
export function hasPEMHeadersAndFooters(key: string): boolean {
  const pemHeaders = ['-----BEGIN PUBLIC KEY-----', '-----BEGIN PRIVATE KEY-----'];
  const pemFooters = ['-----END PUBLIC KEY-----', '-----END PRIVATE KEY-----'];

  return pemHeaders.some((header) => key.includes(header)) && pemFooters.some((footer) => key.includes(footer));
}

/**
 * Removes the PEM header and footer from an RSA key.
 *
 * @param key - The RSA key with headers and footers.
 * @returns The RSA key without headers and footers.
 */
export function removePEMHeadersAndFooters(key: string): string {
  const lines = key.split('\n');
  const start = lines.findIndex((line) => line.includes('BEGIN'));
  const end = lines.findIndex((line) => line.includes('END'));
  return lines.slice(start + 1, end).join('');
}

/**
 * Adds the PEM header and footer to an RSA key.
 *
 * @param key - The key content (without headers and footers).
 * @param type - The type of the key (private or public).
 * @returns The complete key with headers and footers.
 */
export function addPEMHeadersAndFooters(key: string, type: 'private' | 'public'): string {
  const header = `-----BEGIN ${type.toUpperCase()} KEY-----\n`;
  const footer = `\n-----END ${type.toUpperCase()} KEY-----\n`;
  return `${header}${key}${footer}`;
}
