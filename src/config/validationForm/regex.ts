//Internal app
import { RegularExpressions } from '@/interfaces';

/**
 * Regular expressions
 * @label Tool for validating regular expressions - {@link https://regexr.com/}
 */
export const regularExpressions: Partial<RegularExpressions> = {
  onlyNumber: /^[0-9]{2,20}$/,
  namesValid: /^([a-zA-ZñáéíóúÑÁÉÍÓÚ]+(?:\s[a-zA-ZñáéíóúÑÁÉÍÓÚ]+)*)$/,
  alphaName: /^(?!.*\s{2})[A-Za-zÀ-ÿ\s]{1,50}$/,
  emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
  alphanum: /^[a-zA-Z0-9ñáéíóúÑÁÉÍÓÚ]+$/,
  company: /^[a-zA-Z0-9ñáéíóúÑÁÉÍÓÚ\s.]+$/,
  password: {
    consecutive_group: /(012|123|234|345|456|567|678|789|890)\1/,
    consecutive_ascedant: /(012|123|234|345|456|567|678|789|890)/,
    consecutive_descendant: /(0987|9876|8765|7654|6543|5432|4321|3210)/,
    repeated: /^(\d)\1{4}\d$/,
  },
  numeric: /^[0-9]+$/,
  phone: /^[0-9]{7,15}$/,
  floatAmount: /^[0-9.,]+(.,\d{2})?$/,
};
