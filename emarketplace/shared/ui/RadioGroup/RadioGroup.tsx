import React, { ReactElement, InputHTMLAttributes } from 'react';

import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface Props {
  name: string;
  items: { label: string; value: string }[];
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  defaultValue: string;
}

export const RadioGroupButtons = ({
  items,
  name,
  inputProps,
  defaultValue,
}: Props): ReactElement => {
  console.log(inputProps.value);
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby='radio-buttons-group'
        defaultValue={defaultValue}
        name={name}
      >
        {items.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio {...inputProps} size='medium' color='primary' />}
            label={label}
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '1.6rem' } }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
