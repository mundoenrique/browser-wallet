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
 * @typeParam  referer: string | null;
 */
export type DataUserProps = {
  user: string;
  referer: string | null;
  host: string | null;
};

/**
 * Loading screen
 * @typeParam message: string
 */
export type LoadingScreenProps = {
  message: string;
};
