import { BoxProps } from '@mui/system';
import { Dispatch } from 'react';

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
 * @typeParam title (Optional): string | boolean;
 * @typeParam textButton (Optional): string | boolean;
 */
export interface ModalOtpProps {
  handleClose: () => void;
  open: boolean;
  onSubmit: (_data: any) => Promise<void>;
  closeApp?: boolean;
  title?: string | boolean;
  textButton?: string | boolean;
  setOtpUuid: any;
  processCode: string;
}

/**
 * Modal used to display error messages
 *
 * @typeParam title: Title of the error that is generated.
 * @typeParam description: The description of the error generated.
 */
export interface ModalErrorProps {
  title: string | JSX.Element;
  description: string | JSX.Element;
  open: boolean;
  handleClose: () => void;
}
