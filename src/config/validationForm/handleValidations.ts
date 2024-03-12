import * as yup from 'yup';
//Internal app
import { regularExpressions } from './regex';

/**
 * Function used to validate the creation of the PIN.
 * @param msg - Mandatory field message.
 */
export function pinValidation(msg: string) {
  return yup
    .string()
    .required(msg)
    .min(4, 'El Pin debe ser de 4 números')
    .max(4, 'El Pin debe ser de 4 números')
    .test('Pin invalido', 'El Pin es númerico', (value) => regularExpressions.numeric?.test(value));
}

/**
 * Function used to validate the creation of the password.
 * @param msg - Mandatory field message.
 */
export function passwordValidation(msg: string) {
  return yup
    .string()
    .required(msg)
    .min(6, 'La contraseña debe tener 6 caracteres')
    .max(6, 'La contraseña debe tener 6 caracteres')
    .test('contraseña invalida', 'La contraseña debe ser numérica', (value) => regularExpressions.numeric?.test(value))
    .test(
      'digitos consecutivos grupales',
      'La contraseña no debe contener consecutivos',
      (value) => !regularExpressions.password?.consecutive_group?.test(value)
    )
    .test(
      'digitos consecutivos ascendentes',
      'La contraseña no debe contener consecutivos',
      (value) => !regularExpressions.password?.consecutive_ascedant?.test(value)
    )
    .test(
      'digitos consecutivos descendentes',
      'La contraseña no debe contener consecutivos',
      (value) => !regularExpressions.password?.consecutive_descendant?.test(value)
    )
    .test(
      'digitos repetidos',
      'La contraseña no debe contener digitos repetidos',
      (value) => !regularExpressions.password?.repeated?.test(value)
    );
}
