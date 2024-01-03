import { AnySchema } from 'yup';

export type Field = string | { [key: string]: string[] };

export type ValidationRule = { [key: string]: AnySchema };

export type ValidationShape = { [key: string]: AnySchema };

export interface RegularExpressions {
  onlyNumber: RegExp;
  onlyOneNumber: RegExp;
  namesValid: RegExp;
  validNickName: RegExp;
  shortPhrase: RegExp;
  longPhrase: RegExp;
  alphaName: RegExp;
  alphaLetter: RegExp;
  emailValid: RegExp;
  alphanumunder: RegExp;
  alphanum: RegExp;
  password: RegExp;
  numeric: RegExp;
  phone: RegExp;
  phoneMasked: RegExp;
  floatAmount: RegExp;
  date: {
    dmy: RegExp;
    my: RegExp;
    y: RegExp;
  };
  checkedOption: RegExp;
  docType: RegExp;
}
