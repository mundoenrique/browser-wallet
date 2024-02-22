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
    title: string;
    date: string;
    amount: number;
    incoming: boolean;
  }[];
}
