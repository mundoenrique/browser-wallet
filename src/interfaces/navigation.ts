/**
 * Top bar titles
 *
 * @typeParam title: string
 * @typeParam updateTitle: (newTitle: string) => void
 */
export interface NavTitleStore {
  title: string;
  updateTitle: (newTitle: string) => void;
}

/**
 * Active menu item
 *
 * @typeParam title: string
 * @typeParam updateTitle: (item: string) => void
 */
export interface MenuStore {
  currentItem: string;
  setCurrentItem: (item: string) => void;
}

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
 */
export interface ItemSecondarySidebar {
  color?: boolean;
  text: string;
  icon: React.ReactNode;
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
 */
export interface LinkingProps {
  href: string;
  mb?: number | string;
  label: string;
  color?: string;
  underline?: boolean;
  hidenArrow?: boolean;
}
