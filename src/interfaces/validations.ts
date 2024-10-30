import { AnySchema } from 'yup';

/**
 * Field Name
 */
export type Field = string | { [key: string]: string[] };

/**
 * Rule validation
 */
export type ValidationRule = { [key: string]: AnySchema };

/**
 * GetSchema validation
 */
export type ValidationShape = { [key: string]: AnySchema };

/**
 * Regular expressions
 */
export interface RegularExpressions {
  onlyNumber: RegExp;
  namesValid: RegExp;
  alphaName: RegExp;
  emailValid: RegExp;
  alphanum: RegExp;
  company: RegExp;
  password: {
    consecutive_group?: RegExp;
    consecutive_ascedant?: RegExp;
    consecutive_descendant?: RegExp;
    repeated: RegExp;
  };
  numeric: RegExp;
  phone: RegExp;
  floatAmount: RegExp;
}
