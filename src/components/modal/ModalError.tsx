'use client';

import { useState } from 'react';
import { Alert, AlertTitle, Collapse, Snackbar } from '@mui/material';
//Internal app
import { ModalErrorProps } from '@/interfaces';
import { useUiStore } from '@/store';

export default function ModalError(props: ModalErrorProps) {
  const { title, description } = props;
  const { showModalError, closeModalError } = useUiStore();

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={showModalError} autoHideDuration={6000}>
      <Alert
        sx={{ bgcolor: '#FBE5E5', border: `1px solid #ef5350`, minWidth: 250 }}
        severity="error"
        onClose={() => closeModalError()}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>
        {description}
      </Alert>
    </Snackbar>
  );
}
