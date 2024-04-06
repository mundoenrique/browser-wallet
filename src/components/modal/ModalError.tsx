'use client';

import { useState } from 'react';
import { Alert, AlertTitle, Collapse } from '@mui/material';
//Internal app
import { ModalErrorProps } from '@/interfaces';

export default function ModalError(props: ModalErrorProps) {
  const { title, description } = props;
  const [hideModal, setHideModal] = useState<boolean>(true);

  return (
    <Collapse sx={{ position: 'absolute', bottom: 16, right: 16 }} in={hideModal}>
      <Alert
        sx={{ bgcolor: '#FBE5E5', border: `1px solid #ef5350`, minWidth: 250 }}
        severity="error"
        onClose={() => setHideModal(false)}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>
        {description}
      </Alert>
    </Collapse>
  );
}
