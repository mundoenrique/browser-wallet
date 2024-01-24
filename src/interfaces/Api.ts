export interface IEncryptedBody {
  data: string;
}

export interface IPayload {
  data: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IData<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface IJWTPayload {
  publicKey: string;
  id?: number;
}

export interface IJWSPayload {
  data?: string;
}
