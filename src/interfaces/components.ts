import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
//Internal app
import { ChildrenProps } from './constant';

export interface MuiModalProps {
  open: boolean;
  handleClose: (...e: any[]) => void;
  children: ReactElement;
}

export interface MuiNavExternalProps {
  image?: boolean;
  color?: string;
  relative?: boolean;
  closeApp?: boolean;
}

export interface AuthOtpProps extends ChildrenProps {
  authOtp: React.ReactNode;
}

export interface CardDetailsProps extends ChildrenProps {
  avatarImage?: { src: StaticImageData; alt: string };
  avatarText?: string;
}
