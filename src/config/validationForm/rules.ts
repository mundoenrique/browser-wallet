import * as yup from 'yup';
//Internal app
import { regularExpressions } from './regex';
import { ValidationRule } from '@/interfaces';
import { passwordValidation, pinValidation } from './handleValidations';

/**
 * Regular expressions
 * @label Reack Hook Form - {@link https://react-hook-form.com/docs/useform}
 * @label Yup - {@link https://www.npmjs.com/package/yup}
 */
export const validationRules: ValidationRule = {
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('Ingresa un email')
    .min(7, 'Debe tener minimo 7 caracteres')
    .max(256, 'Debe tener maximo 256 caracteres')
    .test('emailValid', 'Ingresa un email válido', (value) => regularExpressions.emailValid?.test(value)),
  password: yup.string().required('Ingresa una contraseña'),
  roles: yup.string().required('Debes seleccionar una opción'),
  initialDate: yup.string().required('Ingresa una fecha'),
  countryCode: yup.string().required('Selecciona un país'),
  terms: yup.boolean().oneOf([true], 'Debes aceptar la opción'),
  policy: yup.boolean().oneOf([true], 'Acepta la política'),
  otp: yup
    .string()
    .required('Ingrese un código')
    .min(4, 'El código es de 4 dígitos')
    .test('otpValid', 'El código es númerico', (value) => regularExpressions.numeric?.test(value)),
  currentPassword: passwordValidation('Ingrese una contraseña'),
  newPassword: passwordValidation('Ingresa una nueva contraseña').notOneOf(
    [yup.ref('currentPassword')],
    'Está contraseña debe ser diferente a la actual'
  ),
  newPasswordConfirmation: passwordValidation('Confirma tu nueva contraseña').oneOf(
    [yup.ref('newPassword')],
    'Las contraseñas no coinciden'
  ),
  legal: yup.boolean().oneOf([true], 'Debes aceptar la opción'),
  occupationCode: yup.string().required('Selecciona una ocupación'),
  companyType: yup.string().required('Selecciona el tipo de empresa'),
  companyName: yup
    .string()
    .required('Ingresa el nombre de la empresa')
    .max(50, 'Debe tener maximo 50 caracteres')
    .test('companyNameValid', 'Solo se aceptan números y letras', (value) =>
      regularExpressions.namesValid?.test(value)
    ),
  companyPosition: yup
    .string()
    .required('Ingrese su posición en la empresa')
    .max(50, 'Debe tener maximo 50 caracteres')
    .test('companyPositionValid', 'Solo se aceptan letras', (value) => regularExpressions.namesValid?.test(value)),
  phoneNumber: yup
    .string()
    .required('Ingresa un numero de celular')
    .min(9, 'Número de celular no válido')
    .max(9, 'Número de celular no válido')
    .test('celularValid', 'Ingresa un numero de celular', (value) => regularExpressions.onlyNumber?.test(value)),
  isPep: yup.string().nonNullable().oneOf(['true', 'false'], 'Debes seleccionar una opción'),
  pepForm: yup.object().shape({
    isRelativeAlive: yup.string().oneOf(['true', 'false'], 'Debes seleccionar una opción'),
    position: yup
      .string()
      .required('Ingrese su posición en la empresa')
      .max(50, 'Debe tener maximo 50 caracteres')
      .test('companyValid', 'Solo se aceptan letras', (value) => regularExpressions.namesValid?.test(value)),
    companyName: yup
      .string()
      .required('Ingresa el nombre de la empresa')
      .max(50, 'Debe tener maximo 50 caracteres')
      .test('companyValid', 'Solo se aceptan letras', (value) => regularExpressions.namesValid?.test(value)),
    address: yup.string().required('Ingresa la dirección de la empresa').max(256, 'Debe tener maximo 256 caracteres'),
    districtCode: yup.string().required('Selecciona el distrito'),
    provinceCode: yup.string().required('Selecciona la provincia'),
    departmentCode: yup.string().required('Selecciona el departamento'),
    endDate: yup.string().required('Ingresa la fecha'),
    holdShare: yup.string().oneOf(['true', 'false'], 'Debes seleccionar una opción'),
  }),
  relatives: yup.array().of(
    yup.object().shape({
      fullName: yup
        .string()
        .required('Ingresa el nombre completo')
        .max(256, 'Debe tener maximo 256 caracteres')
        .test('amountValid', 'El campo es de texto', (value) => regularExpressions.namesValid?.test(value)),
      documentNumber: yup
        .string()
        .required('Ingresa el número de identificación')
        .max(15, 'Número de identificación invalido')
        .test('amountValid', 'Identificación invalida', (value) => regularExpressions.alphanum?.test(value)),
      documentType: yup.string().required('Selecciona el tipo de documento '),
    })
  ),
  blockType: yup.string().required('Debes seleccionar una opción'),
  newPin: pinValidation('Ingrese tu nuevo Pin'),
  confirmPin: pinValidation('Confirma tu nuevo Pin').oneOf([yup.ref('newPin')], 'Los Pines no coinciden'),
  amount: yup
    .string()
    .required('Campo obligatorio')
    .test('amountValid', 'Ingresa un monto', (value) => regularExpressions.floatAmount?.test(value)),
  nameClient: yup
    .string()
    .required('Campo obligatorio')
    .test('nameClientValid', 'Ingrese un nombre valido', (value) => regularExpressions.alphaName?.test(value)),
  numberClient: yup
    .string()
    .required('Campo obligatorio')
    .test('numberClientValid', 'Ingrese un teléfono valido', (value) => regularExpressions.phone?.test(value)),
};
