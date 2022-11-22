import React, { ReactElement } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Stack, Button } from '@mui/material';

import { SeparateLabelInputWrapper, TextField } from 'shared/ui';
import { DeliveiryAddress } from 'shared/api';

import { DeliveryForm } from './OrderDelieveryAddressFormStyles';

interface Props {
  form: UseFormReturn<DeliveiryAddress>;
  onSubmit: (data: DeliveiryAddress) => Promise<void>;
}

export const OrderDelieveryAddressForm = ({ form, onSubmit }: Props): ReactElement => {
  const { handleSubmit, formState, register } = form;
  return (
    <DeliveryForm onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <SeparateLabelInputWrapper
          id='fullName'
          label='Full name'
          helperText={formState.errors?.fullName?.message}
          error={Boolean(formState.errors.fullName)}
        >
          <TextField
            id='fullName'
            placeholder='Adam Adamovich...'
            error={Boolean(formState.errors.fullName)}
            inputProps={{
              ...register('fullName', {
                required: 'Please enter a name',
              }),
            }}
          />
        </SeparateLabelInputWrapper>
        <SeparateLabelInputWrapper
          id='address'
          label='Address'
          helperText={formState.errors?.address?.message}
          error={Boolean(formState.errors.address)}
        >
          <TextField
            id='address'
            placeholder='Pushkina street 39....'
            error={Boolean(formState.errors.address)}
            inputProps={{
              ...register('address', {
                required: 'Please enter an address',
                minLength: { value: 5, message: 'Address is more than 4 chars' },
              }),
            }}
          />
        </SeparateLabelInputWrapper>
        <SeparateLabelInputWrapper
          id='city'
          label='City'
          helperText={formState.errors?.city?.message}
          error={Boolean(formState.errors.city)}
        >
          <TextField
            id='city'
            placeholder='Warsaw....'
            error={Boolean(formState.errors.city)}
            inputProps={{
              ...register('city', {
                required: 'Please enter acity',
              }),
            }}
          />
        </SeparateLabelInputWrapper>
        <SeparateLabelInputWrapper
          id='postalCode'
          label='Postal code'
          helperText={formState.errors?.postalCode?.message}
          error={Boolean(formState.errors.postalCode)}
        >
          <TextField
            id='postalCode'
            placeholder='12345'
            error={Boolean(formState.errors.postalCode)}
            inputProps={{
              ...register('postalCode', {
                required: 'Please enter a postal code',
              }),
            }}
          />
        </SeparateLabelInputWrapper>
        <SeparateLabelInputWrapper
          id='country'
          label='Country'
          helperText={formState.errors?.country?.message}
          error={Boolean(formState.errors.country)}
        >
          <TextField
            id='country'
            placeholder='Poland'
            error={Boolean(formState.errors.country)}
            inputProps={{
              ...register('country', {
                required: 'Please enter a country',
              }),
            }}
          />
        </SeparateLabelInputWrapper>
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          sx={{ fontSize: '1.6rem' }}
          disabled={!formState.isValid}
        >
          Next
        </Button>
      </Stack>
    </DeliveryForm>
  );
};
