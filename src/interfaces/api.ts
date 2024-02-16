export interface ICredentials {
  email: string;
  password: string;
}

export interface IData<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface IEncryptedBody {
  data: string;
}

export interface IJWSPayload {
  data?: string;
}

export interface IJWTPayload {
  publicKey: string;
  id?: number;
}

export interface IPayload {
  data: string;
}
