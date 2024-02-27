/**
 * Public and private key
 *
 * @typeParam publicKey: string | null
 * @typeParam privateKey: string | null
 * @typeParam setKeys: (_keys: { publicKey: string; privateKey: string }) => void
 */
export type KeyStoreProps = {
  publicKey: string | null;
  privateKey: string | null;
  setKeys: (_keys: { publicKey: string; privateKey: string }) => void;
};

/**
 * JWT token
 *
 * @typeParam token: string | null
 * @typeParam setToken: (_token: string) => void
 */
export type JwtStoreProps = {
  token: string | null;
  setToken: (_token: string) => void;
};

/**
 * Active menu item
 *
 * @typeParam title: string
 * @typeParam updateTitle: (item: string) => void
 */
export interface MenuStore {
  currentItem: string;
  setCurrentItem: (_item: string) => void;
}

/**
 * Qr code
 */
export type QrPropsStore = {
  user: any | null;
  setUser: (_data: any) => void;
};

/**
 * Top bar titles
 *
 * @typeParam title: string
 * @typeParam updateTitle: (newTitle: string) => void
 */
export interface NavTitleStore {
  title: string;
  updateTitle: (_newTitle: string) => void;
}

/**
 * Global status for registration flow
 *
 * @typeParam step - number
 * @typeParam showHeader - boolean
 * @typeParam setShowHeader - (value: boolean) => void
 * @typeParam inc - () => void
 * @typeParam dec - () => void
 * @typeParam updateStep - (amount: number) => void
 * @typeParam updateFormState - (form: string, data: {}) => void
 * @typeParam verificationFormState - object | null
 * @typeParam ocupationFormState - object | null
 * @typeParam pepFormState - object | null
 * @typeParam biometricFormState - null
 */
export interface RegisterStore {
  step: number;
  showHeader: boolean;
  setShowHeader: (_value: boolean) => void;
  inc: () => void;
  dec: () => void;
  updateStep: (_amount: number) => void;
  updateFormState: (_form: string, _data: {}) => void;
  verificationFormState: object | null;
  ocupationFormState: object | null;
  pepFormState: object | null;
  biometricFormState: null;
}
