/**
 * User Interface
 * @typeParam userId: string
 * @typeParam firstName: string
 * @typeParam lastName: string
 * @typeParam phoneNumber: string
 * @typeParam email: string
 * @typeParam cardSolutions: {
 *  userId: string
 * cardId: string
 * }

 */
export type TUserDetail = {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  cardSolutions: TCardSolutions;
};

/**
 * Card Solutions Interface
 * @typeParam userId: string
 * @typeParam cardId: string
 */
export type TCardSolutions = {
  userId: string;
  cardId: string;
};

/**
 * Credentials Interface
 * @typeParam userId: string
 * @typeParam password: string
 */
export type TCredentials = {
  userId: string;
  password: string;
};
