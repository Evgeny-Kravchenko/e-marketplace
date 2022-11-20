import React, { ReactElement, PointerEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { Button } from '@mui/material';

import { addItemToOrder } from 'entities/order/model';
import { Product } from 'shared/api';

interface Props {
  orderItem: Product;
  numInStock: number;
}

export const AddToCart = ({ orderItem, numInStock }: Props): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onAddToCart = (e: PointerEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(addItemToOrder({ orderItem, numInStock, count: 1 }));
    router.push('/cart');
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
