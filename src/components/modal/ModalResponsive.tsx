import { SxProps, useTheme } from '@mui/material/styles';
import { Box, Fab, Modal, Slide } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Close as CloseIcon, Padding } from '@mui/icons-material';
//Internal app
import { MuiModalProps } from '@/interfaces';

const DesktopStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 2,
  textAlign: 'center',
  padding: '30px 20px 20px 20px',
};

const PWAStyle: SxProps = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: '16px 16px 0 0',
  boxShadow: 2,
  p: 4,
};

const DesktopDialog = (props: MuiModalProps) => {
  const theme = useTheme();
  const { open, handleClose, children } = props;
  return (
    <Modal open={open} onClose={() => {}}>
      <Box sx={DesktopStyle}>
        {children}
        <Fab
          size="small"
          onClick={handleClose}
          sx={{
            width: 34,
            height: 34,
            minHeight: 34,
            border: '1px solid',
            borderColor: theme.palette.secondary.light,
            boxShadow: 2,
            bgcolor: 'white',
            position: 'absolute',
            right: -12,
            top: -12,
            '& .MuiSvgIcon-root': {
              height: 14,
            },
          }}
        >
          <CloseIcon color="primary" />
        </Fab>
      </Box>
    </Modal>
  );
};

const PwaDialog = (props: MuiModalProps) => {
  const { open, handleClose, children } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Slide in={open} direction="up" timeout={300}>
        <Box sx={PWAStyle}>{children}</Box>
      </Slide>
    </Modal>
  );
};

export default function ModalResponsive(props: MuiModalProps) {
  const { open, handleClose, children } = props;
  const theme = useTheme();
  const matche = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {matche ? (
        <PWADialog open={open} handleClose={handleClose}>
          {children}
        </PwaDialog>
      ) : (
        <DesktopDialog open={open} handleClose={handleClose}>
          {children}
        </DesktopDialog>
      )}
    </>
  );
}
