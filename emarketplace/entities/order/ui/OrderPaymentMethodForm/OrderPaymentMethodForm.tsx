import React, { ReactElement } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Button, Stack } from '@mui/material';

import { RadioGroupButtons } from 'shared/ui';
import { PaymentMethod } from 'shared/api';

import { paymentMethodsArray } from './config';
import { OrderPaymentForm } from './OrderPaymentMethodFormStyles';

interface Props {
  form: UseFormReturn<PaymentMethod>;
  onSubmit: (data: PaymentMethod) => Promise<void>;
}

export const OrderPaymentMethodForm = ({ form, onSubmit }: Props): ReactElement => {
  const router = useRouter();
  const { handleSubmit, formState, register, watch } = form;

  const goBack = (): void => {
    router.push('/shipping');
  };

  return (
    <OrderPaymentForm onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RadioGroupButtons
          defaultValue={watch('value')}
          items={paymentMethodsArray}
          name='value'
          inputProps={register('value', {
            required: 'Please select a payment method',
          })}
        />
        <Button
          variant='outlined'
          color='secondary'
          sx={{ fontSize: '1.6rem' }}
          onClick={goBack}
        >
          Back
        </Button>
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
    </OrderPaymentForm>
  );
};
