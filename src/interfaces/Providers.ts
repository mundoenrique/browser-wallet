export type ProviderProps = {
  children: React.ReactNode;
};

export type RSAKeysContextType = {
  publicKey?: string | null;
  privateKey?: string | null;
};

export type JWTContextType = {
  token?: string | null;
  updateToken?: (newToken: string) => void;
};
