import React, { useState } from 'react';

import {
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type SelectItemType = {
  title: string;
  value: string;
  disabled?: boolean;
};

export type CustomSelectProps = {
  name: string;
  value: string;
  placeholder?: string;
  items?: SelectItemType[];
  disabled?: boolean;
  handleChange?: (name: string, values: string) => void;
};

export const Select = ({
  items,
  name,
  value,
  handleChange,
  placeholder,
  disabled,
}: CustomSelectProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChangeValue = (event: SelectChangeEvent<string>): void => {
    handleChange && handleChange(name, event.target.value);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <MuiSelect
      fullWidth
      disabled={disabled}
      open={open}
      name={name}
      onOpen={handleOpen}
      onClose={handleClose}
      placeholder={placeholder}
      onChange={handleChangeValue}
      value={value}
      IconComponent={KeyboardArrowDownIcon}
      sx={{ height: 40, fontSize: '1.6rem' }}
    >
      {!items?.length && (
        <MenuItem disabled value=''>
          <ListItemText>No options</ListItemText>
        </MenuItem>
      )}
      {items?.map((item) => {
        return (
          <MenuItem disabled={item.disabled} key={item.value} value={item.value}>
            <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '1.6rem' } }}>
              {item.title}
            </ListItemText>
          </MenuItem>
        );
      })}
    </MuiSelect>
  );
};
