export type KeyStoreProps = {
  publicKey: string | null;
  privateKey: string | null;
  setKeys: (_keys: { publicKey: string; privateKey: string }) => void;
};

export type JwtStoreProps = {
  token: string | null;
  setToken: (_token: string) => void;
};

export type oAuth2StoreProps = {
  accessToken: string | null;
  setAccessToken: (_token: string) => void;
};
