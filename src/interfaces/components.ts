import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { BoxProps } from '@mui/material';
//Internal app
import { ChildrenProps } from './constant';

export interface MuiModalProps extends BoxProps {
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

export interface PurpleLayoutProps {
  children: React.ReactNode;
  hidePelca?: boolean;
}

export interface NavbarProps {
  onClick: () => void;
}

export interface SidebarProps {
  drawerWidth: number;
  open: boolean;
  onTransitionEnd: () => void;
  onClose: () => void;
}
