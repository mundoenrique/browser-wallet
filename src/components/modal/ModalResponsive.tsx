'use client';

import { forwardRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Fab, Modal, Slide, useMediaQuery } from '@mui/material/';

//Internal app
import { MuiModalProps } from '@/interfaces';

const RootModal = styled(Modal, {
  name: 'ModalResponsive',
  slot: 'root',
})(() => ({}));

const BodyModal = styled(Box, {
  name: 'ModalResponsive',
  slot: 'body',
})(({ theme }) =>
  useMediaQuery(theme.breakpoints.down('sm'))
    ? {
        //pwa
        outline: 'none',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        background: theme.palette.background.paper,
        borderRadius: '16px 16px 0 0',
        boxShadow: theme.shadows[2],
        padding: 12,
      }
    : {
        //desktop
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: theme.palette.background.paper,
        borderRadius: '16px',
        boxShadow: theme.shadows[2],
        textAlign: 'center',
        padding: '30px 20px 20px 20px',
        outline: 'none',
      }
);

const CloseButton = styled(Fab, {
  name: 'ModalResponsive',
  slot: 'closeButton',
})(({ theme }) => ({
  width: 32,
  height: 32,
  minHeight: 32,
  border: '1px solid',
  borderColor: theme.palette.secondary.light,
  boxShadow: theme.shadows[2],
  background: theme.palette.background.paper,
  position: 'absolute',
  right: -16,
  top: -16,
  display: useMediaQuery(theme.breakpoints.down('sm')) ? 'none' : 'inline-flex',
  '& .MuiSvgIcon-root': {
    height: 20,
    Width: 20,
  },
  ':hover': {
    boxShadow: theme.shadows[3],
    background: theme.palette.background.paper,
  },
}));

const ModalResponsive = forwardRef((props: MuiModalProps, ref: any) => {
  const { open, handleClose, children, ...others } = props;
  const theme = useTheme();
  const matche = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <RootModal
      open={open}
      onClose={() => {
        matche && handleClose();
      }}
      ref={ref}
    >
      <Box>
        <BodyModal {...others}>
          {children}
          <CloseButton onClick={handleClose}>
            <CloseIcon color="primary" />
          </CloseButton>
        </BodyModal>
      </Box>
    </RootModal>
  );
});

export default ModalResponsive;
