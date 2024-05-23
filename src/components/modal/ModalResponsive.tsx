'use client';

import { forwardRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Link as MuiLink, Modal, useMediaQuery, Typography, Slide } from '@mui/material/';
//Internal app
import { MuiModalProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

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
        textAlign: 'center',
      }
    : {
        //desktop
        padding: '0px 20px 32px 20px',
        borderRadius: '16px',
        width: 400,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        textAlign: 'center',
        outline: 'none',
      }
);

const CloseButtonContainer = styled(Box, {
  name: 'ModalResponsive',
  slot: 'closeButton',
})(() => ({
  display: 'flex',
  justifyContent: 'right',
  height: 52,
}));

/**
 * Windows used to display informational messages or operational responses.
 *
 * @param handleClose - Function of the modal to close it with the X.
 * @param open - State of the modal to show it or not.
 * @param children - Children elements.
 */

const ModalResponsive = forwardRef(function MyModalResponsive(props: MuiModalProps, ref: any) {
  const { open, handleClose, children, ...others } = props;
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <RootModal
      open={open}
      onClose={() => {
        match && handleClose();
      }}
      ref={ref}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit timeout={match ? 300 : 0}>
          <BodyModal {...others}>
            <CloseButtonContainer onClick={handleClose}>
              <MuiLink
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: fuchsiaBlue[800],
                  textDecoration: 'none',
                }}
              >
                <Typography>Cerrar</Typography>
                <CloseIcon />
              </MuiLink>
            </CloseButtonContainer>
            {children}
          </BodyModal>
        </Slide>
      </Box>
    </RootModal>
  );
});

export default ModalResponsive;
