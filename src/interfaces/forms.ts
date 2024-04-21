import { SxProps } from '@mui/material';
import { DateView, DesktopDatePickerProps } from '@mui/x-date-pickers';
//Internal app
import { IClientProps } from './store';

/**
 * Form global variables
 *
 * @typeParam name: string
 * @typeParam label (Optional): string
 * @typeParam labelError (Optional): string
 * @typeParam error (Optional): any
 * @typeParam value (Optional): any
 * @typeParam onChange (Optional): (...e: any[]) => void
 * @typeParam type (Optional): string
 * @typeParam control (Optional): any
 * @typeParam getOptionLabel (Optional): Function
 * @typeParam disabled (Optional): boolean
 * @typeParam readOnly (Optional): boolean
 */
export interface FormMUIProps {
  name: string;
  label?: string;
  labelError?: string;
  error?: any;
  value?: any;
  onChange?: (..._e: any[]) => void;
  type?: string;
  control?: any;
  getOptionLabel?: Function;
  disabled?: boolean;
  readOnly?: boolean;
  sx?: SxProps;
}

/**
 * TextField input
 *
 * @typeParam optional (Optional): boolean
 * @typeParam additionalInfo (Optional): boolean
 * @typeParam colorText (Optional): string
 */
export interface TextFieldProps extends FormMUIProps {
  optional?: boolean;
  additionalInfo?: boolean;
  colorText?: string;
  endAdornment?: React.ReactNode;
}

/**
 * OTP input
 *
 * @typeParam title: string
 * @typeParam text: string
 * @typeParam length: number
 */
export interface InputOTPProps extends FormMUIProps {
  title: string | boolean;
  text: string;
  length: number;
  handleResendOTP: () => void;
}

/**
 * DatePicker input
 *
 * @typeParam onClick (Optional): (e: any) => void;
 * @typeParam disableClearable (Optional): boolean;
 * @typeParam options: {
 *
 * value: string
 *
 * text: string
 *
 * }[]
 */
export interface InputOptionsProps extends FormMUIProps {
  options: { value: string; text: string }[];
  onClick?: (e: any) => void;
  disableClearable?: boolean;
}

/**
 * DatePicker input
 *
 * @typeParam views (Optional): DateView[]
 * @typeParam format (Optional): string
 */
export interface InputDatePickerProps extends FormMUIProps {
  views?: DateView[];
  format?: string;
  datePickerProps?: DesktopDatePickerProps<any>;
}

/**
 * Checkbox input
 *
 * @typeParam onClick (Optional): (...e: any[]) => void
 * @typeParam checked (Optional): boolean
 * @typeParam disabled (Optional): boolean
 * @typeParam labelHandle (Optional): boolean | string
 * @typeParam sx (Optional): SxProps
 * @typeParam mtError (Optional): number
 */
export interface InputCheckProps extends FormMUIProps {
  onClick?: (..._e: any[]) => void;
  checked?: boolean;
  disabled?: boolean;
  labelHandle?: boolean | string;
  sx?: SxProps;
  mtError?: number;
}

/**
 * Switch input
 *
 * @typeParam checked (Optional): boolean
 * @typeParam setValue (Optional): any
 * @typeParam disabled (Optional): boolean
 * @typeParam fullWidth (Optional): boolean
 */
export interface SwitchListProps extends FormMUIProps {
  checked?: boolean;
  setValue?: any;
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Password management form
 *
 * @typeParam onSubmit: (data: any) => Promise<void>
 * @typeParam description: string
 * @typeParam buttons: React.ReactNode
 * @typeParam register (Optional): boolean
 */
export interface FormPassProps {
  onSubmit: (_data: any) => Promise<void>;
  description: string | React.ReactNode;
  buttons: React.ReactNode;
  register?: boolean;
}

/**
 * OTP Form
 *
 * @typeParam setOTP: (value: boolean) => void
 */
export interface AuthOtpFormProps {
  setOTP: (_value: boolean) => void;
  optUuid: string | null;
  handleResendOTP: () => void;
}

/**
 * InputCheckGroup
 *
 * @typeParam name: string
 * @typeParam onChange (Optional): (option: string) => void
 * @typeParam defaultValue (Optional): string
 */

export interface InputCheckGroupProps {
  name: string;
  onChange?: (option: InputCheckGroupOptionProps) => void;
  defaultValue?: string;
}

/**
 * InputCheckGroup options
 *
 * @typeParam options: {
 *
 * value: string
 * text: string
 *
 * }[]
 */
export interface InputCheckGroupOptionsProps extends InputCheckGroupProps {
  options: InputCheckGroupOptionProps[];
}

/**
 * InputCheckGroup option
 *
 * @typeParam value: string
 * @typeParam text: string
 */

export interface InputCheckGroupOptionProps {
  value: string;
  text: string;
}

/**
 * List of clients
 * @typeParam data: IClientProps []
 */
export interface IListClientsProps {
  data: IClientProps[];
  loading: boolean;
  disabledBtnDelete: string;
}
