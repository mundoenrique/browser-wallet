import { IUrlBase } from '@/interfaces';

export const JWE_ALG = 'RSA-OAEP-256';
export const JWS_ALG = 'RS512';
export const JWT_ALG = 'PS512';

export const JWS_HEADER = 'x-token';
export const JWT_HEADER = 'x-jwt-auth';

export const AUDIENCE = 'Audiencia';
export const ISSUER = 'Emisor';

export const APIGEE_HEADERS_NAME = ['Authorization', 'X-Tenant-Id', 'X-Token', 'X-Request-Id'];

export const URL_BASE: IUrlBase = {
  onboarding: 'api/v0/onboarding',
};
