export interface SignupStore {
  /**
   * A variable representing the screen on which the onboarding process is currently in progress
   */
  step: number;
  /**
   * Status of the header in the onboarding template, it hides/shows the component in the template.
   */
  showHeader: boolean;
  /**
   * Sets the value of the variable that hides/shows the header.
   */
  setShowHeader: (value: boolean) => void;
  /**
   * Increases the step by 1 which leads to navigate to the following screen
   *
   */
  inc: () => void;
  /**
   * Decreases the step by 1 which leads to navigate to the back screen
   */
  dec: () => void;
  /**
   * Goes to the step specified in the parameter
   *
   */
  updateStep: (amount: number) => void;
  /**
   * Updates the storage of the given form
   *
   */
  updateFormState: (form: string, data: {}) => void;
  /**
   * Storage of the verification form data
   */
  verificationFormState: object | null;
  /**
   * Storage of the ocupation form data
   */
  ocupationFormState: object | null;
  /**
   * Storage of the pep form data
   */
  pepFormState: object | null;
  /**
   * Storage of the biometric form data
   */
  biometricFormState: null | null;
}

export interface NavTitleStore {
  /**
   * Title for de page/section
   */
  title: string;
  /**
   * Set value for the title
   */
  updateTitle: (newTitle: string) => void;
}

export interface MenuStore {
  /**
   * Current menu item
   */
  currentItem: string;
  /**
   *Replaces the current menu item
   */
  setCurrentItem: (item: string) => void;
}
