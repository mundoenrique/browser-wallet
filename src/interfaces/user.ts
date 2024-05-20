/**
 * User Interface
 * @typeParam userId: string
 * @typeParam firstName: string
 * @typeParam firstLastName: string;
 * @typeParam middleName: string;
 * @typeParam secondLastName: string;
 * @typeParam gender: string;
 * @typeParam birthDay: string;
 * @typeParam phoneNumber: string
 * @typeParam email: string
 * @typeParam cardSolutions: {
 * code: string;
 * name: string;
 * }
 * @typeParam cardSolutions: {
 * userId: string
 * cardId: string
 * }

 */
export type TUserDetail = {
  userId: string;
  firstName: string;
  firstLastName: string;
  middleName: string;
  secondLastName: string;
  gender: string;
  birthDay: string;
  phoneNumber: string;
  email: string;
  status: TStatus;
  cardSolutions: TCardSolutions;
};

/**
 * Status Interface
 * @typeParam code: string;
 * @typeParam name: string;
 */
export type TStatus = {
  code: string;
  name: string;
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
