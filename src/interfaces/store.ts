/**
 * Public and private key
 *
 * @typeParam jwePublicKey: string | null
 * @typeParam jwePrivateKey: string | null
 * @typeParam jwsPublicKey: string | null
 * @typeParam jwsPrivateKey: string | null
 * @typeParam setKeys: (_keys: { jwePublicKey: string; jwePrivateKey: string; jwsPublicKey: string; jwsPrivateKey: string }) => void
 */
export type KeyStoreProps = {
  jwePublicKey: string | null;
  jwePrivateKey: string | null;
  jwsPublicKey: string | null;
  jwsPrivateKey: string | null;
  setKeys: (_keys: {
    jwePublicKey: string;
    jwePrivateKey: string;
    jwsPublicKey: string;
    jwsPrivateKey: string;
  }) => void;
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
 * loading screen show/hide
 *
 * @typeParam loadingScreen: boolean
 * @typeParam setLoadingScreen: (status: boolean) => void
 */
export interface LoadingScreenStore {
  loadingScreen: boolean;
  setLoadingScreen: (status: boolean) => void;
}

/**
 * Drawer show/hide
 *
 * @typeParam drawerStatus: boolean
 * @typeParam setDrawerStatus: (status: boolean) => void
 */
export interface DrawerStatus {
  drawerStatus: boolean;
  setDrawerStatus: (status: boolean) => void;
}

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
 * Config Card component routing
 *
 * @typeParam title: string
 * @typeParam updateTitle: (newTitle: string) => void
 */
export interface ConfigCardStore {
  page: string;
  updatePage: (_newPage: string) => void;
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
  ONB_PHASES_TERMS: { [key: string]: any } | null;
  ONB_PHASES_CONSULT_DATA: { [key: string]: any } | null;
  ONB_PHASES_PEP: { [key: string]: any } | null;
  termsDefinition: { [key: string]: string }[];
  onboardingUuid: string | null;
  biometricFormState: null;
}

/** Client Store
 *
 * @typeParam client - Initial state {@defaultValue `null`}
 * @typeParam setClient - Function that sets the new value
 */

export interface IClientProps {
  id: number;
  date: Date;
  name: string;
  amount: number;
  status: string;
  status_type: string;
  month: string;
  number: string;
}

export interface ClientStore {
  client: IClientProps | null;
  setClient: (data: IClientProps) => void;
}
