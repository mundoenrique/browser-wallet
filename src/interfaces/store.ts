export interface SignupStore {
  step: number;
  showHeader: boolean;
  setShowHeader: (value: boolean) => void;
  inc: () => void;
  dec: () => void;
  updateStep: (amount: number) => void;
  updateFormState: (form: string, data: {}) => void;
  verificationFormState: object | null;
  ocupationFormState: object | null;
  pepFormState: object | null;
  biometricFormState: null | null;
}
