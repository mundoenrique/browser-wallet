/**
 * Navbar
 *
 * @typeParam onClick: () => void
 */
export interface NavbarProps {
  onClick: () => void;
}

/**
 * Navbar External
 *
 * @typeParam image (Optional): boolean
 * @typeParam color (Optional): string
 * @typeParam closeApp (Optional): boolean
 */
export interface MuiNavExternalProps {
  image?: boolean;
  color?: string;
  closeApp?: boolean;
}

/**
 * Sidebar
 *
 * @typeParam drawerWidth: number
 * @typeParam open: boolean
 * @typeParam onTransitionEnd: () => void
 * @typeParam onClose: () => void
 */
export interface SidebarProps {
  drawerWidth: number;
  open: boolean;
  onTransitionEnd: () => void;
  onClose: () => void;
}

/**
 * Sidebar secondary child elements
 *
 * @typeParam color (Optional): boolean
 * @typeParam text: string
 * @typeParam icon: React.ReactNode
 * @typeParam href: string;
 * @typeParam onClick (Optional): () => void;
 */
export interface ItemSecondarySidebarProps {
  color?: boolean;
  text: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

/**
 * Link MUI and Next
 *
 * @typeParam href: string
 * @typeParam mb (Optional): number | string
 * @typeParam label: string
 * @typeParam color (Optional): string
 * @typeParam underline (Optional): boolean
 * @typeParam hidenArrow (Optional): boolean
 * @typeParam fontSize (Optional): number | string
 * @typeParam adormentStart?: boolean;
 * @typeParam adormentEnd?: boolean;
 */
export interface LinkingProps {
  href: string;
  mb?: number | string;
  label: string;
  color?: string;
  underline?: boolean;
  hidenArrow?: boolean;
  iconSize?: { height: number | string; width: number | string };
  fontSize?: number | string;
  onClick?: (e: any) => void;
  adormentStart?: boolean;
  adormentEnd?: boolean;
}
