export type KeyStoreProps = {
  publicKey: string | null;
  privateKey: string | null;
  setKeys: (keys: { publicKey: string; privateKey: string }) => void;
};

export type JwtStoreProps = {
  token: string | null;
  setToken: (token: string) => void;
};
