import React, { ReactElement, PointerEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';

import { addItemToOrder } from 'entities/order/model';

interface Props {
  orderItemId: string;
}

export const AddToCart = ({ orderItemId }: Props): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onAddToCart = (e: PointerEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(
      addItemToOrder({
        orderItemId,
        count: 1,
        successAction: () => {
          router.push('/cart');
        },
        errorHandler: (message: string) => toast.error(message),
      })
    );
  };

  return (
    <Button
      fullWidth
      variant='contained'
      color='secondary'
      sx={{ fontSize: '1.6rem' }}
      onClick={onAddToCart}
    >
      Add to cart
    </Button>
  );
};
