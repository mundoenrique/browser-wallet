import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Transferir',
  description: 'Transfiere dinero a otro consultor con tu Yiro',
};

export default function CollectLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
