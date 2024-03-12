import { InputCheckGroupOptionProps, InputCheckGroupOptionsProps } from './forms';

export interface IFiltersProps {
  handleChangeView: () => void;
  checkboxOptions: InputCheckGroupOptionProps[];
  checkboxOptionDefault: string;
  onChangeCheckbox: (option: InputCheckGroupOptionProps) => void;
  months: InputCheckGroupOptionProps[];
  onChangeMonth: (option: InputCheckGroupOptionProps) => void;
  monthDefault: InputCheckGroupOptionProps;
  handleFilters: () => void;
}
