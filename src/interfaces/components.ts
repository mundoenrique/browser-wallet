import { ReactElement } from 'react';
import { BoxProps } from '@mui/material';
import { StaticImageData } from 'next/image';
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
  closeApp?: boolean;
}

export interface RCProps extends ChildrenProps {
  responseCode: React.ReactNode;
}

export interface AuthOtpProps extends ChildrenProps {
  authOtp: React.ReactNode;
}

export interface CardDetailsProps extends ChildrenProps {
  avatarImage?: any;
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

export interface ItemSecondarySidebar {
  color?: boolean;
  text: string;
  icon: React.ReactNode;
}

export interface StepperProps {
  children: React.ReactNode;
  stepNumber: string;
}

export interface BackInformationProps {
  hideDetails: () => void;
  holder: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
}

export interface FrontInformationProps {
  showDetails: () => void;
  cardNumber: string;
  balance: string;
}

export interface HandleCardProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void | boolean;
  large?: number;
  avatar: React.ReactNode;
  disabled?: boolean;
}

export interface ModalOtpProps {
  handleClose: () => void;
  open: boolean;
  onSubmit: (data: any) => Promise<void>;
}
