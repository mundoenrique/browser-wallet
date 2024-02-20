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
    date: string;
    title: string;
    amount: number;
    incoming: boolean;
  }[];
}
