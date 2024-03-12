import { InputCheckGroupOptionProps } from './forms';

/**
 * Clients filter
 *
 * @typeParam handleChangeView: (view: string) => void
 * @typeParam checkboxOptions: InputCheckGroupOptionProps[]
 * @typeParam checkboxOptionDefault: string
 * @typeParam onChangeCheckbox: (option: InputCheckGroupOptionProps) => void
 * @typeParam months: InputCheckGroupOptionProps[]
 * @typeParam onChangeMonth: (option: InputCheckGroupOptionProps) => void
 * @typeParam monthDefault: InputCheckGroupOptionProps
 * @typeParam handleFilters: () => void
 */
export interface IFiltersProps {
  handleChangeView: (view: string) => void;
  checkboxOptions: InputCheckGroupOptionProps[];
  checkboxOptionDefault: string;
  onChangeCheckbox: (option: InputCheckGroupOptionProps) => void;
  months: InputCheckGroupOptionProps[];
  onChangeMonth: (option: InputCheckGroupOptionProps) => void;
  monthDefault: InputCheckGroupOptionProps;
  handleFilters: () => void;
}
