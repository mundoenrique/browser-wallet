import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Configuración Tarjeta | Yiro',
  description: 'Configuración de la tarjeta física o virtual Yiro',
};

export default function CardConfigurationLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
