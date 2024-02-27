import { SxProps } from '@mui/material';
import { DateView } from '@mui/x-date-pickers';

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
}

/**
 * OTP input
 *
 * @typeParam title: string
 * @typeParam text: string
 * @typeParam length: number
 */
export interface InputOTPProps extends FormMUIProps {
  title: string;
  text: string;
  length: number;
}

/**
 * DatePicker input
 *
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
}
