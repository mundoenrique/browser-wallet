import * as yup from 'yup';
//Internal app

import { Field, ValidationRule, ValidationShape, RegularExpressions } from '@/interfaces';

// Generates a yup validation schema based on an array of form fields.
export const getSchema = (fields: Field[]): yup.ObjectSchema<any> => {
  const shape = fields.reduce<ValidationShape>((acc, field) => {
    if (typeof field === 'string') {
      acc[field] = validationRules[field];
    } else if (typeof field === 'object') {
      const key = Object.keys(field)[0];
      const subFields = field[key];
      acc[key] = yup.array().of(
        yup.object().shape(
          subFields.reduce<ValidationShape>((subAcc, subField) => {
            subAcc[subField] = validationRules[subField];
            return subAcc;
          }, {})
        )
      );
    }
    return acc;
  }, {});
  return yup.object().shape(shape);
};

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
  password: /^[\w\-+.ñÑ]+$/,
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

export const validationRules: ValidationRule = {
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('Ingresa un email para continuar')
    .min(7, 'Ingresa un email válido')
    .test('emailValid', 'Ingresa un email válido', (value) => regularExpressions.emailValid?.test(value)),
  password: yup
    .string()
    .required('Ingresa una contraseña')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(25, 'La contraseña debe tener máximo 25 caracteres')
    .test('passwordValid', 'password_required', (value) => regularExpressions.password?.test(value)),
  roles: yup.string().required('Debes seleccionar una opción'),
  initialDate: yup.string().required('Ingresa una fecha'),
  country: yup.string().required('Selecciona un país'),
  term: yup.string().required('Acepta los terminos'),
};
