import { IUrlBase } from '@/interfaces';

export const JWE_ALG = 'RSA-OAEP-256';
export const JWS_ALG = 'RS512';
export const JWT_ALG = 'PS512';

export const JWS_HEADER = 'x-token';
export const JWT_HEADER = 'x-jwt-auth';
export const SESSION_ID = 'uidvdo';
export const TIME_SESSION_REDIS = 600;
export const TIME_SESSION_CLIENT = 180;

export const AUDIENCE = 'Audiencia';
export const ISSUER = 'Emisor';

export const REDIS_CIPHER = 'XbL4e4Nmu1whZp7qSy65LVxEVF2uNnE4';

export const APIGEE_HEADERS_NAME = [
  'Authorization',
  'X-Tenant-Id',
  'X-Token',
  'X-Request-Id',
  'Content-Type',
  'identifier',
];

export const URL_BASE: IUrlBase = {
  onboarding: 'api/v0/onboarding',
  catalogs: 'api/v0/catalogs',
  payments: 'api/v0/payments',
  users: 'api/v0/users',
  cards: 'api/v0/cards',
};

export const KEYS_TO_ENCRYPT_API = [
  'firstName',
  'secondName',
  'surName',
  'surName2',
  'documentType',
  'documentNumber',
  'hashedDocumentNumber',
  'phone',
  'number',
  'phoneIdentifier',
  'type',
  'email',
  'names',
  'lastNames',
  'currentPassword',
  'newPassword',
  'pin',
  'otpCode',
  'password',
];

export const KEYS_TO_ENCRYPT_CLIENT = ['cardId', 'phoneNumber', 'pan', 'expiredDate', 'cvv'];

export const KEYS_DATA_VALIDATE = [
  'userId',
  'cardId'
];