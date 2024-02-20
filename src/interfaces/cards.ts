import { ChildrenProps } from './constans';

/**
 * Handle card
 *
 * @typeParam children: React.ReactNode
 * @typeParam icon (Optioanl): React.ReactNode
 * @typeParam onClick (Optioanl): () => void | boolean
 * @typeParam large (Optioanl): number
 * @typeParam avatar: React.ReactNode
 * @typeParam disabled (Optioanl): boolean
 */
export interface HandleCardProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void | boolean;
  large?: number;
  avatar: React.ReactNode;
  disabled?: boolean;
}

/**
 * Back information card
 *
 * @typeParam hideDetails: () => void
 * @typeParam holder: string
 * @typeParam cardNumber: string
 * @typeParam expDate: string
 * @typeParam cvc: string
 */
export interface BackInformationProps {
  hideDetails: () => void;
  holder: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
}

/**
 * Front information card
 *
 * @typeParam showDetails: () => void
 * @typeParam cardNumber: string
 * @typeParam balance: string
 */
export interface FrontInformationProps {
  showDetails: () => void;
  cardNumber: string;
  balance: string;
}

/**
 * Debt card
 *
 * @typeParam OweMe (Optional): boolean
 */
export interface CardDebtProps {
  OweMe?: boolean;
}

/**
 * Detailed card
 *
 * @typeParam avatarImage (Optional): any
 * @typeParam avatarText (Optional): string
 */
export interface CardDetailsProps extends ChildrenProps {
  avatarImage?: any;
  avatarText?: string;
}
