/**
 * Purple layout
 *
 * @typeParam children: React.ReactNode
 * @typeParam hidePelca (Optional): boolean
 * @typeParam bigModal (Optional): boolean
 * @typeParam left (Optional): boolean
 * @typeParam navbar (Optional): boolean
 * @typeParam confetti (Optional): boolean
 */
export interface PurpleLayoutProps {
  children: React.ReactNode;
  hidePelca?: boolean;
  bigModal?: boolean;
  left?: boolean;
  navbar?: boolean;
  confetti?: boolean;
  width?: string;
}

/**
 * Main container layout
 *
 * @typeParam children: React.ReactNode
 * @typeParam fullWidth?: boolean
 */
export interface ContainerLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Container for error messages
 *
 * @typeParam title: string
 * @typeParam  description: string
 * @typeParam onClick: () => void
 */
export interface StatusReportProps {
  title: string;
  description: string;
  onClick: () => void;
}

/**
 * Not found Error
 *
 * @typeParam code: 404 | 500;
 */
export interface NotFoundErrorProps {
  code: 404 | 500;
}

/**
 * Error debit
 *
 * @typeParam title: string
 * @typeParam description: string
 * @typeParam onClick: () => void
 * @typeParam iconName: string
 **/
export interface ErrorDebitProps {
  title: string;
  description: string;
  onClick: () => void;
  iconName?: string;
}
