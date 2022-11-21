import React, { ReactElement } from 'react';

import { useTheme } from '@mui/material';

import { StyledFormControl, StyledHelperText } from './SeparateLabelInputWrapperStyles';

interface SeparateLabelInputWrapperProps {
  id: string;
  children: ReactElement;
  required?: boolean;
  label?: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  placement?: 'top' | 'bottom' | 'right' | 'left';
}

export const SeparateLabelInputWrapper = ({
  id,
  children,
  color,
  label,
  required,
  helperText,
  error,
  disabled,
  placement,
}: SeparateLabelInputWrapperProps): ReactElement => {
  const theme = useTheme();

  return (
    <StyledFormControl placement={placement} disabled={disabled} color={color}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span
            style={{
              color: theme.palette.error.main,
            }}
          >
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {helperText && <StyledHelperText error={error}>{helperText}</StyledHelperText>}
    </StyledFormControl>
  );
};

SeparateLabelInputWrapper.defaultProps = {
  color: 'secondary',
  variant: 'outlined',
  required: false,
  error: false,
  disabled: false,
  placement: 'top',
};
