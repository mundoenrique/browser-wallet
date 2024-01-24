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
import { AUDIENCE, ISSUER, JWE_ALG, JWS_ALG, JWT_ALG } from './constants';

const encode = TextEncoder.prototype.encode.bind(new TextEncoder());
const decode = TextDecoder.prototype.decode.bind(new TextDecoder());

/**
 * Firma un JWT con una clave privada y un payload.
 *
 * @param privateKey - La clave privada para firmar el JWT.
 * @param payload - El payload del JWT.
 * @param expiresIn - El tiempo de expiración del JWT.
 * @returns El JWT firmado.
 * @throws Si hay un error al importar la clave privada o al firmar el JWT.
 */
export async function signJWT(
  privateKey: string,
  payload: JWTPayload = {},
  expiresIn: string | number | Date = '2h'
): Promise<string> {
  try {
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
    console.error(error);
    throw new Error('Hubo un error al firmar el JWT.');
  }
}

/**
 * Verifica un JWT con una clave pública.
 *
 * @param jwt - El JWT a verificar.
 * @param publicKey - La clave pública para verificar el JWT.
 * @returns El payload del JWT.
 * @throws Si hay un error al importar la clave pública o al verificar el JWT.
 */
export async function verifyJWT(jwt: string | Uint8Array, publicKey: string): Promise<JWTPayload> {
  try {
    const key = await importSPKI(publicKey, JWT_ALG);
    const { payload } = await jwtVerify(jwt, key, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    return payload;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al verificar el JWT.');
  }
}

/**
 * Encripta un payload en un JWE con una clave pública.
 *
 * @param payload - El payload a encriptar.
 * @param publicKey - La clave pública para encriptar el payload.
 * @returns El JWE encriptado.
 * @throws Si hay un error al importar la clave pública o al encriptar el payload.
 */
export async function encryptJWE(payload: object, publicKey: string): Promise<string> {
  try {
    console.log('encript JWE, publicKey:', publicKey);

    const plaintext = encode(JSON.stringify(payload));
    const key = await importSPKI(publicKey, JWE_ALG);
    const jwe = await new CompactEncrypt(plaintext).setProtectedHeader({ alg: JWE_ALG, enc: 'A256GCM' }).encrypt(key);

    return jwe;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al encriptar el payload.');
  }
}

/**
 * Desencripta un JWE con una clave privada.
 *
 * @param jwe - El JWE a desencriptar.
 * @param privateKey - La clave privada para desencriptar el JWE.
 * @returns El payload desencriptado.
 * @throws Si hay un error al importar la clave privada o al desencriptar el JWE.
 */
export async function decryptJWE(jwe: string, privateKey: string): Promise<object> {
  try {
    console.log('decript JWE, privateKey:', privateKey);

    const key = await importPKCS8(privateKey, JWE_ALG);
    const { plaintext } = await compactDecrypt(jwe, key);

    return JSON.parse(decode(plaintext));
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al desencriptar el JWE.');
  }
}

/**
 * Genera un JWS sin payload a partir de un JWE y una clave privada.
 *
 * @param privateKeyJwk - La clave privada para firmar el JWE.
 * @param jwe - El JWE a firmar.
 * @returns El JWS sin payload.
 * @throws Si hay un error al importar la clave privada o al firmar el JWE.
 */
export async function signJWE(privateKey: string, jwe: string): Promise<string> {
  try {
    console.log('sign JWE, privateKey:', privateKey);

    const key = await importPKCS8(privateKey, JWS_ALG);
    const jws = await new CompactSign(encode(jwe)).setProtectedHeader({ alg: JWS_ALG }).sign(key);
    const parts = jws.split('.');
    const modifiedJws = `${parts[0]}..${parts[2]}`;

    return modifiedJws;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al firmar el JWE.');
  }
}

/**
 * Verifica un JWS usando una clave pública.
 *
 * @param jws - El JWS a verificar.
 * @param publicKey - La clave pública para verificar el JWS.
 * @returns Un booleano que indica si el JWS es válido.
 * @throws Si hay un error al importar la clave pública o al verificar el JWS.
 */
export async function verifyJWS(jws: string | Uint8Array, publicKey: string): Promise<boolean> {
  try {
    console.log('verifica JWS, publicKey:', publicKey);

    const key = await importSPKI(publicKey, JWS_ALG);
    await compactVerify(jws, key);

    return true;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al verificar el JWS.');
  }
}

/**
 * Verifica un JWS Detached usando una clave pública y un payload.
 *
 * @param jws - El JWS Detached a verificar.
 * @param publicKey - La clave pública para verificar el JWS.
 * @param payload - El payload original del JWS.
 * @returns Un booleano que indica si el JWS es válido.
 * @throws Si no se proporcionó el JWS o si hay un error al verificar el JWS.
 */
export async function verifyDetachedJWS(jws: string | null, publicKey: string, payload: string): Promise<boolean> {
  try {
    if (!jws) {
      throw new Error('No se proporcionó el JWS. Por favor, asegúrate de que tu solicitud incluye un JWS válido.');
    }

    const base64UrlPayload = base64url.encode(payload);

    const parts = jws.split('.');
    const completeJws = `${parts[0]}.${base64UrlPayload}.${parts[2]}`;

    await verifyJWS(completeJws, publicKey);

    return true;
  } catch (error) {
    throw new Error('Hubo un error al verificar el JWS:' + (error as Error).message);
  }
}
