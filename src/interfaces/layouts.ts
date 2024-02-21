/**
 * Purple layout
 *
 * @typeParam children: React.ReactNode
 * @typeParam hidePelca (Optional): boolean
 * @typeParam bigModal (Optional): boolean
 * @typeParam left (Optional): boolean
 * @typeParam navbar (Optional): boolean
 * @typeParam HandleNavbar (Optional): () => void
 */
export interface PurpleLayoutProps {
  children: React.ReactNode;
  hidePelca?: boolean;
  bigModal?: boolean;
  left?: boolean;
  navbar?: boolean;
  HandleNavbar?: () => void;
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
