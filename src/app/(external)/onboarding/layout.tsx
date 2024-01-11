import { Box } from '@mui/material';
//Internal app
import { RootLayoutProps } from '@/interfaces';

export default function DashboardLayout({ children }: RootLayoutProps) {
  return <Box>{children}</Box>;
}
