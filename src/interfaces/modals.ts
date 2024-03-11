import { BoxProps } from '@mui/system';

/**
 * Global modal
 *
 * @typeParam open: boolean
 * @typeParam handleClose: (...e: any[]) => void
 * @typeParam children: React.ReactNode
 */
export interface MuiModalProps extends BoxProps {
  open: boolean;
  handleClose: (..._e: any[]) => void;
  children?: React.ReactNode;
}

/**
 * Global OTP modal
 *
 * @typeParam handleClose: () => void
 * @typeParam open: boolean
 * @typeParam onSubmit: (data: any) => Promise<void>
 * @typeParam closeApp (Optional): boolean
 */
export interface ModalOtpProps {
  handleClose: () => void;
  open: boolean;
  onSubmit: (_data: any) => Promise<void>;
  closeApp?: boolean;
}
