//Internal app
import { RegularExpressions } from '@/interfaces';

/**
 * Regular expressions
 * @label Tool for validating regular expressions - {@link https://regexr.com/}
 */
export const regularExpressions: Partial<RegularExpressions> = {
  onlyNumber: /^[0-9]{2,20}$/,
  onlyOneNumber: /^[0-9]{1}$/,
  namesValid: /^([a-zA-Zñáéíóú]+[s]*)+$/,
  validNickName: /^[a-zA-Z0-9_]{6,16}$/,
  shortPhrase: /^[a-zA-Z0-9ñáéíóú ().]{4,25}$/,
  longPhrase: /^[a-zA-Z0-9ñáéíóú ().,:;-]{5,150}$/,
  alphaName: /^[a-zA-Zñáéíóú ]{1,50}$/,
  alphaLetter: /^[a-zA-Zñáéíóú]{4,20}$/,
  emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
  alphanumunder: /^[wñÑ_]+$/,
  alphanum: /^[a-zA-Z0-9]+$/,
  password:
    /(012|123|234|345|456|567|678|789|890)\1|(0123|1234|2345|3456|4567|5678|6789|7890)|(0987|9876|8765|7654|6543|5432|4321|3210)|(\d)\4\4\4/g,
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
