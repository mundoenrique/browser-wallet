import { IDebt, IPayOffDebtError } from './api';
import { TCardInformation } from '@/interfaces';

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
 * @typeParam sessionId: string | null
 * @typeParam setSessionId: (_setSessionId: string) => void
 */
export type JwtStoreProps = {
  token: string | null;
  uuid: string | null;
  exchange: string | null;

  setToken: (_token: string) => void;
  setDataToken: (_tokens: {
    token: string;
    uuid: string;
    exchange: string;
  }) => void;
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
  user: any;
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
  cardActivationStatus: () => string;
  isCardBlocked: () => boolean;
  isTempBlock: () => boolean;
  cardInformation: TCardInformation | { [key: string]: any };
  updatePage: (_newPage: ConfigCardStore['page']) => void;
  setCardProperties: (_key: 'cardInformation', _value: any) => void;
  isPhysicalCard: () => boolean;
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
 * @typeParam control - object | null
 * @typeParam updateControl - (data: any) => void
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
  control: any;
  updateControl: (_data: any) => void;
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
  chargeId?: string;
  date?: string;
  name?: string;
  fullname?: string;
  amount: number;
  status: string;
  status_type?: string;
  month?: string;
  phoneNumber?: string;
}

export interface ClientStore {
  client: ClientPay | null;
  setClient: (data: ClientPay) => void;
}

export interface ClientPay {
  fullname: string | undefined;
  phoneNumber: string | undefined;
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
  user: any;
  userId: any;
  setUser: (_data: any) => void;
  setUserId: (_data: any) => void;
  getUserPhone: () => string;
  getUserCardId: () => string;
}

/**
 * OTP store
 * @typeParam otpValid - Initial state {@defaultValue `undefined`}
 * @typeParam otpUuid:  Initial state {@defaultValue ``}
 * @typeParam setOtpUuid: () => void
 * @typeParam setOTPValid: (value: string) => void
 *
 */
export interface OtpStore {
  otpValid: 'OTP' | 'PASSWORD' | 'ENDING' | undefined;
  otpUuid: string;
  timeLeft: number;
  countdown: () => void;
  setTime: (value: number) => void;
  setOtpUuid: (value: string) => void;
  setOTPValid: (value: OtpStore['otpValid']) => void;
}

/**
 * Debt store
 * @typeParam debt - Initial state {@defaultValue `null`}
 * @typeParam view - Initial state {@defaultValue `DEBT`}
 * @typeParam payOffDebt - Initial state {@defaultValue `null`}
 * @typeParam error - Initial state {@defaultValue `null`}
 * @typeParam balance - Initial state {@defaultValue `null`}
 * @typeParam setDebt: (_data: any) => void
 * @typeParam setView: (_data: any) => void
 * @typeParam setPayOffDebt: (_data: IDebt) => void
 * @typeParam setError: (_data: IPayOffDebtError) => void
 * @typeParam setBalance: (_data: IBalance) => void
 */
export interface DebtStore {
  debt: any;
  view: 'DEBT' | 'SUCCESS' | 'ERROR' | string | undefined;
  payOffDebt: IDebt | null;
  error: IPayOffDebtError | null;
  balance: any;
  setDebt: (_data: any) => void;
  setView: (_data: string) => void;
  setPayOffDebt: (_data: IDebt) => void;
  setError: (_data: IPayOffDebtError) => void;
  setBalance: (_data: IBalance | null) => void;
}
export interface IBalance {
  availableBalance: string;
  balanceBlocked: string;
  currentBalance: string;
}
export interface ILoad {
  name: string | null;
  phoneNumber: string | null;
}

export interface ILinkData {
  uuid: string | null;
  providerPaymentCode: string | null;
  amount: number | null;
  expirationDate: string | null;
  currencyCode: string | null;
  url: string | null;
  qr: string;
}

export interface ICollectStore {
  load: ILoad | null;
  linkData: ILinkData | null;
  setLoad: (_data: ILoad) => void;
  setLinkData: (_data: ILinkData) => void;
  reset: () => void;
}

export interface HeadersStore {
  backLink: string;
  setBackLink: (_data: any) => void;
  host: string | null;
  setHost: (_data: any) => void;
}

/**
 * Active Keys
 *
 * @typeParam activeApp: boolean
 * @typeParam createAccess: string
 * @typeParam setActiveApp: (activeApp: boolean) => void
 * @typeParam setCreateAccess: (createAccess: string) => void
 */
export interface ActiveAppStore {
  activeApp: boolean | null;
  initAccess: boolean | null;
  createAccess: string | null;
  setActiveApp: (_activeApp: boolean | null) => void;
  setCreateAccess: (_createAccess: string | null) => void;
  setinitAccess: (_initAccess: boolean | null) => void;
}

 /* Charge store
 * @typeParam debt - Initial state {@defaultValue `null`}
 * @typeParam setView: (_data: any) => void
 */
export interface ChargeStore {
  chargeAmount: number;
  setCharge: (data: number) => void;
}
