'use client';

import { useUiStore } from '@/store';
import ModalError from '../modal/ModalError';

export default function GlobalErrorMessage() {
  const { modalErrorDesc, modalErrorTitle, showModalError, closeModalError } = useUiStore();
  return (
    <ModalError
      title={modalErrorTitle}
      description={modalErrorDesc}
      open={showModalError}
      handleClose={closeModalError}
    />
  );
}
