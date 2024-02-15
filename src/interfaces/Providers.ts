export type RSAKeysContextProps = {
  publicKey?: string | null;
  privateKey?: string | null;
};

export type JWTContextProps = {
  token?: string | null;
  updateToken?: (newToken: string) => void;
};
