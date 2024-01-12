import { ReactElement } from 'react';

export interface MuiModalProps {
  open: boolean;
  handleClose: (...e: any[]) => void;
  children: ReactElement;
}
