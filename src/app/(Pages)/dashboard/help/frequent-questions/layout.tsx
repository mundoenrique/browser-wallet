import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes | Yiro',
  description: 'Sección de ayuda con las preguntas frecuentes de Yiro',
};

export default function QuestionsLayout({ children }: Readonly<ChildrenProps>) {
  return <>{children}</>;
}
