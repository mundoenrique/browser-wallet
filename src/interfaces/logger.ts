/**
 * Data shown in the log
 *
 * @typeParam level: string
 * @typeParam message: string
 * @typeParam user (Optional): string
 * @typeParam ip (Optional): string
 * @typeParam timestamp: string
 */
export type LogData = {
  level: string;
  message: string;
  user?: string;
  ip?: string;
  timestamp: string;
};
