import { StaticImageData } from 'next/image';

/**
 * Multi Step register
 *
 * @typeParam children: React.ReactNode
 * @typeParam stepNumber: string
 */
export interface StepperProps {
  children: React.ReactNode;
  stepNumber: string;
}

/**
 * Welcome Animation Register
 *
 * @typeParam animation: string | StaticImageData
 * @typeParam text: string | React.ReactNode
 */
export interface WelcomeAnimationProps {
  animation: string | StaticImageData;
  text: string | React.ReactNode;
}
