import { BoxProps } from '@mui/system';

/**
 * Global modal
 *
 * @typeParam open: boolean
 * @typeParam handleClose: (...e: any[]) => void
 * @typeParam children: React.ReactElement
 */
export interface MuiModalProps extends BoxProps {
  open: boolean;
  handleClose: (...e: any[]) => void;
  children: React.ReactElement;
}

/**
 * Global OTP modal
 *
 * @typeParam handleClose: () => void
 * @typeParam open: boolean
 * @typeParam onSubmit: (data: any) => Promise<void>
 */
export interface ModalOtpProps {
  handleClose: () => void;
  open: boolean;
  onSubmit: (data: any) => Promise<void>;
}
