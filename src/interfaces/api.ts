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
  uuid?: string
}

/**
 * API Params
 * @typeParam params: {
 *
 * onboardingId (Optional): string
 *
 * userId (Optional): string
 *
 * }
 */
export type ApiParams = {
  params: {
    onboardingId?: string;
    userId?: string;
  };
};

/**
 * ApiGee Object Request
 * @typeParam jwe: string
 * @typeParam jws: string
 */
export type ApiGeeObjectRequest = {
  jwe: string;
  jws: string;
};

/**
 * ApiGee Response
 * @typeParam code: string
 * @typeParam datetime: string
 * @typeParam message: string
 * @typeParam data: string
 */
export type IApiGeeResponse = {
  code: string;
  datetime: string;
  message: string;
  data: string | any;
};

/**
 * Url Base
 * @typeParam [key: string]: string
 */
export interface IUrlBase {
  [key: string]: string;
}

/**
 * TUserDetailParams
 * @typeParam params: {
 * userId: string
 * }
 */
export type TUserDetailParams = {
  params: {
    userId: string;
  };
};

/**
 * ICardDebt Response
 * @typeParam amount: number
 * @typeParam currencyCode: string
 * @typeParam expirationDate (Optional): string
 * @typeParam clients (Optional): number
 */
export interface ICardDebt {
  amount: number | null | string;
  currencyCode: string;
  expirationDate?: string | null;
  clients?: number | null;
}
