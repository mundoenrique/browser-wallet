'use client';

import { Alert, AlertTitle, Snackbar, Typography } from '@mui/material';
//Internal app
import { ModalErrorProps } from '@/interfaces';

export default function ModalError(props: ModalErrorProps) {
  const { title, description, open, handleClose, handleReload } = props;

  return (
    <Snackbar
      sx={{ maxWidth: 533 }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        sx={{ bgcolor: '#FBE5E5', border: `1px solid #ef5350`, minWidth: 250 }}
        severity="error"
        onClose={() => handleClose()}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>
        {description}
        {handleReload && (
          <Typography
            variant="subtitle2"
            onClick={() => {
              handleReload();
            }}
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Intenta de nuevo
          </Typography>
        )}
      </Alert>
    </Snackbar>
  );
}
