import { IPayOffDebt, IPayOffDebtError } from './api';

/**
 * Public and private key
 *
 * @typeParam jwePublicKey: string | null
 * @typeParam jwePrivateKey: string | null
 * @typeParam jwsPublicKey: string | null
 * @typeParam jwsPrivateKey: string | null
 * @typeParam activeKeys: true | false
 * @typeParam setKeys: (_keys: { jwePublicKey: string; jwePrivateKey: string; jwsPublicKey: string; jwsPrivateKey: string }) => void
 */
export type KeyStoreProps = {
  jwePublicKey: string | null;
  jwePrivateKey: string | null;
  jwsPublicKey: string | null;
  jwsPrivateKey: string | null;
  activeKeys: boolean;
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
  setLoadingScreen: (status: boolean, value?: object) => void;
  loadingScreenOptions: { [key: string]: any };
  showModalError: boolean;
  setModalError: (value?: ErrorMessage | ErrorContext | null) => void;
  modalErrorObject: ErrorMessage | ErrorContext | null;
  closeModalError: () => void;
  reloadFunction: (() => void) | null;
  setReloadFunction: (func: () => void) => void;
  clearReloadFunction: () => void;
}
interface ErrorMessage {
  title: string;
  description: string;
}
interface ErrorContext {
  error: any;
  context?: 'terms' | 'login';
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
  cardIdActivate: string | null;
  setUser: (_data: any) => void;
  setCardIdActivate: (_data: string) => void;
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
 * @typeParam page: string
 * @typeParam cardActivationStatus: string
 * @typeParam updatePage: (newPage: string) => void
 * @typeParam setCardActivationStatus: (_status: string) => void;
 */
export interface ConfigCardStore {
  page:
    | ''
    | 'main'
    | 'activatePhysicalCard'
    | 'blockCard'
    | 'changePin'
    | 'requestPhysicalCard'
    | 'deleteAccount'
    | 'survey'
    | 'success';
  cardActivationStatus: string;
  isCardVirtual: () => boolean;
  isCardBlocked: () => boolean;
  cardType: string;
  blockType: object;
  cardStatus: string;
  cardInfo: boolean;
  updateCardInfo: boolean;
  toggleUpdate: () => void;
  updatePage: (_newPage: ConfigCardStore['page']) => void;
  setCardProperties: (_key: 'blockType' | 'cardType' | 'cardStatus' | 'cardInfo', _value: any) => void;
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
  user: IUserRegisterProps;
}

/**
 * User register
 *
 * @typeParam firstName: String
 * @typeParam lastName: String
 * @typeParam userId: String
 */
export type IUserRegisterProps = {
  firstName: string | null;
  lastName: string | null;
  userId: string | null;
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
 * @typeParam userId: Initial state {@defaultValue `null`}
 * @typeParam setUser: (_data: any) => void
 * @typeParam setUserId: (_data: any) => void
 * @typeParam getUserPhone: () => string
 */
export interface UserStore {
  user: any | null;
  userId: any | null;
  cardInformation: any | null;
  setCardInformation: (_data: any) => void;
  setUser: (_data: any) => void;
  setUserId: (_data: any) => void;
  getUserPhone: () => string;
  getUserCardId: () => string;
  isUserCardVirtual: () => boolean;
}

/**
 * OTP store
 * @typeParam otpValid - Initial state {@defaultValue `undefined`}
 * @typeParam timeLeft - Initial state {@defaultValue `0`}
 * @typeParam counting - Initial state {@defaultValue `false`}
 * @typeParam setCounting: (value: boolean) => void
 * @typeParam countdown: () => void
 * @typeParam setTime: (value: number) => void
 * @typeParam setOTPValid: (value: string) => void
 * @typeParam reset: ()=>void
 */
export interface OtpStore {
  otpValid: 'OTP' | 'PASSWORD' | 'ENDING' | undefined;
  timeLeft: number;
  counting: boolean;
  otpUuid: string;
  otpCode: string;
  setOtpCode: (value: string) => void;
  setOtpUuid: (value: string) => void;
  setCounting: (value: boolean) => void;
  countdown: () => void;
  setTime: (value: number) => void;
  setOTPValid: (value: OtpStore['otpValid']) => void;
  reset: () => void;
}

/**
 * Debt store
 * @typeParam debt - Initial state {@defaultValue `null`}
 * @typeParam view - Initial state {@defaultValue `DEBT`}
 * @typeParam setDebt: (_data: any) => void
 * @typeParam setView: (_data: any) => void
 */
export interface DebtStore {
  debt: any | null;
  view: 'DEBT' | 'SUCCESS' | 'ERROR' | string | undefined;
  payOffDebt: IPayOffDebt | null;
  error: IPayOffDebtError | null;
  setDebt: (_data: any) => void;
  setView: (_data: string) => void;
  setPayOffDebt: (_data: IPayOffDebt) => void;
  setError: (_data: IPayOffDebtError) => void;
}
