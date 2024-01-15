import { useTheme } from '@mui/material/styles';
import { Box, Fab, Modal, Slide } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Close as CloseIcon } from '@mui/icons-material';
//Internal app
import { MuiModalProps } from '@/interfaces';

const DesktopStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};
const PWAStyle = {
  position: 'absolute' as 'absolute',
  bottom: 0,
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: '16px 16px 0 0',
  boxShadow: 24,
  p: 4,
};

export default function ModalResponsive(props: MuiModalProps) {
  const { open, handleClose, children } = props;
  const theme = useTheme();
  const matche = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(theme);
  return (
    <>
      {matche ? (
        <PWADialog open={open} handleClose={handleClose}>
          {children}
        </PWADialog>
      ) : (
        <DesktopDialog open={open} handleClose={handleClose}>
          {children}
        </DesktopDialog>
      )}
    </>
  );
}

const DesktopDialog = (props: MuiModalProps) => {
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
            border: '1px solid  #CAC3EF',

            position: 'absolute' as 'absolute',
            right: -12,
            top: -12,
            '& .MuiSvgIcon-root': {
              height: 14,
            },
          }}
        >
          <CloseIcon />
        </Fab>
      </Box>
    </Modal>
  );
};
const PWADialog = (props: MuiModalProps) => {
  const { open, handleClose, children } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Slide in={open} direction="up" timeout={300}>
        <Box sx={PWAStyle}>{children}</Box>
      </Slide>
    </Modal>
  );
};
