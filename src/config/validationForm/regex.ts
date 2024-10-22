//Internal app
import { RegularExpressions } from '@/interfaces';

/**
 * Regular expressions
 * @label Tool for validating regular expressions - {@link https://regexr.com/}
 */
export const regularExpressions: Partial<RegularExpressions> = {
  onlyNumber: /^[0-9]{2,20}$/,
  onlyOneNumber: /^[0-9]{1}$/,
  namesValid: /^([a-zA-ZñáéíóúÑÁÉÍÓÚ]+\s*)+$/,
  validNickName: /^[a-zA-Z0-9_]{6,16}$/,
  shortPhrase: /^[a-zA-Z0-9ñáéíóúÑÁÉÍÓÚ\s.]$/,
  longPhrase: /^[a-zA-Z0-9ñáéíóú ().,:;-]{5,150}$/,
  alphaName: /^(?!.*\s{2})[A-Za-zÀ-ÿ\s]{1,50}$/,
  alphaLetter: /^[a-zA-Zñáéíóú]{4,20}$/,
  emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
  alphanumunder: /^[wñÑ_]+$/,
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
  phoneMasked: /^[0-9*]{7,20}$/,
  floatAmount: /^[0-9.,]+(.,[0-9]{2})?$/,
  date: {
    dmy: /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/[0-9]{4}$/,
    my: /^(0?[1-9]|1[012])\/[0-9]{4}$/,
    y: /^[0-9]{4}$/,
  },
  checkedOption: /^([0|1])$/,
  docType: /^(CC|PP)$/,
};
