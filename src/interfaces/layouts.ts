import { ChildrenProps } from './constans';

/**
 * Eliminar
 */
export interface RCProps extends ChildrenProps {
  responseCode: React.ReactNode;
}

/**
 * Purple layout
 *
 * @typeParam children: React.ReactNode
 * @typeParam hidePelca (Optional): boolean
 */
export interface PurpleLayoutProps {
  children: React.ReactNode;
  hidePelca?: boolean;
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
