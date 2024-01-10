import { DateView } from '@mui/x-date-pickers';

export interface FormMUIProps {
  name: string;
  label?: string;
  labelError?: string;
  error?: any;
  value?: any;
  onChange?: (...e: any[]) => void;
  type?: string;
  control?: any;
  getOptionLabel?: Function;
}

export interface TextFieldProps extends FormMUIProps {
  optional?: boolean;
  additionalInfo?: boolean;
}

export interface InputOptionsProps extends FormMUIProps {
  options: { value: string; text: string }[];
}

export interface InputDatePickerProps extends FormMUIProps {
  views?: DateView[];
  format?: string;
}

export interface InputCheckProps extends FormMUIProps {
  onClick?: (...e: any[]) => void;
  checked?: boolean;
  disabled?: boolean;
}

export type UserSubmitForm = {
  email: string;
  password: string;
};

export type CardSubmitForm = {
  cardnumber: string;
  cardtype: string;
  expdate: string;
  cardstatus: string;
  primary: string;
};

export interface SelectProps {
  onChange?: (...e: any[]) => void;
  label?: any;
  labelError?: any;
  error?: boolean | undefined;
  value?: any;
  options: { value: string; text: string }[];
  id: string;
}

export interface DatePickerProps {
  label?: any;
  labelError?: any;
  error?: boolean | undefined;
  value?: any;
  onChange?: (...e: any[]) => void;
  restProps?: any;
}

export interface RadioProps {
  label?: any;
  options: { value: string; label: string }[];
  error?: boolean | undefined;
  value?: any;
  onChange?: (...e: any[]) => void;
  labelError?: any;
  id: string;
}

export type FormData = {
  email: string;
  password: string;
};

export interface SwitchListProps extends FormMUIProps {
  checked?: boolean;
  setValue?: any;
  options: {
    id: number;
    name: string;
    title: string;
    info: string;
    value?: boolean;
    required: boolean;
  }[];
}
export interface SwitchMUIProps extends FormMUIProps {
  settings: { id: number; name: string; title: string; info: string; value?: boolean; required: boolean };
}
