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
    .test('Contraseña invalida', 'Ingrese una contraseña valida', (value) => !regularExpressions.password?.test(value));
}
