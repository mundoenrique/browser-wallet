'use client';

import { useUiStore } from '@/store';
import ModalError from '../modal/ModalError';
import { useEffect, useState } from 'react';

export default function GlobalErrorMessage() {
  const { modalErrorObject, showModalError, closeModalError } = useUiStore();
  const [title, setTitle] = useState<string>('');
  const [desc, secDesc] = useState<string>('');

  console.log('error', modalErrorObject);

  if (modalErrorObject && 'title' in modalErrorObject && 'description' in modalErrorObject) {
    setTitle(modalErrorObject.title);
    secDesc(modalErrorObject.description);
  }

  useEffect(() => {
    return () => {};
  }, []);
  return <ModalError title={title} description={desc} open={showModalError} handleClose={closeModalError} />;
}

const setError = (eCode: any, context: any) => {
  const defaultError = {
    title: 'Ocurrió un error',
    description: 'Inténtalo nuevamente',
  };

  const errorsMessages: any = {
    '004': { description: 'Invalid tenant ID' },
    '990': { description: 'Invalid Access Token' },
    '992': { description: 'Invalid signature' },
    '993': { description: 'Access token expired' },
    '396': { description: 'Invalid parameters.' },
    '999': { description: 'Internal Server Error' },
    '064': { description: 'El documento ya ha sido registrado por otro usuario' },
    '312': { description: 'El correo ya ha sido registrado por otro usuario' },
    '066': { description: 'El número de teléfono ya ha sido registrado por otro usuario' },
    '313': { description: 'El id de usuario ya se encuentra registrado' },
    '093': { description: 'El usuario se encuentra bloqueado' },
    '033': { description: 'El usuario no se encuentra en el sistema' },
    '058': { description: 'Contraseña incorrecta' },
    '057': { description: 'Usuario bloqueado' },
    '464': { description: 'El código OTP no es válido' },
    '085': { description: 'El código OTP ha expirado' },
  };

  return { ...defaultError, ...errorsMessages[eCode] } ?? defaultError;
};
