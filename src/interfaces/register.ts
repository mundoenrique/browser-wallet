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
 * Consultant data - Identify
 *
 * @typeParam  user: string;
 */
export type DataUserProps = {
  user: string;
};
