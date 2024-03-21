import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Pagar deuda | Yiro',
  description: 'Paga tus deudas con Yiro',
};

export default function DebtLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
