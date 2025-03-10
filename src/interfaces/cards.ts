import { ICardDebt } from './api';
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
  cardNumber: string | undefined;
  balance: string | undefined;
  balanceError: boolean;
  cardInformationError: boolean;
  cardStatus: object | undefined;
}

/**
 * Debt card
 *
 * @typeParam data:
 *
 * code: string;
 *
 * data: {
 *
 *   amount: number | string | null;
 *
 *   currencyCode: string;
 *
 *   expirationDate?: string | null;
 *
 *   clients?: number | null;
 *
 * };
 * @typeParam onClick (Optional): () => void
 */
export interface CardDebtProps {
  data: ICardDebt;
  onClick?: () => void | boolean;
}

/**
 * Detailed card
 *
 * @typeParam avatarImage (Optional): any
 * @typeParam avatarText (Optional): string | React.ReactNode
 * @typeParam textBotton (Optional): string
 * @typeParam download (Optional): boolean;
 * @typeParam shared (Optional): boolean;
 * @typeParam onClick (Optional): () => void | boolean;
 */
export interface CardTicketProps extends ChildrenProps {
  avatarImage?: any;
  avatarText?: string | React.ReactNode;
  textBotton?: string;
  download?: boolean;
  shared?: boolean;
  transferDetail?: TransferDetail;
  onClick?: () => void | boolean;
}

export interface TransferDetail {
  amount: number | null;
  receiver: string;
  date: string;
  transactionCode: string;
}

/**
 * Card with information about the operation
 *
 * @typeParam date: string
 * @typeParam amount: string | number
 * @typeParam name: string
 */
export interface CardInfoOperationProps {
  date: string;
  amount: string | number;
  name: string;
}

/**
 * Card PagoEfectivo
 *
 * @typeParam string | number
 * @typeParam children: React.ReactNode
 * @typeParam label: string
 * @typeParam download (Optional): boolean
 * @typeParam share (Optional): boolean
 */
export interface CardPagoEfectivoProps {
  cip: string;
  children: React.ReactNode;
  label: string;
  download?: boolean;
  share?: boolean;
  codeQr?: string;
}
