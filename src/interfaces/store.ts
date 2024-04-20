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
 * Session store
 * @typeParam uuid: string | null
 * @typeParam setUuid: (_uuid: string) => void
 */
export type SessionStoreProps = {
  uuid: string | null;
  setUuid: (_uuid: string) => void;
};

/**
 * loading screen show/hide
 *
 * @typeParam loadingScreen: boolean
 * @typeParam setLoadingScreen: (status: boolean) => void
 */
export interface UiStore {
  loadingScreen: boolean;
  setLoadingScreen: (status: boolean) => void;
  showModalError: boolean;
  setModalError: (status: any) => void;
  modalErrorTitle: string;
  modalErrorDesc: string;
  closeModalError: () => void;
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
 * @typeParam user - object | null
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
  onboardingUuId: string | null;
  biometricFormState: null;
  user: IUserRegisterProps | null;
  getUserId: () => string;
}

/**
 * User register
 *
 * @typeParam firstName: String
 * @typeParam lastName: String
 * @typeParam userId: String
 */
export type IUserRegisterProps = {
  firstName: String;
  lastName: String;
  userId: String;
};

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

export interface CatalogsStore {
  termsCatalog: { code: string; value: string }[];
  passwordTermsCatalog: { code: string; value: string }[];
  occupationCatalog: { text: string; value: string }[];
  documentTypesCatalog: { text: string; value: string }[];
  countriesCatalog: { text: string; value: string }[];
  departamentsCatalog: { text: string; value: string }[];
  provincesCatalog: { text: string; value: string }[];
  districtsCatalog: { text: string; value: string }[];
  updateCatalog: (_form: string, _data: {} | []) => void;
}

/**
 * User store
 * @typeParam user - Initial state {@defaultValue `null`}
 * @typeParam setUser - Function that sets the new value
 */
export interface UserStore {
  user: any | null;
  setUser: (_data: any) => void;
  getUserId: () => string;
  getUserPhone: () => string;
}

export interface OtpStore {
  timeLeft: number;
  counting: boolean;
  setCounting: (value: boolean) => void;
  countdown: () => void;
  setTime: (value: number) => void;
}
