/**
 * Table of the last movements
 *
 * @typeParam data: [{
 *
 * title: string
 *
 * date: string
 *
 * amount: number
 *
 * incoming: boolean
 *
 * }]
 */
export interface TableDataProps {
  data: {
    description: string;
    date: string;
    amount: number;
    [key: string]: any;
  }[];
  loading?: boolean;
  error?: boolean;
  emptySlot?: JSX.Element;
}
