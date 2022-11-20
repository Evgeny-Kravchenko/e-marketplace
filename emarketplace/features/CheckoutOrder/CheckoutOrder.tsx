import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@mui/material';

export const CheckoutOrder = (): ReactElement => {
  const router = useRouter();
  const checkoutOrder = (): void => {
    router.push('/shipping');
  };

  return (
    <Button
      fullWidth
      variant='contained'
      color='secondary'
      sx={{ fontSize: '1.6rem' }}
      onClick={checkoutOrder}
    >
      Checkout
    </Button>
  );
};
