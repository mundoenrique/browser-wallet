'use client';

import { useMemo, useState } from 'react';
//Internal app
import { useAccessSessionStore, useKeyStore, useUiStore, useUserStore } from '@/store';
import ModalError from '../modal/ModalError';
import { ModalResponsive } from '..';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function GlobalErrorMessage() {
  const { push } = useRouter();

  const showModalError = useUiStore((state) => state.showModalError);
  const reloadFunction = useUiStore((state) => state.reloadFunction);
  const closeModalError = useUiStore((state) => state.closeModalError);
  const modalErrorObject = useUiStore((state) => state.modalErrorObject);
  const clearReloadFunction = useUiStore((state) => state.clearReloadFunction);
  const jwePublicKey = useKeyStore((state) => state.jwePublicKey);
  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);

  const closeSession = async () => {
    localStorage.removeItem('sessionTime');
    localStorage.removeItem('intervalId');
    await api.delete('/redis', { data: { jwePublicKey, delParam: 'timeSession' } });
    await api.delete('/redis', { data: { key: 'activeSession', jwePublicKey, delParam: user.userId } });
    setAccessSession(false);
    setOpen(false);
    push('/signin');
  };

  const sessionExpired = async (eCode: string) => {
    const code = eCode?.split('.').pop() ?? '';

    if (code === '9998') {
      setOpen(true);
      clearInterval(Number(localStorage.getItem('intervalId')));
      setTimeout(() => { closeSession() }, 5000);
    } else if (code === '9999') {
      push('/signout');
    }

  }

  const resetError = () => {
    closeModalError();
    clearReloadFunction();
  };

  const modalMessage = useMemo(() => {
    let title = '';
    let description = '';

    if (modalErrorObject) {
      if ('title' in modalErrorObject && 'description' in modalErrorObject) {
        const { title: modalTitle, description: modalDescription } = modalErrorObject;
        title = modalTitle;
        description = modalDescription;
      } else if ('error' in modalErrorObject) {
        const errorCode = modalErrorObject.error?.response?.data?.data?.code ?? '';
        const context = modalErrorObject?.context ?? '';
        const { title: modalTitle, description: modalDescription } = setError(errorCode, context);
        title = modalTitle;
        description = modalDescription;
        sessionExpired(errorCode)
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
    <>
      <ModalError
        title={modalMessage.title}
        description={modalMessage.description}
        open={showModalError}
        handleClose={resetError}
        handleReload={reloadFunction}
      />
      <ModalResponsive open={open} handleClose={closeSession}>
        <Box>
          <Typography variant="subtitle1" mb={3}>
            Tu sesión ha finalizado, clic en cerrar para ingresar nuevamente.
          </Typography>
        </Box>
      </ModalResponsive>
    </>
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
    '008': { description: 'La tarjeta se encuentra bloqueada' },
    '009': { description: 'Identificador de tarjeta no válido' },
    '014': { description: 'Código de bloqueo no válido' },
    '015': { description: 'La cuenta ya está registrada' },
    '033': { description: 'El usuario no se encuentra en el sistema' },
    '044': { description: 'Fondos insuficientes' },
    '051': { description: 'Número máximo de transacciones alcanzado' },
    '057': { title: 'Usuario bloqueado', description: 'Tu cuenta de acceso ha sido bloqueada por 24h' },
    '058': {
      title: 'Credenciales inválidas',
      description: 'Después de 3 intentos incorrectos el acceso se bloqueará. En caso no recuerdes tu clave, cámbiala.',
    },
    '064': { description: 'El documento ya ha sido registrado por otro usuario' },
    '066': { description: 'El número de teléfono ya ha sido registrado por otro usuario' },
    '085': { description: 'El código OTP ha expirado' },
    '093': { description: 'El usuario se encuentra bloqueado' },
    '106': { title: 'Usuario invalido', description: 'Por favor ponte en contacto con Somos Belcorp' },
    '312': { description: 'El correo ya ha sido registrado por otro usuario' },
    '313': { description: 'El id de usuario ya se encuentra registrado' },
    '338': { description: 'Código de transacción no válido' },
    '354': { description: 'Supera el límite de importe' },
    '365': { description: 'Rango de fechas no válido' },
    '367': { description: 'La tarjeta no se encuentra activa' },
    '368': { description: 'El límite de paginación supera el rango permitido' },
    '369': { description: 'El número de página supera el rango permitido' },
    '374': { description: 'La tarjeta no está asociada a una cuenta' },
    '375': { description: 'No es posible mostrar la información de la tarjeta' },
    '378': { description: 'Tarjeta activada. Debe cancelar la tarjeta para completar el flujo de reposición.' },
    '396': { description: 'Parametros inválidos' },
    '407': { description: 'La tarjeta ha expirado' },
    '437': { description: 'No hemos podido procesar la transacción' },
    '464': { description: 'El código OTP no es válido' },
    '486': { description: 'La tarjeta ya se encuentra asociada a una cuenta' },
    '522': { description: 'Supera el límite de frecuencia de retiros' },
    '990': { description: 'Token de acceso no válido.' },
    '992': { description: 'Firma no válida.' },
    '993': { description: 'Token de acceso vencido.' },
    '995': { description: 'La nueva contraseña no puede ser la misma que las últimas 3 utilizadas.' },
    '999': { description: 'Error interno del servidor' },
    '9998': { description: 'La sesión ha expirado' },

    login: { '057': { description: 'Cuenta Bloqueada', title: 'login Inválido' } },
  };

  const contextErrors = context && errorsMessages[context];
  const errorCode = contextErrors?.[code] ?? errorsMessages[code] ?? defaultError;

  return { ...defaultError, ...errorCode };
};
