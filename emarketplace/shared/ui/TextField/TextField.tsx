import React, {
  ReactElement,
  memo,
  BaseSyntheticEvent,
  ComponentType,
  forwardRef,
  ForwardedRef,
  ReactNode,
  KeyboardEventHandler,
} from 'react';
import { ChangeHandler } from 'react-hook-form';

import { InputBaseComponentProps } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { StyledInput } from './TextFieldStyles';

export interface TextFieldProps<T> {
  id: string;
  placeholder?: string;
  label?: string;
  inputProps?: T | InputBaseComponentProps;
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  >;
  helperText?: string;
  className?: string;
  name?: string;
  value?: string;
  onControlledChange?: (name: string, value: string) => void;
  onChange?: ChangeHandler;
  error?: boolean;
  onFocus?: () => void;
  onControlledBlur?: (name?: string) => void;
  required?: boolean;
  disabled?: boolean;
  startAdornment?: ReactElement;
  inputComponent?: ComponentType;
  multiline?: boolean;
  rows?: number;
  endAdornment?: ReactNode;
  validators?: ((value: string) => boolean)[];
  onKeyDown?: KeyboardEventHandler;
  onBlur?: ChangeHandler;
}

const BaseTextField = forwardRef(function <T>(
  {
    inputProps,
    id,
    color = 'secondary',
    placeholder,
    name,
    value,
    onControlledChange,
    disabled,
    label,
    onChange,
    multiline,
    rows,
    endAdornment,
    onControlledBlur,
    onBlur,
    validators,
    onKeyDown,
    ...rest
  }: TextFieldProps<T>,
  ref: ForwardedRef<T>
): ReactElement {
  const handleChange = (e: BaseSyntheticEvent): void => {
    if (Array.isArray(validators)) {
      const isAllValid = validators.every((validator) => validator(e.target.value));
      if (isAllValid) {
        onControlledChange(name, e.target.value);
      }
      return;
    } else if (typeof onChange === 'function' && name) {
      onControlledChange(name, e.target.value);
    }
  };

  const handleBlur = (): void => {
    onControlledBlur(name);
  };

  return (
    <StyledInput
      id={id}
      color={color}
      inputProps={inputProps}
      placeholder={placeholder}
      value={value}
      onChange={onChange || handleChange}
      disabled={disabled}
      label={label}
      ref={ref}
      multiline={multiline}
      rows={rows}
      endAdornment={endAdornment}
      onBlur={onControlledBlur ? handleBlur : onBlur}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
});

export const TextField = memo(BaseTextField) as typeof BaseTextField;
