'use client';

import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, Switch } from '@mui/material';
//Internal App
import { SwitchListProps } from '@/interfaces';

function SwitchMUI(props: SwitchListProps): JSX.Element {
  const { name, onChange, value, label, disabled, checked, fullWidth, switchProps } = props;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth={fullWidth}>
      <FormControlLabel
        value={value}
        label={label}
        name={name}
        disabled={disabled}
        checked={checked}
        sx={{ m: 0 }}
        control={<Switch focusVisibleClassName=".Mui-focusVisible" onChange={onChange} {...switchProps} />}
      />
    </FormControl>
  );
}

/**
 * Switches toggle the state of a single setting on or off.
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param label - The label of the switch input.
 * @param labelError - Text for error message.
 * @param onChange - Detect the change in the switch input.
 * @param colorText - Input label color.
 * @param disabled - Disable switch input.
 * @param readOnly - Make the switch input read-only.
 * @param options - Array with number of fields autocomplete.
 * @returns The value assigned to the autocomplete input.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label Material UI - {@link https://mui.com/material-ui/react-switch/}
 */
export default function SwitchCheck(props: SwitchListProps) {
  const { name, control, onChange, switchProps, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SwitchMUI
              name={name}
              value={field.value}
              checked={!field.value ? false : true}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              switchProps={switchProps}
              error={error}
              {...restProps}
            />
          )}
        />
      ) : (
        <SwitchMUI name={name} {...restProps} switchProps={switchProps} />
      )}
    </>
  );
}
