'use client';

import { useUiStore } from '@/store';
import ModalError from '../modal/ModalError';
import { useMemo } from 'react';

export default function GlobalErrorMessage() {
  const { modalErrorObject, showModalError, closeModalError } = useUiStore();

  const modalMessage = useMemo(() => {
    let title = '';
    let description = '';

    if (modalErrorObject) {
      if ('title' in modalErrorObject && 'description' in modalErrorObject) {
        const { title: modalTitle, description: modalDescription } = modalErrorObject;
        title = modalTitle;
        description = modalDescription;
      } else if ('error' in modalErrorObject) {
        const errorCode = modalErrorObject.error.response.data.data.code ?? '';
        const context = modalErrorObject?.context ?? '';
        const { title: modalTitle, description: modalDescription } = setError(errorCode, context);
        title = modalTitle;
        description = modalDescription;
      } else {
        const { title: modalTitle, description: modalDescription } = setError();
        title = modalTitle;
        description = modalDescription;
      }
    }

    if (!title && !description) {
      const { title: defaultTitle, description: defaultDescription } = setError();
      title = defaultTitle;
      description = defaultDescription;
    }

    return { title: title, description: description };
  }, [modalErrorObject]);

  return (
    <ModalError
      title={modalMessage.title}
      description={modalMessage.description}
      open={showModalError}
      handleClose={closeModalError}
    />
  );
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
