'use client';

import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { InputCheckGroupOptionProps, InputCheckGroupOptionsProps } from '@/interfaces';

export default function InputCheckGroup(props: InputCheckGroupOptionsProps): JSX.Element {
  const { name, options, onChange, defaultValue } = props;
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleCheckboxChange = (option: InputCheckGroupOptionProps) => {
    onChange && onChange(option);
    if (selectedValue === option.value) {
      setSelectedValue('');
    } else {
      setSelectedValue(option.value);
    }
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: '.5rem' }}>
        {name}:
      </Typography>
      <FormGroup>
        {options.map((option: InputCheckGroupOptionProps, idx: number) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox checked={selectedValue === option.value} onChange={() => handleCheckboxChange(option)} />
            }
            label={option.text}
            sx={{ alignItems: 'flex-start', '&>.MuiFormControlLabel-label': { fontSize: 14 }, mr: 0 }}
          />
        ))}
      </FormGroup>
    </>
  );
}
