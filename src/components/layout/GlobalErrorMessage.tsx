'use client';

import { useUiStore } from '@/store';
import ModalError from '../modal/ModalError';
import { useMemo, useState } from 'react';

export default function GlobalErrorMessage() {
  const { modalErrorObject, showModalError, closeModalError } = useUiStore();
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  useMemo(() => {
    if (modalErrorObject && 'title' in modalErrorObject && 'description' in modalErrorObject) {
      const { title, description } = modalErrorObject;
      setTitle(title);
      setDesc(description);
    } else if (modalErrorObject && 'error' in modalErrorObject) {
      console.log('error', modalErrorObject);
      const { title, description } = setError(
        modalErrorObject.error?.response?.data?.data.code,
        modalErrorObject?.context
      );
      setTitle(title);
      setDesc(description);
    } else {
      const { title, description } = setError();
      setTitle(title);
      setDesc(description);
    }
  }, [setTitle, setDesc, modalErrorObject]);

  return <ModalError title={title} description={desc} open={showModalError} handleClose={closeModalError} />;
}

const setError = (eCode?: string, context?: string) => {
  const code = eCode?.split('.').pop() ?? '';

  const defaultError = {
    title: 'Algo salió mal',
    description: 'Inténtalo nuevamente',
  };

  const errorsMessages: any = {
    '004': { description: 'ID de tenant no válido.' },
    '990': { description: 'Token de acceso no válido.' },
    '992': { description: 'Firma no válida.' },
    '993': { description: 'Token de acceso vencido.' },
    '396': { description: 'Parametros inválidos' },
    '999': { description: 'Error interno del servidor' },
    '064': { description: 'El documento ya ha sido registrado por otro usuario' },
    '312': { description: 'El correo ya ha sido registrado por otro usuario' },
    '066': { description: 'El número de teléfono ya ha sido registrado por otro usuario' },
    '313': { description: 'El id de usuario ya se encuentra registrado' },
    '093': { description: 'El usuario se encuentra bloqueado' },
    '033': { description: 'El usuario no se encuentra en el sistema' },
    '058': {
      title: 'Credenciales inválidas',
      description: 'Después de 3 intentos incorrectos el acceso se bloqueará. En caso no recuerdes tu clave, cámbiala.',
    },
    '057': { title: 'Usuario bloqueado', description: 'Tu cuenta de acceso ha sido bloqueada por 24h' },
    '464': { description: 'El código OTP no es válido' },
    '085': { description: 'El código OTP ha expirado' },
    login: { '057': { description: 'Cuenta Bloqueada', title: 'login Inválido' } },
  };

  const contextErrors = context && errorsMessages[context];
  const errorCode = contextErrors?.[code] ?? errorsMessages[code] ?? defaultError;

  return { ...defaultError, ...errorCode };
};
