/**
 * Login credentials
 *
 * @typeParam email: string
 * @typeParam password: string
 */
export interface ICredentials {
  email: string;
  password: string;
}

/**
 * Encrypted body
 *
 * @typeParam data: string
 */
export interface IEncryptedBody {
  data: string;
}

/**
 * JWT payload
 *
 * @typeParam publicKey: string
 * @typeParam id (Optional): number
 */
export interface IJWTPayload {
  jwsPublicKey: string;
  jwePublicKey: string;
  id?: number;
}
